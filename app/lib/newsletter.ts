import { PrismaClient, NewsletterType, SubscriptionSource, SubscriptionStatus } from '@prisma/client';

const prisma = new PrismaClient();

export interface NewsletterSubscriptionData {
  email: string;
  firstName?: string;
  lastName?: string;
  company?: string;
  jobTitle?: string;
  phone?: string;
  newsletters: NewsletterType[];
  source: SubscriptionSource;
  referrer?: string;
  ipAddress: string;
  userAgent: string;
  gdprConsent: boolean;
  marketingConsent: boolean;
}

export class NewsletterService {
  /**
   * Inscription à une ou plusieurs newsletters
   */
  static async subscribe(data: NewsletterSubscriptionData) {
    try {
      // Vérifier si l'abonné existe déjà
      let subscriber = await prisma.subscriber.findUnique({
        where: { email: data.email },
        include: { subscriptions: true }
      });

      if (subscriber) {
        // Mettre à jour les informations existantes
        subscriber = await prisma.subscriber.update({
          where: { email: data.email },
          data: {
            firstName: data.firstName || subscriber.firstName,
            lastName: data.lastName || subscriber.lastName,
            company: data.company || subscriber.company,
            jobTitle: data.jobTitle || subscriber.jobTitle,
            phone: data.phone || subscriber.phone,
            gdprConsent: data.gdprConsent,
            marketingConsent: data.marketingConsent,
            lastActiveAt: new Date(),
          },
          include: { subscriptions: true }
        });
      } else {
        // Créer un nouvel abonné
        subscriber = await prisma.subscriber.create({
          data: {
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            company: data.company,
            jobTitle: data.jobTitle,
            phone: data.phone,
            ipAddress: data.ipAddress,
            userAgent: data.userAgent,
            source: data.source,
            referrer: data.referrer,
            gdprConsent: data.gdprConsent,
            marketingConsent: data.marketingConsent,
            status: SubscriptionStatus.PENDING_CONFIRMATION,
            verificationToken: this.generateVerificationToken(),
          },
          include: { subscriptions: true }
        });
      }

      // Ajouter les nouvelles inscriptions aux newsletters
      const existingTypes = subscriber.subscriptions.map(sub => sub.type);
      const newTypes = data.newsletters.filter(type => !existingTypes.includes(type));

      for (const type of newTypes) {
        await prisma.newsletterSubscription.create({
          data: {
            subscriberId: subscriber.id,
            type,
            status: SubscriptionStatus.ACTIVE,
          }
        });
      }

      // Enregistrer l'interaction
      await prisma.subscriberInteraction.create({
        data: {
          subscriberId: subscriber.id,
          type: 'newsletter_subscription',
          data: {
            newsletters: data.newsletters,
            source: data.source,
          }
        }
      });

      return {
        success: true,
        subscriber,
        message: 'Inscription réussie ! Vérifiez votre email pour confirmer votre abonnement.'
      };

    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      return {
        success: false,
        error: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.'
      };
    }
  }

  /**
   * Désabonnement d'une newsletter spécifique
   */
  static async unsubscribe(email: string, newsletterType?: NewsletterType) {
    try {
      const subscriber = await prisma.subscriber.findUnique({
        where: { email },
        include: { subscriptions: true }
      });

      if (!subscriber) {
        return { success: false, error: 'Abonné non trouvé' };
      }

      if (newsletterType) {
        // Désabonnement d'une newsletter spécifique
        await prisma.newsletterSubscription.updateMany({
          where: {
            subscriberId: subscriber.id,
            type: newsletterType
          },
          data: {
            status: SubscriptionStatus.UNSUBSCRIBED,
            unsubscribedAt: new Date()
          }
        });
      } else {
        // Désabonnement total
        await prisma.subscriber.update({
          where: { email },
          data: {
            status: SubscriptionStatus.UNSUBSCRIBED,
            unsubscribedAt: new Date()
          }
        });

        await prisma.newsletterSubscription.updateMany({
          where: { subscriberId: subscriber.id },
          data: {
            status: SubscriptionStatus.UNSUBSCRIBED,
            unsubscribedAt: new Date()
          }
        });
      }

      return { success: true, message: 'Désabonnement effectué avec succès' };

    } catch (error) {
      console.error('Erreur lors du désabonnement:', error);
      return { success: false, error: 'Erreur lors du désabonnement' };
    }
  }

  /**
   * Vérification d'email
   */
  static async verifyEmail(token: string) {
    try {
      const subscriber = await prisma.subscriber.findFirst({
        where: { verificationToken: token }
      });

      if (!subscriber) {
        return { success: false, error: 'Token de vérification invalide' };
      }

      await prisma.subscriber.update({
        where: { id: subscriber.id },
        data: {
          emailVerified: true,
          status: SubscriptionStatus.ACTIVE,
          verificationToken: null
        }
      });

      return { success: true, message: 'Email vérifié avec succès' };

    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
      return { success: false, error: 'Erreur lors de la vérification' };
    }
  }

  /**
   * Obtenir les statistiques des newsletters
   */
  static async getStats() {
    try {
      const totalSubscribers = await prisma.subscriber.count({
        where: { status: SubscriptionStatus.ACTIVE }
      });

      const subscriptionsByType = await prisma.newsletterSubscription.groupBy({
        by: ['type'],
        where: { status: SubscriptionStatus.ACTIVE },
        _count: { type: true }
      });

      const recentSubscriptions = await prisma.subscriber.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // 30 derniers jours
          }
        }
      });

      return {
        totalSubscribers,
        subscriptionsByType,
        recentSubscriptions
      };

    } catch (error) {
      console.error('Erreur lors de la récupération des stats:', error);
      return null;
    }
  }

  /**
   * Générer un token de vérification
   */
  private static generateVerificationToken(): string {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  }
}

export default NewsletterService;