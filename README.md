# Hitema Clicker

Projet React realise dans le cadre de notre cursus a H3 Hitema. C'est un jeu de type "cookie clicker" mais version Hitema, ou le but c'est de produire un max de cookies en cliquant et en achetant des ameliorations.

## Le concept

En gros c'est simple : tu cliques sur le logo Hitema pour generer des cookies, et avec ces cookies tu achetes des batiments et des multiplicateurs qui produisent des cookies automatiquement. Plus t'en as, plus ca va vite, classique.

## Les features

- **Systeme de clic** : tu cliques, tu gagnes des cookies, c'est la base
- **Batiments de production** : Alternance, Delta Boost, Braguier Boost, Mine, Usine, Banque, Temple, Tour de Sorcier... chaque batiment produit des cookies/seconde
- **Multiplicateurs** : des boosts achetables avec plusieurs niveaux pour augmenter la prod
- **Systeme d'utilisateurs** : chaque joueur a sa propre sauvegarde en local
- **Roles** : tu peux etre Joueur ou Admin (l'admin peut modifier les scores des autres)
- **Classement** : leaderboard entre les joueurs pour voir qui farm le plus
- **Succes** : des achievements a debloquer en jouant
- **Golden cookie** : un cookie dore apparait de temps en temps et donne des bonus temporaires
- **Sauvegarde auto** : tout est sauvegarde dans le localStorage, pas besoin de serveur

## Stack technique

- **React** (create-react-app)
- **JavaScript** (pas de TypeScript, on reste simple)
- Hooks utilises : `useState`, `useEffect`, `useCallback`
- `React.memo` pour optimiser les re-renders
- `localStorage` pour la persistence des donnees

## Comment lancer le projet

```bash
# Installer les dependances
npm install

# Lancer en mode dev
npm start
```

Le jeu tourne sur [http://localhost:3000](http://localhost:3000).

## Structure du projet

```
src/
  App.js              # Composant principal avec toute la logique du jeu
  App.css             # Styles de l'app
  index.js            # Point d'entree
  index.css           # Variables CSS et styles globaux
  hitema.png          # Logo Hitema (bouton principal)
  components/
    LoginScreen.js    # Ecran de connexion
    Header.js         # Barre du haut avec infos joueur
    CookieButton.js   # Le bouton sur lequel on clique
    Stats.js          # Affichage des stats (cookies/s, clics, etc.)
    UpgradeList.js    # Liste des batiments achetables
    MultiplierShop.js # Boutique des multiplicateurs
    Achievements.js   # Liste des succes
    Leaderboard.js    # Classement des joueurs
    AdminPanel.js     # Panel admin pour gerer les scores
    FeedbackMessage.js # Toasts de notification
    ParticleManager.js # Particules quand on clique
```

## Comment ca marche techniquement

- Les cookies s'incrementent chaque seconde via un `setInterval` dans un `useEffect`
- Le cout des batiments augmente de x1.15 a chaque achat (formule : `baseCost * 1.15^count`)
- Les multiplicateurs ont un cout qui scale en x2.5 par niveau
- La sauvegarde se fait avec un debounce de 500ms pour pas spam le localStorage
- Chaque joueur a sa propre cle dans le localStorage (`cookieClicker_<username>`)

## Auteur

Projet realise par un etudiant en Master a H3 Hitema.
