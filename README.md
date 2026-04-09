````markdown
# TP APP SAE — Application de gestion des SAÉ MMI

## Présentation du projet

**TP APP SAE** est une application full-stack développée dans le cadre du **TP noté de Développement Mobile** en **BUT MMI 3**.

L’objectif de ce projet est de proposer une solution permettant de **centraliser, consulter, organiser et enrichir les SAÉ** du BUT MMI, en particulier celles des promotions **MMI2** et **MMI3**.  
L’application a été pensée comme une **banque de données pédagogique et professionnelle**, pouvant servir à la fois :

- de **source documentaire** pour les étudiants,
- de **réserve de projets** pour les JPO,
- de **base de consultation** pour des présentations,
- et de **support d’archivage** des réalisations de SAÉ.

Le projet repose sur une architecture **mobile + API REST**, avec :

- un **frontend mobile/web en React Native / Expo**
- un **backend Java Spring Boot**
- une **base de données relationnelle**
- une logique de gestion des **SAÉ**, **groupes**, **UE**, **images** et **relations associées**

---

## Auteurs

Projet réalisé par :

- **Luxchan VASANTHAN**
- **Abeeschan KRISHNAKUMAR**

Formation : **BUT MMI 3 — IUT MLV Promos : MMI3**  
Ressource : **R6.03 — Développement Mobile**

---

## Contexte pédagogique

Les **SAÉ** occupent une place centrale dans la formation en BUT, car elles permettent de mettre les étudiants en situation de production réelle, en autonomie et en mode projet.

Dans cette logique, le sujet proposé consiste à développer une application mobile capable de :

- **consulter les SAÉ existantes**
- **ajouter de nouvelles SAÉ dans une base de données**
- **historiser les projets**
- **mettre en relation les SAÉ avec des groupes, des UE et des images**
- **faciliter la valorisation des travaux étudiants**

Ce projet répond donc à un besoin de **structuration**, de **visualisation** et de **mise en valeur** des productions réalisées au sein du BUT MMI.

---

## Objectifs du projet

L’application a pour objectif de permettre :

- la **consultation des SAÉ**
- l’**ajout de nouvelles SAÉ**
- la **gestion des groupes auteurs**
- la **gestion des UE liées**
- l’**association d’images à chaque SAÉ**
- l’**organisation des données par année, semestre et domaine**
- le **classement des SAÉ par note**
- l’**affichage d’informations détaillées** pour chaque projet
- la **mise en valeur statistique** des résultats

---

## Fonctionnalités principales

### Gestion des SAÉ
- consultation de la liste des SAÉ
- affichage détaillé d’une SAÉ
- ajout d’une SAE complète
- modification d’une SAE
- tri par note
- filtrage par année, semestre et domaine

### Gestion des groupes
- consultation des groupes
- ajout d’un groupe
- liaison entre un groupe et une SAE
- enregistrement d’une note obtenue par groupe

### Gestion des UE
- consultation des UE
- ajout d’une UE
- liaison entre une UE et une SAE

### Gestion des images
- ajout d’images liées à une SAE
- affichage d’une galerie d’illustrations

### Statistiques
- moyenne des notes
- taux de réussite
- exploitation des notes par groupes
- valorisation des données du projet

---

## Stack technique

### Frontend
- **React Native**
- **Expo**
- **React Navigation**
- **Axios**
- **Expo Linear Gradient**

### Backend
- **Java**
- **Spring Boot**
- **Spring Data JPA**
- **API REST**
- **Hibernate**

### Base de données
- **MySQL** en local pendant le développement
- **H2** comme fallback pour l’hébergement
- configuration compatible déploiement

### Outils
- **VS Code**
- **IntelliJ IDEA**
- **Git**
- **GitHub**
- **Render**
- **Vercel**

---

## Architecture du projet

Le dépôt est organisé sous forme de **monorepo** avec deux parties principales :

```text
TP-SAE-MOBILE/
├── sae-mobile/   # Frontend React Native / Expo
└── saeapi/       # Backend Spring Boot / API REST
````

### Frontend `sae-mobile`

Le frontend gère :

* l’interface utilisateur
* la navigation
* les appels API
* la consultation et l’ajout des données

### Backend `saeapi`

Le backend gère :

* la logique métier
* les entités JPA
* les repositories
* les controllers REST
* les relations entre SAÉ, groupes, UE et images

---

## Modélisation des données

Le projet repose sur plusieurs entités principales :

* **Sae**
* **Groupe**
* **Ue**
* **ImageSae**
* **GroupeSae**
* **SaeUe**

### Relations principales

* une **SAE** peut être liée à plusieurs **UE**
* une **SAE** peut être liée à plusieurs **images**
* une **SAE** peut être liée à un ou plusieurs **groupes**
* une relation **GroupeSae** permet de stocker une **note obtenue**
* une relation **SaeUe** permet d’associer une UE à une SAE

Cette structuration permet une application **plus réaliste, évolutive et professionnalisante**.

---

## API REST

Le backend expose une API REST permettant de manipuler toutes les ressources du projet.

### Exemples de routes disponibles

#### Test API

* `GET /api/test`

#### SAÉ

* `GET /api/saes`
* `GET /api/saes/{id}`
* `GET /api/saes/{id}/details`
* `POST /api/saes`
* `PUT /api/saes/{id}`

#### Groupes

* `GET /api/groupes`
* `POST /api/groupes`

#### UE

* `GET /api/ues`
* `POST /api/ues`

#### Relations groupe / SAE

* `GET /api/groupe-saes`
* `GET /api/groupe-saes/sae/{saeId}`
* `POST /api/groupe-saes`

#### Relations SAE / UE

* `GET /api/sae-ues`
* `GET /api/sae-ues/sae/{saeId}`
* `POST /api/sae-ues`

#### Images

* `GET /api/images`
* `GET /api/images/sae/{saeId}`
* `POST /api/images`

---

## Hébergement

L’un des points forts du projet est qu’il a été pensé pour fonctionner **au-delà du développement local**, avec une logique de **déploiement réel**.

### Backend hébergé

Le backend Spring Boot est déployé sur **Render**.

**URL backend :**
`https://tp-sae-api.onrender.com`

