![logo-removebg-preview](https://user-images.githubusercontent.com/72860893/127324350-cb329aef-4309-4faf-9986-a4e1ae64641c.png)
# Projet 7 de la formation de developpeur Web chez **OpenClassrooms**  
## Scénario
Création d'un réseau social d'entreprise pour Groupomania (une socièté fictive).  
Développement d'une application web full stack.
## Fonctionnalités implémentées   
    1. Création d'utilisateurs  
    2. Connection d'un utilisateur  
    3. Création de publication (avec texte et/ou image):
        - modification de la publication    
        - suppression de la publication  
    3. Création de commentaire sur les publications:
        - suppression du commentaire
    4. Modification des informations sur l'utilisateur:  
        - biographie
        - avatar (image de profil)
    5. Modération par un administrateur:  
        - suppression des publications inappropriées
        - suppression des commentaires inappropriés      
## Technologie Utilisées

**Client:**  VueJS , TailwindCSS

**Server:** Node, Express, Sequelize
## Installation en local
Clonez le repository
```
  git clone https://github.com/MathieuAbbal/MathieuAbbal_7_14052021.git
```
Ouvrir votre terminal à la racine du projet
### Pour la partie frontend  
Installation des dépendences:
```
    cd frontend
    npm install
```
lancement du serveur
```
    npm run serve
```
Rendez-vous sur ```http://localhost:8080/```
### Pour la partie backend
Installation des dépendences:
```
    cd backend
    npm install
````
lancement du serveur
```
    node server
ou  nodemon
```
Le serveur doit fonctionner sur "localhost" avec le port par défaut "3000".

### Pour la base de donnée
