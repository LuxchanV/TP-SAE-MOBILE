
````markdown
# TP APP SAE

Application full-stack de gestion des **SAÉ du BUT MMI**, développée dans le cadre du **TP noté de Développement Mobile**.

## Auteurs

- **Luxchan VASANTHAN**
- **Abeeschan KRISHNAKUMAR**

**Formation :** BUT MMI 3  
**Ressource :** R6.03 — Développement Mobile  
**IUT :** MLV Promos — MMI3

---

## Présentation

Ce projet a pour objectif de **centraliser, consulter, organiser et valoriser les SAÉ** réalisées en BUT MMI, notamment pour les promotions **MMI2** et **MMI3**.

L’application permet de constituer une véritable **base de données de projets étudiants**, utilisable pour :

- la consultation pédagogique,
- la valorisation des réalisations,
- les journées portes ouvertes,
- les présentations de projets,
- l’archivage des SAÉ.

Le projet repose sur une architecture **frontend / backend** avec une API REST et une base de données relationnelle.

---

## Démonstration en ligne

### Frontend
**Application web :**  
👉 [https://tp-sae-mobile.vercel.app/](https://tp-sae-mobile.vercel.app/)

### Backend
**API REST :**  
👉 [https://tp-sae-api.onrender.com](https://tp-sae-api.onrender.com)

**Test API :**  
👉 [https://tp-sae-api.onrender.com/api/test](https://tp-sae-api.onrender.com/api/test)

> Le backend est hébergé sur Render en offre gratuite.  
> Lors de la première requête après une période d’inactivité, le démarrage peut prendre quelques secondes.

---

## Objectifs du projet

L’application a été conçue pour permettre :

- la **consultation des SAÉ**
- l’**ajout de nouvelles SAÉ**
- la **gestion des groupes**
- la **gestion des UE**
- l’**ajout d’images liées aux SAÉ**
- l’**affichage détaillé des projets**
- le **tri et le filtrage des SAÉ**
- l’**exploitation statistique des notes et taux de réussite**

---

## Fonctionnalités principales

### Gestion des SAÉ
- affichage de la liste des SAÉ
- affichage détaillé d’une SAE
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
- ajout d’illustrations pour une SAE
- affichage d’une galerie liée aux projets

### Statistiques
- moyenne des notes
- taux de réussite
- valorisation des données par groupe
- mise en avant des résultats du projet

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
- **Hibernate**
- **API REST**

### Base de données
- **MySQL** en local pendant le développement
- **H2** comme solution de fallback pour l’hébergement

### Outils
- **VS Code**
- **IntelliJ IDEA**
- **Git**
- **GitHub**
- **Render**
- **Vercel**

---

## Architecture du projet

Le dépôt est organisé sous forme de **monorepo** :

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
* l’affichage des données
* l’ajout et la modification des contenus

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

### Relations

* une **SAE** peut être liée à plusieurs **UE**
* une **SAE** peut être liée à plusieurs **images**
* une **SAE** peut être liée à un ou plusieurs **groupes**
* **GroupeSae** permet d’enregistrer une note obtenue par groupe
* **SaeUe** permet d’associer une UE à une SAE

Cette structure rend l’application plus réaliste, plus claire et plus évolutive.

---

## API REST

Le backend expose plusieurs routes REST.

### Test

* `GET /api/test`

### SAÉ

* `GET /api/saes`
* `GET /api/saes/{id}`
* `GET /api/saes/{id}/details`
* `POST /api/saes`
* `PUT /api/saes/{id}`

### Groupes

* `GET /api/groupes`
* `POST /api/groupes`

### UE

* `GET /api/ues`
* `POST /api/ues`

### Groupe / SAE

* `GET /api/groupe-saes`
* `GET /api/groupe-saes/sae/{saeId}`
* `POST /api/groupe-saes`

### SAE / UE

* `GET /api/sae-ues`
* `GET /api/sae-ues/sae/{saeId}`
* `POST /api/sae-ues`

### Images

* `GET /api/images`
* `GET /api/images/sae/{saeId}`
* `POST /api/images`

---

## Hébergement

### Backend sur Render

Le backend Spring Boot a été déployé sur **Render**.

Le déploiement a nécessité :

* une adaptation de la configuration serveur,
* une gestion du port pour l’environnement cloud,
* une conteneurisation avec **Docker**,
* une configuration compatible production.

### Frontend sur Vercel

Le frontend web a été déployé sur **Vercel**.

Le frontend utilise une variable d’environnement pour communiquer avec le backend hébergé :

```env
EXPO_PUBLIC_API_URL=https://tp-sae-api.onrender.com/api
```

Cela permet de séparer proprement :

* l’environnement local,
* l’environnement de production.

---

## Installation en local

### 1. Cloner le dépôt

```bash
git clone https://github.com/LuxchanV/TP-SAE-MOBILE.git
cd TP-SAE-MOBILE
```

---

## Lancer le backend en local

```bash
cd saeapi
./mvnw spring-boot:run
```

Sur Windows PowerShell :

```powershell
cd saeapi
.\mvnw spring-boot:run
```

Backend local :

```text
http://localhost:8080
```

Test API local :

```text
http://localhost:8080/api/test
```

---

## Lancer le frontend en local

```bash
cd sae-mobile
npm install
npx expo start
```

Version web :

```bash
npx expo start --web
```

---

## Configuration API du frontend

Le frontend utilise Axios pour appeler l’API.

Exemple de configuration :

```js
const BASE_URL =
  process.env.EXPO_PUBLIC_API_URL || "http://localhost:8080/api";
```

Cela permet :

* d’utiliser `localhost` en local
* d’utiliser l’URL du backend déployé en production

---

## Déploiement

### Backend

Le backend a été déployé via :

* **GitHub**
* **Render**
* **Docker**

### Frontend

Le frontend a été déployé via :

* **GitHub**
* **Vercel**
* **Expo Web Export**

---

## Choix techniques

### Pourquoi React Native / Expo ?

* développement rapide
* interface moderne
* test mobile et web
* bonne ergonomie pour un projet pédagogique

### Pourquoi Spring Boot ?

* architecture robuste
* création simple d’une API REST
* intégration efficace avec JPA / Hibernate
* structure professionnelle

### Pourquoi séparer frontend et backend ?

* meilleure organisation du projet
* déploiement indépendant
* architecture plus réaliste
* maintenance facilitée

### Pourquoi héberger le projet ?

* montrer que l’application fonctionne réellement en ligne
* valoriser une démarche professionnelle
* prouver la capacité à déployer un projet complet

---

## Points forts du projet

* architecture full-stack cohérente
* application exploitable en local et en ligne
* API REST structurée
* gestion de plusieurs entités liées
* statistiques intégrées
* séparation claire frontend / backend
* projet professionnalisant
* travail en binôme

---

## Difficultés rencontrées

Au cours du projet, plusieurs difficultés ont été rencontrées :

* configuration réseau entre mobile et backend local
* connexion entre frontend et API REST
* organisation des relations entre les entités
* adaptation au déploiement cloud
* gestion des différences entre environnement local et production
* synchronisation entre données locales et données hébergées

Ces difficultés ont permis de renforcer :

* la compréhension du développement full-stack,
* la logique de déploiement,
* la gestion d’un projet réparti sur plusieurs environnements.

---

## Améliorations possibles

Le projet peut encore évoluer avec :

* une interface statistiques plus avancée
* des graphiques
* une authentification utilisateur
* une recherche multicritère plus poussée
* une base de données distante persistante
* une interface d’administration

---

## Compétences mobilisées

Ce projet a mobilisé plusieurs compétences importantes du BUT MMI :

* développement frontend
* développement backend
* conception d’API
* structuration de base de données
* intégration mobile / web
* débogage
* déploiement
* travail collaboratif

---

## Conclusion

**TP APP SAE** est un projet complet de développement mobile et web orienté vers la **gestion, la consultation et la valorisation des SAÉ du BUT MMI**.

Au-delà de la réalisation technique, ce projet met en avant :

* une architecture full-stack cohérente,
* une logique de structuration des données,
* une mise en ligne réelle,
* une démarche professionnalisante.

Il s’agit d’un projet à la fois **fonctionnel, évolutif et valorisable**, représentatif d’un travail de **BUT MMI 3**.

---

## Auteurs

**Luxchan VASANTHAN**

**Abeeschan KRISHNAKUMAR**