**Test API :**
`https://tp-sae-api.onrender.com/api/test`

Le déploiement du backend a nécessité :

* une adaptation du projet pour le cloud
* une configuration serveur compatible Render
* une conteneurisation via **Docker**
* une gestion du port via variable d’environnement
* une configuration de base adaptée à la production

### Frontend hébergé

Le frontend React Native / Expo est prévu pour être déployé en version web sur **Vercel**.

**URL frontend :**
`[À ajouter ici]`

Le frontend est configuré pour fonctionner avec l’URL du backend hébergé grâce à une variable d’environnement :

```env
EXPO_PUBLIC_API_URL=https://tp-sae-api.onrender.com/api
```

Ce choix permet :

* une meilleure séparation entre développement local et production
* une architecture plus propre
* une meilleure maintenabilité du projet

---

## Installation en local

### 1. Cloner le projet

```bash
git clone https://github.com/LuxchanV/TP-SAE-MOBILE.git
cd TP-SAE-MOBILE
```

---

## Lancer le backend

### Se placer dans le dossier backend

```bash
cd saeapi
```

### Lancer l’application Spring Boot

```bash
./mvnw spring-boot:run
```

Sur Windows PowerShell :

```powershell
.\mvnw spring-boot:run
```

### URL locale du backend

```text
http://localhost:8080
```

### Test local

```text
http://localhost:8080/api/test
```

---

## Lancer le frontend

### Se placer dans le dossier frontend

```bash
cd sae-mobile
```

### Installer les dépendances

```bash
npm install
```

### Lancer le projet Expo

```bash
npx expo start
```

### Lancer la version web

```bash
npx expo start --web
```

---

## Configuration API frontend

Le frontend utilise Axios pour appeler l’API backend.

Exemple de configuration :

```js
const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080/api";
```

Cela permet :

* d’utiliser `localhost` en local
* d’utiliser l’URL du backend hébergé en production

---

## Déploiement

### Déploiement du backend

Le backend a été déployé sur **Render** à partir du dépôt GitHub.

Le service utilise :

* un **Root Directory** dédié (`saeapi`)
* un **Dockerfile**
* une configuration compatible Render
* une logique de build et de démarrage adaptée à Spring Boot

### Déploiement du frontend

Le frontend est prévu pour être déployé sur **Vercel** avec :

* `sae-mobile` comme dossier racine
* une exportation web Expo
* une variable d’environnement pointant vers le backend Render

---

## Choix techniques et justification

### Pourquoi React Native / Expo ?

* développement mobile rapide
* interface moderne
* compatibilité mobile et web
* bonne ergonomie pour un projet pédagogique

### Pourquoi Spring Boot ?

* architecture backend robuste
* création rapide d’API REST
* intégration simple avec JPA / Hibernate
* structure professionnelle

### Pourquoi une API REST séparée ?

* séparation frontend / backend
* meilleure évolutivité
* déploiement indépendant
* logique proche d’un vrai projet professionnel

### Pourquoi héberger le projet ?

* montrer que l’application fonctionne au-delà du local
* valoriser une démarche plus professionnelle
* démontrer la capacité à déployer un projet complet

---

## Points forts du projet

* architecture full-stack cohérente
* application réellement exploitable
* séparation claire entre frontend et backend
* API REST structurée
* gestion de plusieurs entités liées
* ajout de statistiques
* préparation au déploiement
* travail en binôme sur un projet concret

---

## Difficultés rencontrées

Au cours du projet, plusieurs difficultés ont dû être résolues :

* configuration réseau entre mobile et backend local
* gestion des appels API entre frontend et backend
* organisation des relations entre SAÉ, groupes, UE et images
* adaptation du projet à un environnement de déploiement
* correction des erreurs de configuration
* mise en cohérence entre les données locales et les données hébergées

Ces difficultés ont permis de renforcer :

* la compréhension du développement full-stack
* la logique de déploiement
* la gestion d’une application répartie sur plusieurs environnements

---

## Améliorations possibles

Le projet peut encore être enrichi par :

* une meilleure interface statistique
* l’ajout de graphiques
* une authentification utilisateur
* une meilleure recherche multicritère
* une base de données distante persistante en production
* une interface d’administration

---

## Compétences mobilisées

Ce projet a mobilisé plusieurs compétences du BUT MMI, notamment :

* développement frontend
* développement backend
* structuration de données
* mise en place d’une API
* intégration mobile/web
* gestion d’un projet full-stack
* débogage
* déploiement
* travail collaboratif

---

## Conclusion

**TP APP SAE** est un projet complet de développement mobile et web orienté vers la **gestion, la valorisation et l’historisation des SAÉ du BUT MMI**.

Au-delà de la simple réalisation technique, ce projet met en avant :

* une démarche de structuration des données
* une logique d’architecture full-stack
* une mise en production réelle
* une réflexion sur l’usage concret de l’application dans un contexte pédagogique

Il s’agit donc d’un projet à la fois **fonctionnel, évolutif et professionnalisant**, représentatif d’un travail de **BUT MMI 3**.

---

## Auteurs

**Luxchan VASANTHAN**
**Abeeschan KRISHNAKUMAR**

```
```
