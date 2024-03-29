## Projet 7 de la formation de developpeur Web  chez **OpenClassrooms**  
## Scénario
Création d'un réseau social d'entreprise pour Groupomania (une socièté fictive).  
Développement d'une application web full stack.
## Fonctionnalités implémentées   
* Création d'utilisateurs  
* Connection d'un utilisateur  
* Création de publication (avec texte et/ou image):
    * modification de la publication    
    * suppression de la publication  
* Création de commentaire sur les publications:
    * suppression du commentaire
* Modification des informations sur l'utilisateur:  
    * biographie
    * avatar (image de profil)
* Modération par un administrateur:  
    * suppression des publications inappropriées
    * suppression des commentaires inappropriés      
## Technologie Utilisées

**Client:**  VueJS , TailwindCSS

**Server:** NodeJS , Express

**Database:** MySQL , Sequelize ORM
## Installation en local
Clonez le repository
```
  git clone https://github.com/MathieuAbbal/MathieuAbbal_7_14052021.git
```
### Pour la base de donnée  

Vous devez avoir MySQL installé sur votre machine.
Vous devrez vérifier que le nom d'utilisateur et le mot de passe correspondent à vos informations d'identification MySQL locales.
(dans le fichier config.json qui se trouve dans le dossier config)

Vous devez créer un fichier ```.env``` dans le dossier backend.

Et renseigner les élements suivants:
```
    DBHOST = localhost
    DBNAME = database_development
    DBUSER = votre nom d'utilisateur
    DBPASSWORD = votre mot de passe 
```
Connectez-vous au serveur MySql de votre choix.
Créez une base de données nommée ```database_development```  
Y importer le fichier ```database_development.sql``` (qui se trouve dans le dossier backend)

Pour vous connecté avec les droits d'administration:
    Email ```admin@mail.com```  
    Mot de Passe ```admin```  

### Pour la partie frontend    
Ouvrir votre terminal à la racine du projet
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
Ouvrir un nouveau terminal  
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
## Documentation  

- [Specs Groupomania](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P7/Groupomania_Specs_FR_DWJ_VF.pdf)

- [Guidelines API](https://docs.google.com/spreadsheets/d/1BfpuqTKowLgN8UCJKqP31VnYWhotR0pF4Kjd7QdE8T4/edit?usp=sharing)  

- [Base de donnée MySQL Groupomania](https://docs.google.com/spreadsheets/d/1t_zl2QYMNdrqLJOQsk6VaDG1qoQEUeoTCdlDsAuto3s/edit?usp=sharing)  

- [Documentation Postman](https://documenter.getpostman.com/view/15223026/Tzscomr7)

