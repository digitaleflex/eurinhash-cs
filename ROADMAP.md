# 🚀 Roadmap Eurin Hash - Admin & Features

Ce document trace la vision du développement futur du portail Eurin Hash. Chaque module sera implémenté étape par étape.

## 📅 Phase 1 : Consolidation & Sécurité (Terminé ✅)
- [x] Correction de la connexion Base de données (Pilote Natif en dev).
- [x] Stabilisation de BetterAuth (Normalisation des URLs).
- [x] Promotion des utilisateurs Admin.
- [x] Ajout de la TopBar de progression (`nextjs-toploader`).
- [x] Nettoyage des logs console.

## 📈 Phase 2 : Dashboard & Analytics (En cours 🏗️)
*Objectif : Transformer l'admin en centre de décision.*
- [ ] **KPI Cards** : Total utilisateurs, Messages non lus, Inscriptions totales.
- [ ] **Graphiques Recharts** : Courbe des inscriptions aux évènements (7 derniers jours).
- [ ] **Tableau d'activité** : Dernières connexions et actions importantes.

## ✍️ Phase 3 : Blog & CMS (Terminé ✅)
*Objectif : Partager l'expertise technique.*
- [x] **Prisma Schema** : Ajout du modèle `Post`, `Category`, `Tag`.
- [x] **Admin Editor** : Interface de rédaction (TipTap) avec CRUD complet.
- [x] **Upload Images** : Intégration Vercel Blob pour les miniatures et le contenu.

## 📧 Phase 4 : Communication & Resend (Prochaine étape ⏭️)
*Objectif : Engager la communauté.*
- [ ] **Emails Groupés** : Envoyer une notification aux inscrits d'un évènement.
- [ ] **Système de Ticket** : Répondre aux messages de contact directement depuis l'Admin.
- [ ] **Templates d'emails** : Création de designs d'emails pro avec React Email.

## 👤 Phase 5 : Gestion Utilisateurs Avancée
*Objectif : Modération et contrôle.*
- [ ] **UI de Rôle** : Boutons pour promouvoir/rétrograder sans scripts.
- [ ] **Ban System** : Possibilité de bannir un utilisateur avec motif.
- [ ] **Export CSV** : Exporter les listes de participants par évènement.

## 🛠️ Phase 6 : Optimisation & Maintenance
- [ ] **Logs UI** : Voir les erreurs serveur directement dans une page Admin.
- [ ] **Backup Automatique** : Script de sauvegarde hebdomadaire de la DB.

---
*Dernière mise à jour : 05 Mai 2026*
