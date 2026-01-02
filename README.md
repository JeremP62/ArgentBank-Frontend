# Argent Bank - Application Web Bancaire

## Description

Argent Bank est une application bancaire en ligne développée en React, avec Redux Toolkit pour la gestion du state et React Router pour la navigation. L'application permet aux utilisateurs de se connecter, consulter et modifier certaines informations de leur profil, et prépare la gestion des transactions pour les prochaines phases.

---

## Stack technique

- **Front-end** : React, React Router, Redux Toolkit
- **Back-end** : API REST (Node.js / Express / MongoDB)
- **Documentation API** : Swagger (fichier YAML)
- **Autres outils** : Vite pour le projet React, localStorage pour persistance du token et pseudo utilisateur

---

## Fonctionnalités

### Phase 1 : Authentification et profil

- Connexion sécurisée (email + mot de passe)
- Modification du pseudo uniquement
- Déconnexion et nettoyage du store Redux / localStorage

### Phase 2 : Transactions (conceptualisation)

- Visualisation des transactions groupées par compte
- Détails d’une transaction
- Modification de certaines informations (catégorie / notes)
- Swagger YAML pour documenter tous les endpoints de transaction
- Sécurité via Bearer Token pour toutes les routes privées
