---
description: Revue sceptique en lecture seule du diff courant
agent: reviewer
subagent: true
---

Passe en revue le diff suivant :

!`git diff develop...HEAD`

Classe les constats par gravité (bloquant / important / mineur) avec chemins de fichiers et lignes. Vérifie en particulier : régressions de comportement, erreurs de typage, failles d'autorisation, duplication de logique, tests manquants, dépendances ajoutées inutilement. Termine par les limites connues de la revue.
