# Teetsh - Visualisation de Programmations Scolaires

[![Deployment Status](https://img.shields.io/badge/Vercel-Deployed-success?logo=vercel)](https://vercel.com)

Une application React pour visualiser et gérer les programmations scolaires. Permet aux professeurs des écoles de planifier l'enseignement de leurs matières sur l'année scolaire, organisé par périodes et domaines.

## 📋 Contexte du Projet

### Enoncé

- Une **matière** (ex: Français, Mathématiques, etc.) est composée de **domaines** (ex: langage oral, écriture, etc.)
- L'**année scolaire** est composée de **5 périodes** (entre chaque vacance scolaire)
- Une **programmation** est un document créé par le professeur des écoles pour découper l'enseignement d'une matière et la planifier chronologiquement dans l'année, période par période

> 👉 L'objectif est de pouvoir **visualiser une programmation sur 2 axes : les périodes × les domaines.**

## 🏗️ Architecture du Projet

Le projet est organisé selon une architecture React moderne avec une séparation claire des responsabilités :

```
src/
├── components/          # Composants React réutilisables
│   ├── ProgrammationMatrix.tsx  # Grille matricielle périodes × domaines
│   ├── DomainHeader.tsx         # En-tête d'un domaine avec matière associée
│   ├── PeriodHeader.tsx         # En-tête d'une période avec dates
│   ├── ProgrammationCell.tsx    # Cellule de la matrice contenant les items
│   └── ItemCard.tsx             # Carte d'affichage d'un item avec statut
│
├── hooks/               # Custom React Hooks
│   └── useProgrammation.ts  # Hook pour récupérer les données de programmation
│
├── helpers/             # Fonctions utilitaires
│   ├── colors.ts            # Gestion de la palette de couleurs
│   └── date.ts              # Fonctions de manipulation de dates
│
├── interfaces/          # Définitions TypeScript
│   └── programmation.ts     # Types: Programmation, Periode, Matiere, Domaine, Item
│
├── constants/           # Constantes de l'application
│   └── programmation.const.ts  # Constantes de l'application
│
└── App.tsx              # Composant principal
```

### Stack Technique

- **Frontend**: React 19.2.0 avec TypeScript
- **UI Library**: Chakra UI v3 pour l'interface utilisateur
- **State Management**: TanStack Query (React Query) pour la gestion des données asynchrones
- **Styling**: Emotion pour le CSS-in-JS
- **Build Tool**: Create React App avec react-scripts
- **Package Manager**: pnpm 9.1.0

### Flux de Données

1. **Récupération des données** : L'application utilise le hook `useProgrammation` qui fait appel à une API externe
2. **Configuration API** : Via les variables d'environnement `REACT_APP_API_BASE_URL`, `REACT_APP_BEARER_TOKEN`, et `REACT_APP_PROGRAMMATION_ID`
3. **Gestion du cache** : TanStack Query gère le cache et l'état de chargement
4. **Affichage** : Vue matricielle unique affichant la programmation sur 2 axes :
   - **Colonnes** : Les 5 périodes de l'année scolaire avec leurs dates
   - **Lignes** : Tous les domaines organisés par matière
   - **Cellules** : Les items de chaque domaine pour chaque période, avec statuts visuels (todo, en cours, terminé)

## 🚀 Commandes Disponibles

### Développement

```bash
pnpm start
```
Lance l'application en mode développement sur [http://localhost:3000](http://localhost:3000).
Le rechargement automatique est activé lors de modifications du code.

### Tests

```bash
pnpm test
```
Lance Jest en mode watch interactif pour exécuter les tests unitaires.
Le projet inclut des tests pour les helpers (`colors.test.ts`, `date.test.ts`).

### Build Production

```bash
pnpm build
```
Crée un build optimisé pour la production dans le dossier `build/`.
- Minification du code
- Optimisation des assets
- Inclusion des hashes dans les noms de fichiers

### Linting et Formatage

```bash
pnpm lint              # Vérifie le code avec ESLint
pnpm lint:fix          # Corrige automatiquement les erreurs ESLint
pnpm prettier          # Formate le code avec Prettier
pnpm prettier:check    # Vérifie le formatage sans modifier
pnpm format            # Exécute prettier + lint:fix
```

### Git Hooks

Le projet utilise **Husky** et **lint-staged** pour garantir la qualité du code avant chaque commit :
- Formatage automatique avec Prettier
- Vérification ESLint avec un maximum de 0 avertissements
- Appliqué uniquement aux fichiers modifiés
