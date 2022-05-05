Commande à utiliser pour tester chaque fichier.
```
http :3000/
```


Dans le fichier 01 on constate que le serveur crash à cause d'une erreur.
Si on enlève le `async` dans ce fichier, on constate que le serveur ne crash pas.

Pour gérer l'erreur dans la version ASYNC il faut ajouter un try catch block comme dans le fichier 02.

Le fichier 03 est optionnel et permet de montrer comment factoriser les blocks try/catch hors des routes async.

Le fichier 04 montre que le monkeypatch offert par le module `async-express-errors` permet de traiter les routes `async` comme les routes qui ne le sont pas _(cf. `../09` )_.

Pour gérer les routes async, vous pouvez choisir une recette illustrée dans les fichiers 02, 03 ou 04.


