
#  Formulaire de Contact Sécurisé

Projet développé dans le cadre d’un exercice de sécurité web. Il implémente un formulaire de contact sécurisé en appliquant les principes de **Security by Design**.

##  Objectif

Créer une application web locale permettant à un utilisateur :
- de se connecter via un formulaire sécurisé,
- de remplir un formulaire de contact,
- tout en protégeant les données contre les attaques courantes (bots, XSS, MITM, etc.).

---

##  Fonctionnalités de sécurité

-  **Connexion via HTTPS** avec certificat SSL local généré via OpenSSL.
-  **Séparation du frontend et backend** (`public/`, `src/`, `config/`, `logs/`).
-  **Protection contre les bots** avec Google reCAPTCHA v2.
-  **Chiffrement des messages** via AES-256 avant stockage.
-  **Hachage du mot de passe** avec `bcrypt`.
-  **Sécurisation des cookies** avec `HttpOnly` et `Secure`.
-  **En-têtes HTTP renforcés** avec `helmet`.
-  **Journalisation** des accès et erreurs dans `/logs`.

---

##  Arborescence

```
formulaire_securise/
├── config/
│   ├── ssl/
│   │   ├── localhost.crt
│   │   └── localhost.key
│   └── crypto.json
├── logs/
│   ├── access.log
│   ├── error.log
│   └── messages.json
├── public/
│   ├── css/
│   │   └── styles.css
│   ├── js/
│   │   └── validate.js
│   ├── login.html
│   └── contact.html
├── src/
│   ├── server.js
│   └── decrypt.js
└── README.md
```

---

##  Pré-requis

- Node.js 22+
- Navigateur web
- OpenSSL (pour générer des certificats SSL locaux)
- OWASP ZAP (test de vulnérabilités)
- Postman (test des requêtes)
- Visual Studio Code (ou autre éditeur)

---

##  Lancer le projet en local

1. Cloner le dépôt :


git clone https://github.com/Yann-bg/formulaire-securise.git
cd formulaire_securise


2. Installer les dépendances :

npm install express express-session helmet bcrypt axios

3. Générer un certificat SSL :

openssl req -nodes -new -x509 -keyout config/ssl/localhost.key -out config/ssl/localhost.crt -days 365

4. Démarrer le serveur :

node src/server.js

5. Accéder à l’application :

 [https://localhost:3000](https://localhost:3000)
 Connectez-vous avec Email:admin@example.com et Mot de Passe:password123

---

##  Déchiffrer les messages

Si vous êtes administrateur et souhaitez consulter les messages reçus :

node src/decrypt.js

---

##  Vérifications de sécurité recommandées

-  **Test Captcha :** Envoyer un formulaire sans valider le reCAPTCHA.
-  **Test HTTPS :** Tenter d’accéder à l’application via HTTP (doit rediriger vers HTTPS).
-  **Test XSS :** Entrer du script malicieux dans le champ message (ex. `<script>alert('xss')</script>`) – ne doit pas s’exécuter.
-  **Test Cookies :** Vérifier les flags `Secure` et `HttpOnly` via les DevTools.
-  **Scan OWASP ZAP :** Scanner l’application pour analyser les failles potentielles.

---

##  Auteur

Yanne Kueti – EPSI  – Projet pédagogique

---

##  Licence

Ce projet est à usage **éducatif** uniquement.
