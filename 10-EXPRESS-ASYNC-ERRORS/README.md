Commande à utiliser pour tester chaque fichier.
```
http :3000/
```


Dans le fichier 01 on constate que le serveur crash à cause d'une erreur.
Si on enlève le `async` dans ce fichier, on constate que le serveur ne crash pas.


Pour gérer l'erreur dans la version ASYNC il faut ajouter un try catch block comme dans le fichier 02.

