import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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
    
    // Validation des champs requis
    const requiredFields = ["name", "email", "projectType", "projectName", "description", "budget", "timeline"]
    for (const field of requiredFields) {
      if (!body[field] || body[field].trim() === "") {
        return NextResponse.json(
          { error: `Le champ ${field} est requis` },
          { status: 400 }
        )
      }
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Format d'email invalide" },
        { status: 400 }
      )
    }

    // Validation des valeurs enum
    const validProjectTypes = ["web", "cloud", "consulting", "training", "other"]
    const validBudgets = ["under-100k", "100k-300k", "300k-500k", "500k-1m", "1m-plus", "discuss"]
    const validTimelines = ["asap", "1-month", "3-months", "6-months", "flexible"]

    if (!validProjectTypes.includes(body.projectType)) {
      return NextResponse.json(
        { error: "Type de projet invalide" },
        { status: 400 }
      )
    }

    if (!validBudgets.includes(body.budget)) {
      return NextResponse.json(
        { error: "Budget invalide" },
        { status: 400 }
      )
    }

    if (!validTimelines.includes(body.timeline)) {
      return NextResponse.json(
        { error: "Timeline invalide" },
        { status: 400 }
      )
    }

    // Préparation des données
    const projectData = {
      name: body.name.trim(),
      email: body.email.trim().toLowerCase(),
      phone: body.phone?.trim() || null,
      country: body.country || "BJ",
      company: body.company?.trim() || null,
      position: body.position?.trim() || null,
      projectType: body.projectType,
      projectName: body.projectName.trim(),
      description: body.description.trim(),
      objectives: body.objectives?.trim() || "",
      budget: body.budget,
      timeline: body.timeline,
      startDate: body.startDate ? new Date(body.startDate) : null,
      technologies: Array.isArray(body.technologies) ? body.technologies : [],
      requirements: body.requirements?.trim() || null,
      constraints: body.constraints?.trim() || null,
      ipAddress: ip,
      userAgent: request.headers.get("user-agent") || null,
    }

    // Sauvegarde avec timeout
    const savePromise = prisma.projectRequest.create({
      data: projectData,
    })

    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error("Timeout")), 10000)
    })

    const result = await Promise.race([savePromise, timeoutPromise])

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
    ])

    return NextResponse.json({
      requests,
      total,
      hasMore: offset + limit < total,
    })

  } catch (error) {
    console.error("Erreur lors de la récupération des demandes:", error)
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    )
  }
}
