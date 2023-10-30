# Test pratique back-end

Les énoncés suivants sont indépendants de tout langage et seront à réaliser dans le langage et les technos de votre choix.

## Exercice 1

Écrire une fonction dont le but est de calculer le score d'une chaine de caractères (`string`) et de retourner un entier (`int`) en fonction des règles suivantes :

* La chaine de caractères ne peut contenir que les symboles `.`, `~`, `-`, `=`, `<`, `>`.
* Une flèche ne peut débuter que par `<` ou `>`.
* Les flèches sont pondérées en fonction de leur longueur et leur direction. Les flèches vers la gauche ont un score négatif tandis que les flèches vers la droite ont un score positif. Par exemple :
  * `>` compte pour 1
  * `->` compte pour 2
  * `<` compte pour -1
  * `<-` compte pour -2
* La hampe de la flèche (si celle-ci en a une) doit être faite uniquement de `-`, de `=` ou de `~`. Il ne peut pas y avoir de mélange entre les trois.
* Ainsi, `-->` vaut 3, mais dans `=->`, on ne considèrera que `->` comme faisant partie de la flèche.
* De plus, les flèches dont la hampe est composée de `=` comptent le double de celles dont la hampe est composée de `-`. Par exemple :
  * `-->` compte pour 3
  * `==>` compte pour 6
  * `<=` compte pour -4
* De la même manière, les flèches dont la hampe est composée de `~` comptent pour la moitié des flèches classiques. Ainsi :
  * `~~>` compte pour 1.5
* Les flèches bidirectionnelles, comme `<->` ou `<===>` comptent pour 0.
* `.` est un caractère nul et ne peut faire partie de la hampe d'une flèche.
* Lorsque plusieurs pointes se succèdent, la valeur de la flèche est montée à la puissance. La valeur de la puissance correspond au nombre de pointes. Par exemple :
  * `-->>>` compte pour 5³ = 125
  * `<<~~~` compte pour -(2.5)² = -6.25
  * `=>>>>` compte pour 10⁴ = 10000
  * `<-->>>` compte pour 0 car c'est une flèche bidirectionnelle
* Prévoir également une gestion d'erreur dans le cas où la chaine de caractères contient d'autres caractères que ceux prévus

### Exemples

```python
arrowCount('>.') # 1
arrowCount('<--..') # -3
arrowCount('><=><--') # -2
arrowCount('>===>~>') # 10
arrowCount('->><=>><') # 8
arrowCount('>-<=<=><=<=.>><') # -8
```

# Exercice 2

Écrire une fonction qui prend en entrée un fichier `arrows.txt` et calcule la valeur de chaque ligne en utilisant la fonction développée précédemment.
Le résultat doit être enregistré dans un nouveau fichier `arrows_result.csv` qui comportera deux colonnes, la première étant la ligne de flèches et la deuxième la valeur de la ligne.

# Exercice 3

Mettre en place une API RESTful permettant d'utiliser la fonction créée lors de l'exercice 2. Pour cela, il faudra :

* Créer la route `POST /arrows` qui prendra en body le JSON suivant :

```json
{
  "arrowSentence": "<<<--<==.>><~>~~>"
}
```

La route devra utiliser la fonction créée à l'exercice 2.

* La réponse de l'appel à la route `POST /arrows` sera sous format JSON et devra renvoyer le score de la chaine de caractères.

```json
{
  "score": -125.5
}
```
