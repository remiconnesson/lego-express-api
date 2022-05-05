Commandes à tester avec chacun des fichiers pour constater
- soit l'absence de PARSE lorsqu'on ne met pas le middlewar
- soit le fait qu'on arrive à PARSER le json avec le middleware
```
http POST localhost:3000 hello=World valeur=2
```
Notez que le nombre n'a pas été converti en nombres (il est sous forme deString.
