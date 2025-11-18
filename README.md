# Opti'Match - Recommandations d'équipements IT intelligentes

Assistant IA pour recommander les équipements IT parfaitement adaptés à vos besoins professionnels, propulsé par Puter.js et Claude 3.5 Sonnet.

## Fonctionnalités

- 🎯 **Recommandations personnalisées** pour particuliers et entreprises
- 💰 **Adaptation au budget** pour maximiser le rapport qualité-prix
- 🎨 **Interface moderne** avec shadcn/ui et Tailwind CSS
- 🤖 **IA avancée** via Puter.js (Claude 3.5 Sonnet)
- 📱 **Design responsive** pour tous les appareils

## Technologies utilisées

- **Next.js 16** - Framework React
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **shadcn/ui** - Composants UI modernes
- **Puter.js** - SDK pour l'IA

## Structure du projet

```
agent/
├── app/
│   ├── page.tsx              # Page d'accueil
│   ├── configure/
│   │   └── page.tsx          # Page de configuration
│   ├── recommendations/
│   │   └── page.tsx          # Page de recommandations
│   ├── layout.tsx            # Layout global
│   └── globals.css           # Styles globaux
├── components/
│   ├── header.tsx            # Composant de navigation
│   └── ui/                   # Composants shadcn
├── lib/
│   ├── agent-context.tsx     # Contexte React pour l'état
│   ├── puter-client.ts       # Client Puter.js
│   └── utils.ts              # Utilitaires
└── AI/
    └── chat.md               # Documentation Puter.js
```

## Installation

1. Cloner le dépôt
2. Installer les dépendances :
```bash
pnpm install
```

## Développement

Lancer le serveur de développement :

```bash
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Utilisation

1. **Page d'accueil** : Découvrez le projet et ses fonctionnalités
2. **Configuration** : Remplissez le formulaire avec vos critères :
   - Type d'utilisateur (particulier/entreprise)
   - Budget
   - Usage prévu
   - Préférences de marques/technologies
   - Besoins spécifiques (optionnel)
3. **Recommandations** : Obtenez des suggestions personnalisées générées par l'IA

## Critères de recommandation

L'agent prend en compte trois critères principaux :

1. **Budget** : Adaptation aux moyens financiers
2. **Usage** : Gaming, bureautique, création de contenu, développement...
3. **Préférences** : Marques, systèmes d'exploitation, technologies préférées

## À propos de Puter.js

Puter.js est un SDK JavaScript qui permet d'accéder à plus de 500 modèles d'IA, incluant OpenAI, Anthropic, Google, et plus encore. Ce projet utilise Claude 3.5 Sonnet pour générer des recommandations intelligentes et contextuelles.

## Licence

Projet académique - M2 Transition des SI
