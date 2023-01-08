# Music_and_Mental_Health
Mini projet de visualisation de données en JS.

## Voir la visualisation
Pour voir la visualisation : 
<ol>
<li>Entrer dans le dossier <i>src</i></li>
<li>Run `npm install`</li>
<li>Run `npm start`</li>
<li>Accéder à <i>localhost:3000/index32.html</i> depuis un navigateur</li>
</ol>

## Objectif du projetgit a
Le but de ce projet était d'analyser des données relative à la musique et à la santé mentale en utilisant D3.js. Nous avons, au travers de notre étude, essayé de déterminer deux choses. 
<ol>
<li>La première : savoir si le temps d'écoute de musique influence la santé mentale</li>
<li>La seconde : savoir si la pratique de la musique influence la santé mentale</li>
<br><br>
</ol>
Nous nous sommes donc appuyé sur le modèle HTML contenant 6 graphiques. Sur la première ligne, se trouvent des graphique relatifs au 1er objectif, et dans la deuxième des graphiques relatifs au second. En ce qui concerne la pratique de musique, nous avions deux indicateurs dans les données ('Composer' et 'Instrumentalist'). Nous avons choisi de les prendre en compte tous les deux car ils sont révalteurs d'une pratique de la musique. Chaque ligne correspond à un indicateur de santé mentale. Sur les 4 à notre disposition, on avons retenu l'anxiété, la dépression et l'insomnie, car, les TOC étant plus rares, nous pensions obetnir des résultats moins probant.

## Résultat
Nous avons réussi à afficher les 6 graphiques dans la page <i>index32.html</i>. Cela n'a pas été facile car nous ne connaissions pas d3.js, et il nous aura fallu de l'aide pour comprendre comment les réaliser. Par construction, notre dashboard n'est pas interactif, ce qui peut paraître regrettable.

## Analyse des graphiques
Nous partions dans ce projet en passant que l'écoute ou la pratique de la musique auraient un impact positif sur la santé mentale des personnes. Il semble que nous nous soyions trompé. En effet la tendance inverse semble se dessiner : plus une personne est familière avec la musique (que ce soit par l'écoute ou la pratique) moins elle semble en bonne santé mentale. Cette tendance n'est pas, il est vrai, extrêmement claire, mais elle apparait dans plusieurs graphiques. Un plus grand datset aurait peut être permis de lisser certains comportements hératiques, notamment dans les linecharts.<br>
Nous avions peut être pris le problème à l'envers, et considéré la cause comme la conséquence. Il se pourrait que ce soit plutôt les personnes avec une santé mentale instable qui se tournent vers la musique pour essayer d'aller mieux.
