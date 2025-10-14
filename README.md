# Algo avancé au campus numérique

**TODO**: Check si le programme tourne sur windows.

### Les programmes de tri
Pour obtenir les logs de certains programmes il est possible de rajouter :
- (Optionel) -l ou --log 

```
g++ sorts/***nom_du_fichier.cpp*** -o sorting && ./sorting
```
<sub>Exemple : g++ sorts/sorting.cpp -o sorting && ./sorting</sub>

### Pour le programme de tri visuel

Être dans le dossier algo-av:
```
g++ visual-sort/visual_sort.cpp visual-sort/visual_sort_utils.cpp visual-sort/visual_sorts_option.cpp  -o sorting && ./sorting
```

Une fois compilé on peut lancer le programme avec un multiple nombre d'entrées (10-50).
Exemple :
```
./starting 25
```

Une fois compilé on peut lancer le programme a 5 vitesses différentes (1-5).
Exemple :
```
./starting 25 4
```

Liste des choses vues :
 - Algo de tri
 - Args en C++
 - Affichage console


 Pour plus d'aide :


```
./starting -h           or          ./starting --help
```


---

# Advanced Algorithms at the Digital Campus

TODO: Check if the program runs on Windows.

### Sorting Programs
To enable logs in some programs, you can optionally add:
- (Optional) -l or --log 

```
g++ sorts/***file_name.cpp*** -o sorting && ./sorting
```
<sub>Example: g++ sorts/sorting.cpp -o sorting && ./sorting </sub>

### For the Visual Sorting Program

Be in the algo-av directory:
```
g++ visual-sort/visual_sort.cpp visual-sort/visual_sort_utils.cpp visual-sort/visual_sorts_option.cpp -o sorting && ./sorting
```

Once compiled, you can run the program with a variable number of entries (10–50).
Example:
```
./starting 25
```

you can also run the program with 5 different speed levels (1–5).
Example:
```
./starting 25 4
```
Topics covered:
 - Sorting algorithms
 - Command-line arguments in C++
 - Console output

 For more help:
```
./starting -h           or          ./starting --help
```