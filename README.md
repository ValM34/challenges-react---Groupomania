Pour utiliser la base de données :

Vous devez importer le fichier groupomania_development.sql dans mysql. 

Ensuite il vous faudra aller dans ./backend/config/config.json. 

Dans la partie "development", changez le username en fonction de votre identifiant mysql, changez les mot de passe et changez le nom de la base de données si necéssaire.

Ensuite il vous faudra changer les variables dans le fichier .env pour pouvoir vous connecter à la base de données. Ce fichier a été envoyé sur Github pour ce projet, mais dans la réalité je ne l'aurais pas push.

NODE_ENV=development  ---> Laisser tel quel

TOKEY_KEY=s7UcdjHZk33fiuMhH5in4Tu27BYhz6RCKFZCY82tU858bw_KA5QxDPvyi6xYdU7x7eF4z356223MPuwMe6YZSy5hz87x5N4R5BK9XS9z6up3MG_zxVB42TF748S3VmH2tMd6y67nQq5t6j8qhy9h6T3XG  ---> Laisser tel quel

database=(nom de la base de données)

user=(utilisateur mysql)

password=(mot de passe mysql)



Pour lancer le backend :

Allez dans le dossier backend et installez les dépendances en utilisant la commande npm install.
Ensuite écrivez nodemon server pour lancer le serveur.



Pour lancer le frontend :

Allez dans le dossier React-app et installez les dépendances en utilisant la commande npm install.
Ensuite écrivez npm start pour lancer le serveur.