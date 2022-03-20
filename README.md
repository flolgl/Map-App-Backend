#INSTALLATION

## Base de données
- Il suffit très simplement d'importer le fichier db.sql dans une base de données MySQL (MongoDB doit sans doute aussi fonctionner)

## Variables .env
- Créer un fichier nommé .env dans la racine si cela n'est pas déjà fait. 
- Ouvrir le fichier .env et copier les 4 petites lignes qui suivent.
```
DBHOST="localhost"
DBUSER="root"
DBPW=""
DB="pwebMap"
```
- Changer les valeurs afin qu'elles correspondent à votre config

## Installer les dépendances du projet
- Ouvrir un terminal dans le dossier Map-App-Backend
- ``npm install``
- Attendre

## Lancer le backend
- Dans ce même terminal
- ``npm start``
- Le serveur est fonctionnel si le message suivant apparaît après quelques secondes :
```
Le serveur tourne sur le port : 4000
Connecté à la base de données MySQL!
```
