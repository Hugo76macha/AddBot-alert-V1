# Bot de Surveillance Discord 🤖

## Description 📜

Ce projet est un **bot de surveillance** pour Discord. Le bot envoie des notifications lorsqu'il est ajouté ou supprimé d'un serveur.

## Fonctionnalités ✨

- **Notification d'Ajout et de Départ de Serveur** : Annonce lorsqu'il est ajouté à un nouveau serveur ou en quitte un.
- **Journalisation** : Système de logging pour les erreurs et les événements importants.
- **Serveur Web** : Serveur HTTP intégré pour vérifier que le bot est en ligne.

## Prérequis 📦

- [Node.js](https://nodejs.org) (version 20.1.0 ou supérieure)
- [discord.js](https://discord.js.org) (version compatible)
- [dotenv](https://www.npmjs.com/package/dotenv) pour la gestion des variables d'environnement

## Installation ⚙️

1. **Téléchargez le Dépôt :**

    Téléchargez le dépôt depuis la page de téléchargement ou en utilisant `git` si disponible.

2. **Accédez au Répertoire du Projet :**

    ```bash
    cd nom-du-repertoire
    ```

3. **Installez les Dépendances :**

    ```bash
    npm install
    ```

4. **Configurez le Fichier `config.json` :**

    Configurez le `config.json` à la racine du projet avec les configurations nécéssaires

## Utilisation 🚀

1. **Démarrez le Bot :**

    Lancez le bot avec la commande :

    ```bash
    npm start
    ```

2. **Fonctionnalités :**

    - **Notification d'Ajout au Serveur :** Le bot informe le canal spécifié lorsqu'il est ajouté à un nouveau serveur, en indiquant le nombre total de serveurs et le nombre de membres dans le nouveau serveur.
    - **Notification de Départ du Serveur :** Le bot informe le canal spécifié lorsqu'il quitte un serveur, avec des détails similaires à ceux fournis lors de l'ajout.

## Configuration ⚙️

- **`config.json`** : Configurez ce fichier pour définir le token du bot et le canal de notification.


## Gestion des Erreurs ⚠️

Les erreurs sont capturées et journalisées. Consultez les logs pour toute erreur éventuelle.

## Contribuer 🤝

Les contributions sont les bienvenues ! Veuillez soumettre un problème ou une demande de tirage pour toute amélioration ou correction.

## Contact 📬

Pour toute question ou support, veuillez contacter :

- **Hugo76_macha**

---