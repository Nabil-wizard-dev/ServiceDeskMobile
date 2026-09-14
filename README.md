# Service Desk Mobile

**Service Desk Mobile** est un petit service permettant aux employés d'une entreprise de signaler des incidents ou de formuler des demandes d'assistance auprès de l'équipe technique.

## Cas d'usage

Un employé peut créer un **ticket** lorsqu'il rencontre un problème, par exemple :

- ordinateur qui ne démarre plus ;
- problème d'accès à une application ;
- imprimante indisponible ;
- problème de connexion ;
- demande d'installation d'un logiciel ;
- incident sur un équipement ;
- demande d'assistance générale.

Un ticket peut ensuite recevoir plusieurs **commentaires**, permettant de suivre les échanges et les actions réalisées par l'équipe technique.

## Stack technique

| Composant | Version |
|---|---|
|  | 8.5.0 |
| Laravel | 13 |
| Composer | 2.8.12 |
| Base de données | SQLite |
| Documentation API | Swagger (darkaonline/l5-swagger) |









## Mes Composantes et ecrans
1. Les Composants Réutilisables (Shared Components)
Boutons & Actions (Buttons)

PrimaryButton : Le bouton bleu principal (ex: "Se connecter", "Créer le ticket").

OutlinedButton : Le bouton avec bordure et fond transparent (ex: "Connexion avec empreinte").

TextLink : Les liens cliquables textuels (ex: "Mot de passe oublié ?", "Voir tout").

IconButton : Un bouton circulaire ou simple contenant uniquement une icône (ex: retour, cloche, réglages, options kebab).

FloatingActionButton (FAB) : Le gros bouton "+" central de la barre de navigation.

Champs de saisie (Inputs)

TextInputField : Champ de texte standard, avec support pour icône à gauche (email, cadenas) et action à droite (œil pour le mot de passe).

TextAreaField : Champ de texte multiligne (ex: pour la description du ticket).

SearchInput : Barre de recherche avec icône loupe et potentiellement icône filtre.

SelectDropdown : Champ de sélection (ex: "Catégorie").

CheckboxItem : Case à cocher avec son label ("Se souvenir de moi").

SegmentedControl : Le sélecteur de priorité en ligne (Basse, Moyenne, Haute, Urgente) qui agit comme des radio buttons stylisés.

FileUploadArea : La zone d'ajout de pièces jointes (pointillés + icône).

Affichage de données (Data Display)

TicketListItem : La carte rectangulaire affichant le résumé d'un ticket (icône, ID, titre, date et statut). C'est le composant le plus réutilisé de l'app.

StatusBadge : La petite pilule colorée indiquant l'état (Ouvert en rouge, En cours en jaune, Résolu en vert, Fermé en gris).

StatCard : Les 4 petits blocs carrés du dashboard (Mes tickets, Ouverts, etc.).

InfoRow : L'affichage clé/valeur pour les détails (ex: "Employé" / "Afi Kossi").

CommentBubble : Le bloc de message dans le chat, avec gestion du style selon si c'est l'utilisateur ou le support (droite/gauche, bleu/gris).

MenuItem : La ligne cliquable du profil avec icône à gauche, texte et chevron à droite.

Avatar : L'image de profil ronde ou les initiales ("AK").

Layout & Navigation

ScreenHeader : L'en-tête de page avec le titre au centre et des emplacements pour le bouton retour à gauche et des actions à droite.

BottomTabBar : La barre de navigation du bas (Accueil, Tickets, FAB, Notifications, Profil).

TabsHeader : Les onglets de filtrage horizontaux (Tous, Ouverts, En cours, Résolus).

2. Les Écrans (Screens)
Voici les 8 écrans de ton application :

SplashScreen : L'écran de chargement initial.

LoginScreen : L'écran de connexion.

HomeScreen : Le tableau de bord principal.

TicketListScreen : L'historique et la recherche de tickets.

NewTicketScreen : Le formulaire de création.

TicketDetailsScreen : L'affichage complet d'un ticket.

CommentsScreen : Le fil de discussion d'un ticket.

ProfileScreen : Les paramètres et infos utilisateur.