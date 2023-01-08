# Music_and_Mental_Health
Mini projet de visualisation de données en JS.

Valentin Richard

Emma ORSET

## Voir la visualisation
Pour voir la visualisation : 

1. Entrer dans le dossier <i>src</i>

2. Run ```npm install```

3. Run ```npm start```

4. Accéder à [http://localhost:3000/index32.html](http://localhost:3000/index32.html) depuis un navigateur.

## Objectif du projet
Le but de ce projet était d'analyser des données relatives à la musique et à la santé mentale en utilisant D3.js. Nous avons, au travers de notre étude, essayé de déterminer deux choses. 

- La première : savoir si le temps d'écoute de musique influence la santé mentale
- La seconde : savoir si la pratique de la musique influence la santé mentale

Nous nous sommes donc appuyés sur le modèle HTML contenant 6 graphiques. Sur la première ligne, se trouvent des graphique relatifs au 1er objectif, et dans le deuxième des graphiques relatifs au second. En ce qui concerne la pratique de musique, nous avions deux indicateurs dans les données ('Composer' et 'Instrumentalist'). Nous avons choisi de les prendre en compte tous les deux car ils sont révalteurs d'une pratique de la musique. Chaque ligne correspond à un indicateur de santé mentale. Sur les 4 à notre disposition, on avons retenu l'anxiété, la dépression et l'insomnie, car, les TOC étant plus rares, nous pensions obetnir des résultats moins probant.

## Résultat
Nous avons réussi à afficher les 6 graphiques dans la page <i>index32.html</i>. Cela n'a pas été facile car nous ne connaissions pas d3.js, et il nous aura fallu de l'aide pour comprendre comment les réaliser. Par construction, notre dashboard n'est pas interactif, ce qui peut paraître regrettable.

Nous avons effectué ce travail sur une seule séance de TP, dans laquelle nous avons dû à la fois prendre en main D3.js, comprendre les données et les exploiter. Même si nous avons manqué de temps, nous sommes contents d'avoir réussi à faire quelque chose, même si ce n'est pas interactif.

## Analyse des graphiques
Nous partions dans ce projet en pensant que l'écoute ou la pratique de la musique auraient un impact positif sur la santé mentale des personnes. Il semble que nous nous soyions trompés. En effet la tendance inverse semble se dessiner : plus une personne est familière avec la musique (que ce soit par l'écoute ou la pratique) moins elle semble en bonne santé mentale. Cette tendance n'est pas, il est vrai, extrêmement claire, mais elle apparait dans plusieurs graphiques. Un plus grand dataset aurait peut-être permis de lisser certains comportements hératiques, notamment dans les linecharts.

Mais nous avions peut-être pris le problème à l'envers, et considéré la cause comme la conséquence. Il se pourrait que ce soit plutôt les personnes avec une santé mentale instable qui se tournent vers la musique pour essayer d'aller mieux.
