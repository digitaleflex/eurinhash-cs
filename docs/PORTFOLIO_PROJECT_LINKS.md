# Registre des liens publics du portfolio

Ce fichier est la référence éditoriale pour les liens Code source et Voir le site des fiches projets. Ne jamais déduire qu'un site de marque est la démo d'un dépôt portant un nom proche.

## Règles

- sourceUrl : dépôt du projet, uniquement s'il est public et autorisé à être présenté.
- liveUrl : URL de l'application du projet, seulement si l'association est confirmée.
- brandUrl : site de marque/communauté, à afficher comme tel et jamais comme démo du projet.
- Une valeur null signifie « non confirmé » : ne pas afficher de bouton.
- Les liens de projets clients, privés ou sensibles doivent être validés avant publication.

## Référentiel

| Projet | Dépôt public | Application en ligne | Site de marque | Décision |
|---|---|---|---|---|
| HashCode Reboot | https://github.com/digitaleflex/hashcode_reboot | https://reboot.joinhashcode.com | https://joinhashcode.com | Le sous-domaine reboot correspond à Reboot ; le domaine racine est le site HashCode. |
| JoinHashCode | https://github.com/digitaleflex/joinhashcode | Non confirmé | https://joinhashcode.com | **Ne pas attribuer joinhashcode.com comme démo de l'application JoinHashCode.** Il s'agit du site de HashCode. |
| WPOpsX | https://github.com/digitaleflex/WPOpsX | Non confirmé | null | N'afficher que le lien du dépôt tant qu'une démo n'est pas confirmée. |
| FSA | https://github.com/digitaleflex/attestations-fsa | https://attestations.fermestandre.com/ | null | Vérifier l'autorisation de présenter le portail client et les données avant publication. |
| Storyboard Creator | https://github.com/digitaleflex/storyboard-creator | Non confirmé | null | Vérifier la sécurité et l'état du produit avant d'exposer une démo. |
| Calendrier Divin | https://github.com/digitaleflex/calendrierDivin | Non confirmé | null | Vérifier l'autorisation du client avant publication de toute URL ou capture. |
| VoxGen AI | https://github.com/digitaleflex/voicegen-ai | Non confirmé | null | Vérifier la sécurité et l'état du dépôt avant publication. |
| Leontine Nexa Stock | https://github.com/digitaleflex/leontine-nexa-stock | https://flexstock.eurinhash.com | null | Présenter honnêtement le statut du projet et vérifier les données avant publication. |
| NeverBrokeAgain | https://github.com/digitaleflex/nba | Non confirmé | null | Projet sensible : ne pas publier de détails ou de démo sans validation explicite. |
| Portfolio Eurin Hash | https://github.com/digitaleflex/eurinhash-cs | https://eurinhash.com | null | Site personnel et dépôt associé. |
| Architecture Cloud & DevOps | Non applicable | Non applicable | null | Étude d'infrastructure ; ne pas inventer de démo publique. |

## Modèle de données conseillé

```ts
type ProjectLinks = {
  sourceUrl: string | null;
  liveUrl: string | null;
  brandUrl?: string | null;
};
```

Les boutons UI doivent être générés indépendamment : « Code source » depuis sourceUrl, « Voir le site » depuis liveUrl. Le lien brandUrl, s'il est affiché, doit porter un libellé explicite tel que « Site de HashCode », jamais « Voir le projet ».