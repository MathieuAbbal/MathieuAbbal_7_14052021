--Insertion dans la table Users --
INSERT INTO Users (id,prenom,nom,email,password,avatar,bio,isAdmin)VALUES
(NULL,'admin','groupomania','admin@mail.com','le mot de passe','http://localhost:3000/images/Admin.jpg','Je suis l''administrateur du réseau Groupomania !',1),
(NULL,'Jack','Sparrow','jacksparrow@mail.com','le mot de passe','http://localhost:3000/images/Jack_Sparrow.jpg','Seigneur pirate de la mer des Caraïbes.J''apprécie la liberté que lui apporte sa vie de boucanier, buvant du rhum et séduisant des femmes tout en cherchant des trésors surnaturels.',0),
(NULL,'Walter','White','walterwhite@mail.com','le mot de passe','http://localhost:3000/images/Walter_White.jpg','Professeur de physique-chimie atteint d''un cancer du poumon qui s''est reconverti en fabricant de méthamphétamine afin de subvenir aux besoins de ma famille',0 ),
(NULL,'John','Connor','johnconnor@mail.com','le mot de passe','http://localhost:3000/images/John_Connor.jpg','Adolescent rebelle qui désobéit à ses parents adoptifs et préfère « zoner » avec mes copains et faire de la motocross, en portant un t-shirt du groupe de rap Public Enemy.',0),
(NULL,'James','Bond','jamesbond@mail.com','le mot de passe','http://localhost:3000/images/James_Bond.jpg','Agent des services secrets britanniques mes missions peuvent avoir lieu partout dans le monde.',0),
(NULL,'Mia','Wallace','miawallace@mail.com','le mot de passe','http://localhost:3000/images/Mia_Wallace.jpg','Je suis une femme riche, belle et séduisante avec beaucoup de charme...mais attention mon nom est Wallace! je suis une femme aussi fragile, qui a besoin de compagnie, qu''on a envie de protéger et qui cache un certain mal être...Je le cache derrière la drogue et la mort ne tarde pas à me frôler!',0);

--Insertion dans la table posts--
INSERT INTO posts (id,)