#  ServiceDesk Mobile

Application mobile de gestion des tickets d'assistance et incidents informatiques développée en **React Native** & **TypeScript**. Elle permet aux collaborateurs de déclarer des anomalies, de suivre l'avancement de leurs demandes et d'échanger en direct avec l'équipe technique.

---

##  Fonctionnalités Clés

- **Authentification & Profil** : Connexion, inscription et gestion du compte utilisateur.
- **Gestion des Tickets** : Création de tickets (titre, description, priorité, pièces jointes), consultation de l'historique et suivi du statut (Ouvert, En cours, Résolu, Fermé).
- **Échanges & Commentaires** : Fil de discussion interactif sur chaque ticket pour interagir avec le support.
- **Tableau de Bord** : Vue synthétique des indicateurs (statistiques de tickets) et raccourcis d'actions rapides.

---

##  Architecture (Clean Architecture)

Le projet respecte les principes de la **Clean Architecture**, assurant un découpage strict des responsabilités, une testabilité accrue et une indépendance de la logique métier vis-à-vis du framework :

```text
src/
├── domain/                  # 🧠 Logique métier pure
│   ├── entities/            # Entités métier (Ticket, Comment, Employee)
│   ├── contracts/           # Interfaces et contrats des repositories
│   └── usecases/            # Cas d'utilisation (CreateTicket, TicketList, AddComment, etc.)
│
├── data/                    # 💾 Accès et manipulation des données
│   ├── datasources/         # Client HTTP distant (AxiosClient)
│   ├── models/              # DTOs et mapping des réponses API
│   └── repositories/        # Implémentations concrètes des contrats du domaine
│
├── presentation/            # 🎨 Interface utilisateur
│   ├── components/          # Composants réutilisables (buttons, inputs, dataDisplay, layout)
│   ├── screens/             # Vues de l'application (auth, Home, Tickets, Comments...)
│   └── Router/              # Configuration de la navigation (Stack & Tabs)
│
└── constants/               # ⚙️ Thèmes (couleurs), assets et constantes globales
```

---

##  Stack Technique

- **Framework** : [React Native](https://reactnative.dev/) (v0.87+)
- **Langage** : [TypeScript](https://www.typescriptlang.org/)
- **Navigation** : [React Navigation](https://reactnavigation.org/) (Native Stack & Bottom Tabs v7)
- **Réseau** : [Axios](https://axios-http.com/)
- **Composants & UI** : React Native Vector Icons, React Native Safe Area Context

---

##  Installation & Démarrage

### Prérequis
- [Node.js](https://nodejs.org/) (version >= 22)
- Environnement de développement mobile configuré (**Android Studio** / SDK Android ou **Xcode** pour macOS)

### 1. Installation des dépendances
```bash
npm install
```

### 2. Démarrer le serveur Metro
```bash
npm run start
```

### 3. Exécuter l'application

```bash
# Pour Android
npm run android

# Pour iOS (macOS uniquement)
npx pod-install ios
npm run ios
```

> 💡 **Configuration API** : L'URL de base de l'API backend est configurée dans [`src/data/datasources/api/AxiosClient.ts`](file:///E:/Projets/Nabil_ADAMOU-Innovertec_Stage/ServiceDesk%20Innovertec/ServiceDeskMobile/src/data/datasources/api/AxiosClient.ts) (par défaut `http://10.0.2.2:8000/api/v1` pour l'émulateur Android).