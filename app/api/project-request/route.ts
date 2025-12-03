import { NextRequest, NextResponse } from "next/server"
import { prismaApi as prisma } from "@/lib/prisma-api"
import { statsCache, apiCache } from "@/lib/cache"

// Rate limiting simple
const rateLimit = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const windowMs = 15 * 60 * 1000 // 15 minutes
  const maxRequests = 3 // 3 demandes par 15 minutes

  const userLimit = rateLimit.get(ip)
  
  if (!userLimit || now > userLimit.resetTime) {
    rateLimit.set(ip, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (userLimit.count >= maxRequests) {
    return false
  }

  userLimit.count++
  return true
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown"
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Trop de demandes. Veuillez réessayer dans 15 minutes." },
        { status: 429 }
      )
    }

    const body = await request.json()
    
    // Validation des champs requis optimisée
    const requiredFields = ["name", "email", "projectType", "projectName", "description", "budget", "timeline"]
    const trimmedValues: Record<string, string> = {}
    
    for (const field of requiredFields) {
      const value = body[field]
      if (!value || typeof value !== 'string') {
        return NextResponse.json(
          { error: `Le champ ${field} est requis` },
          { status: 400 }
        )
      }
      
      const trimmed = value.trim()
      if (!trimmed) {
        return NextResponse.json(
          { error: `Le champ ${field} est requis` },
          { status: 400 }
        )
      }
      
      trimmedValues[field] = trimmed
    }

    // Validation email optimisée avec cache
    const emailCacheKey = `email_valid_${trimmedValues.email}`;
    let isEmailValid = apiCache.get(emailCacheKey);
    
    if (isEmailValid === undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      isEmailValid = emailRegex.test(trimmedValues.email);
      apiCache.set(emailCacheKey, isEmailValid, 5 * 60 * 1000); // 5 minutes
    }
    
    if (!isEmailValid) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      )
    }

    // Validation des valeurs enum avec cache
    const projectTypeCacheKey = `valid_project_type_${body.projectType}`;
    let isProjectTypeValid = apiCache.get(projectTypeCacheKey);
    
    if (isProjectTypeValid === undefined) {
      const validProjectTypes = ["web", "cloud", "consulting", "training", "other"];
      isProjectTypeValid = validProjectTypes.includes(body.projectType);
      apiCache.set(projectTypeCacheKey, isProjectTypeValid, 10 * 60 * 1000); // 10 minutes
    }
    
    if (!isProjectTypeValid) {
      return NextResponse.json(
        { error: "Type de projet invalide" },
        { status: 400 }
      );
    }

    const budgetCacheKey = `valid_budget_${body.budget}`;
    let isBudgetValid = apiCache.get(budgetCacheKey);
    
    if (isBudgetValid === undefined) {
      const validBudgets = ["under-100k", "100k-300k", "300k-500k", "500k-1m", "1m-plus", "discuss"];
      isBudgetValid = validBudgets.includes(body.budget);
      apiCache.set(budgetCacheKey, isBudgetValid, 10 * 60 * 1000); // 10 minutes
    }
    
    if (!isBudgetValid) {
      return NextResponse.json(
        { error: "Budget invalide" },
        { status: 400 }
      );
    }

    const timelineCacheKey = `valid_timeline_${body.timeline}`;
    let isTimelineValid = apiCache.get(timelineCacheKey);
    
    if (isTimelineValid === undefined) {
      const validTimelines = ["asap", "1-month", "3-months", "6-months", "flexible"];
      isTimelineValid = validTimelines.includes(body.timeline);
      apiCache.set(timelineCacheKey, isTimelineValid, 10 * 60 * 1000); // 10 minutes
    }
    
    if (!isTimelineValid) {
      return NextResponse.json(
        { error: "Timeline invalide" },
        { status: 400 }
      );
    }

    // Préparation des données avec valeurs optimisées
    const projectData = {
      name: trimmedValues.name,
      email: trimmedValues.email.toLowerCase(),
      phone: body.phone?.trim() || null,
      country: body.country || "BJ",
      company: body.company?.trim() || null,
      position: body.position?.trim() || null,
      projectType: body.projectType,
      projectName: trimmedValues.projectName,
      description: trimmedValues.description,
      objectives: trimmedValues.objectives?.trim() || "",
      budget: body.budget,
      timeline: body.timeline,
      startDate: body.startDate ? new Date(body.startDate) : null,
      technologies: Array.isArray(body.technologies) ? body.technologies : [],
      requirements: body.requirements?.trim() || null,
      constraints: body.constraints?.trim() || null,
      ipAddress: ip,
      userAgent: request.headers.get("user-agent") || null,
    }

    // Sauvegarde optimisée
    const result = await prisma.projectRequest.create({
      data: projectData,
    })

    // Log pour monitoring
    console.log(`Nouvelle demande de projet: ${projectData.projectName} (${projectData.email})`)

    return NextResponse.json(
      { 
        success: true, 
        message: "Demande de projet envoyée avec succès",
        id: (result as { id: string }).id 
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Erreur lors de la sauvegarde de la demande de projet:", error)

    if (error instanceof Error && error.message === "Timeout") {
      return NextResponse.json(
        { error: "Timeout de la base de données. Veuillez réessayer." },
        { status: 504 }
      )
    }

    return NextResponse.json(
      { error: "Erreur serveur lors de l'enregistrement de la demande" },
      { status: 500 }
    )
  }
}

// Méthode GET pour récupérer les demandes (admin uniquement)
export async function GET(request: NextRequest) {
  try {
    // Vérification simple d'authentification (à améliorer en production)
    const authHeader = request.headers.get("authorization")
    if (authHeader !== `Bearer ${process.env.ADMIN_TOKEN}`) {
      return NextResponse.json(
        { error: "Non autorisé" },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const limit = parseInt(searchParams.get("limit") || "50")
    const offset = parseInt(searchParams.get("offset") || "0")

    const where = status ? { status } : {}
    
    // Utiliser le cache pour les statistiques
    const cacheKey = `project_stats_${status || 'all'}_${limit}_${offset}`;
    let cachedResult = statsCache.get(cacheKey);
    
    if (!cachedResult) {
      const [requests, total] = await Promise.all([
        prisma.projectRequest.findMany({
          where,
          orderBy: { createdAt: "desc" },
          take: limit,
          skip: offset,
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
            projectType: true,
            projectName: true,
            budget: true,
            timeline: true,
            status: true,
            priority: true,
            createdAt: true,
          },
        }),
        prisma.projectRequest.count({ where }),
      ]);
      
      cachedResult = { requests, total };
      statsCache.set(cacheKey, cachedResult, 2 * 60 * 1000); // 2 minutes
    }
    
    const { requests, total } = cachedResult;

    return NextResponse.json({
      requests,
      total,
      hasMore: offset + limit < total,
      fromCache: !!statsCache.get(cacheKey)
    })

  } catch (error) {
    console.error("Erreur lors de la récupération des demandes:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
