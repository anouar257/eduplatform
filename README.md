# 🎓 EduPlatform - Système de Gestion Scolaire Moderne

Bienvenue sur le dépôt du projet **EduPlatform**. Ce projet est une application web moderne avec une architecture **Microservices** (Spring Boot) et un frontend dynamique en **Angular**.

## 🚀 Comment lancer le projet (Sans modifier le code)

### 1. Pré-requis
- **Java 17+**
- **Node.js 18+**
- **Maven**
- **MySQL (via XAMPP)** (Lancé et accessible)

---

### 2. Démarrage du Backend (Lancer dans cet ordre)

Chaque service doit être lancé via son dossier respectif dans `backend/`.

1.  **Eureka Discovery Server** (Port 8761)
    - Allez dans `backend/eureka-discovery-server/`
    - Lancez : `./mvnw spring-boot:run` (ou via votre IDE)
2.  **Auth Service** (Port 8081)
    - Allez dans `backend/auth-service/`
    - Lancez : `./mvnw spring-boot:run`
3.  **API Gateway** (Port 8085)
    - Allez dans `backend/api-gateway/`
    - Lancez : `./mvnw spring-boot:run`

*Note: Toutes les requêtes frontend passent par le Gateway sur le port **8085**.*

---

### 3. Démarrage du Frontend (Port 4200)

1.  Allez dans le dossier `frontend/`
2.  Installez les dépendances : `npm install`
3.  Lancez l'application : `npm start`
4.  Ouvrez votre navigateur sur : [http://localhost:4200](http://localhost:4200)

---

## 🎨 Fonctionnalités Finalisées (Frontend)
- **32 pages complètes** (Dashboard, Checkout, Cours, Examens, etc.)
- **Système de Paiement Premium** (Carte Bancaire interactive 3D)
- **Modèle Parent-Enfant** : Le parent peut lier ses enfants et acheter des cours pour eux.
- **Micro-animations** et design moderne (Glassmorphism / Confetti).

## 🏗️ Ce qu'il reste à faire (Back-End)
Consultez le fichier [walkthrough.md](./walkthrough.md) pour le détail des microservices restants :
- `course-service`
- `exam-service`
- `payment-service`
- `notification-service`

---
**Développé avec ❤️ pour un lancement réel sur le marché.**
