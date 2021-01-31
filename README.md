# TP-redis

##  Utilisation

### Création d'un utilisateur

    POST localhost:5000/api/v1/signup 

Passer dans le body email, password, firstname, lastname.

### Authentification d'un utilisateur

    POST localhost:5000/api/v1/signin 

Passer dans le body email, password.

Renvoie un token à conserver.

### Accès à la donnée

    GET localhost:5000/api/v1/readData 

Passer en Bearer le token d'authentification précédemment récupéré.
Ce token donne accès à 10 requêtes sur une période de 10 min.
