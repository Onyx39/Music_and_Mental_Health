/**
 * On crée la variable qui contiendra le nom du groupe de graphique du dashboard
 */
const groupName = "dataset";

/**
 * Fonction pour reset les filtres et redessiner les graphiques
 */
function reset() {
  dc.filterAll(groupName);
  dc.renderAll(groupName);
}

/**
 * La fonction pour créer la visualisation
 */
async function createDataViz() {
  // On récupère le dataset et on le met dans la variable dataset
  let dataset = await d3.csv("/data/survey.csv");

  // On formate un peu la donnée pour nous éviter des soucis

  let anxietyPerHdp = {};
  let depressionPerHdp = {};
  let insomniaPerHdp = {};

  dataset.forEach((d) => {
    d["While working"] = d["While working"] === "Yes";
    d["Exploratory"] = d["Exploratory"] === "Yes";
    d["Foreign languages"] = d["Foreign languages"] === "Yes";

    d["Age"] = +d["Age"];
    d["Hours per day"] = +d["Hours per day"];
    d["BPM"] = +d["BPM"];
    d["Anxiety"] = +d["Anxiety"];
    d["Depression"] = +d["Depression"];
    d["Insomnia"] = +d["Insomnia"];
    d["OCD"] = +d["OCD"];

    if (anxietyPerHdp[d["Hours per day"]] === undefined) {
      anxietyPerHdp[d["Hours per day"]] = [];
    }
    anxietyPerHdp[d["Hours per day"]].push(d["Anxiety"]);

    if (depressionPerHdp[d["Hours per day"]] === undefined) {
      depressionPerHdp[d["Hours per day"]] = [];
    }
    depressionPerHdp[d["Hours per day"]].push(d["Depression"]);

    if (insomniaPerHdp[d["Hours per day"]] === undefined) {
      insomniaPerHdp[d["Hours per day"]] = [];
    }
    insomniaPerHdp[d["Hours per day"]].push(d["Insomnia"]);

    d["Timestamp"] = new Date(d["Timestamp"]);
  });

  const moyenneAnxiety = {};
  for (let hpd in anxietyPerHdp) {
    moyenneAnxiety[hpd] = d3.mean(anxietyPerHdp[hpd]);
  }

  const moyenneDepression = {};
  for (let hpd in depressionPerHdp) {
    moyenneDepression[hpd] = d3.mean(depressionPerHdp[hpd]);
  }

  const moyenneInsomnia = {};
  for (let hpd in insomniaPerHdp) {
    moyenneInsomnia[hpd] = d3.mean(insomniaPerHdp[hpd]);
  }

  dataset.forEach((d) => {
    d["meanAnxietyPerHpd"] = moyenneAnxiety[d["Hours per day"]];
    d["meanDepressionPerHpd"] = moyenneDepression[d["Hours per day"]];
    d["meanInsomniaPerHpd"] = moyenneInsomnia[d["Hours per day"]];
  });

  // On crée le crossfilter que l'on va nommer ndx (une pseudo norme)
  const ndx = crossfilter(dataset);

  /* ===== MOYENNE ANXIETE FONCTION ANXIETE - LINE CHART ===== */

  // On crée la dimension qui sera 'composer' (ou "Aucune information" s'il n'y a pas d'info)
  const linechartanxietyDimension = ndx.dimension(function (d) {
    return d["Hours per day"] || "Aucune information";
  });

  // On crée le groupe, on veut le nombre de mass shooting par saison
  const linechartanxietyGroup = linechartanxietyDimension.group().reduce(
    function (p, v) {
      p = v["meanAnxietyPerHpd"];
      return p;
    },
    function (p, v) {
      p = v["meanAnxietyPerHpd"];
      return p;
    },
    function () {
      return 0;
    }
  );

  console.log(linechartanxietyGroup.top(Infinity));

  const lineChart1 = new dc.LineChart("#linechart1", groupName)
    .x(d3.scaleLinear().domain([0, 24]))
    .y(d3.scaleLinear().domain([0, 10]))
    .dimension(linechartanxietyDimension)
    .group(linechartanxietyGroup)
    .brushOn(false)
    .yAxisLabel("Anxiété (note moy.)")
    .xAxisLabel("Temps d'écoute en heure")
    .on("renderlet", function (chart) {
      chart.selectAll("rect").on("click", function (d) {
        console.log("click!", d);
      });
    });

  /* ===== MOYENNE ANXIETE FONCTION ANXIETE - LINE CHART ===== */

  /* ===== MOYENNE DEPRESSION FONCTION ANXIETE - LINE CHART ===== */

  // On crée la dimension qui sera 'composer' (ou "Aucune information" s'il n'y a pas d'info)
  const linechartdepressionDimension = ndx.dimension(function (d) {
    return d["Hours per day"] || "Aucune information";
  });

  // On crée le groupe, on veut le nombre de mass shooting par saison
  const linechartdepressionGroup = linechartdepressionDimension.group().reduce(
    function (p, v) {
      p = v["meanDepressionPerHpd"];
      return p;
    },
    function (p, v) {
      p = v["meanDepressionPerHpd"];
      return p;
    },
    function () {
      return 0;
    }
  );

  //console.log(linechartanxietyGroup.top(Infinity))

  const lineChart2 = new dc.LineChart("#linechart2", groupName)
    .x(d3.scaleLinear().domain([0, 24]))
    .y(d3.scaleLinear().domain([0, 10]))
    .dimension(linechartdepressionDimension)
    .group(linechartdepressionGroup)
    .brushOn(false)
    .yAxisLabel("Dépression (note moy.)")
    .xAxisLabel("Temps d'écoute en heure")
    .on("renderlet", function (chart) {
      chart.selectAll("rect").on("click", function (d) {
        console.log("click!", d);
      });
    });

  /* ===== MOYENNE DEPRESSION FONCTION ANXIETE - LINE CHART ===== */

  /* ===== MOYENNE INSOMNIA FONCTION ANXIETE - LINE CHART ===== */

  // On crée la dimension qui sera 'composer' (ou "Aucune information" s'il n'y a pas d'info)
  const linechartinsomniaDimension = ndx.dimension(function (d) {
    return d["Hours per day"] || "Aucune information";
  });

  // On crée le groupe, on veut le nombre de mass shooting par saison
  const linechartinsomniaGroup = linechartinsomniaDimension.group().reduce(
    function (p, v) {
      p = v["meanInsomniaPerHpd"];
      return p;
    },
    function (p, v) {
      p = v["meanInsomniaPerHpd"];
      return p;
    },
    function () {
      return 0;
    }
  );

  const lineChart3 = new dc.LineChart("#linechart3", groupName)
    .x(d3.scaleLinear().domain([0, 24]))
    .y(d3.scaleLinear().domain([0, 10]))
    .dimension(linechartinsomniaDimension)
    .group(linechartinsomniaGroup)
    .brushOn(false)
    .yAxisLabel("Insomnie (note moy.)")
    .xAxisLabel("Temps d'écoute en heure")
    .on("renderlet", function (chart) {
      chart.selectAll("rect").on("click", function (d) {
        console.log("click!", d);
      });
    });

  /* ===== MOYENNE INSOMNIA FONCTION ANXIETE - LINE CHART ===== */

  // ***************************************//

  // Initialisation des dictionnaires qui contiendront les moyennes
  let dictDepression = {};
  let dictInsomnia = {};
  let dictAnxiety = {};

  // On formate un peu la donnée pour nous éviter des soucis
  dataset.forEach((d) => {
    d["Instrumentalist"] = d["Instrumentalist"] === "Yes";
    d["Composer"] = d["Composer"] === "Yes";
  });

  // Initialisation des données qui contiendront la somme de chaque type de personne
  let instruCompo_D = 0;
  let instruNocompo_D = 0;
  let noinstruCompo_D = 0;
  let noinstruNocompo_D = 0;

  let instruCompo_I = 0;
  let instruNocompo_I = 0;
  let noinstruCompo_I = 0;
  let noinstruNocompo_I = 0;

  let instruCompo_A = 0;
  let instruNocompo_A = 0;
  let noinstruCompo_A = 0;
  let noinstruNocompo_A = 0;

  // Initialisation des compteurs de personnes
  let count_instruCompo = 0;
  let count_instruNocompo = 0;
  let count_noinstruCompo = 0;
  let count_noinstruNocompo = 0;

  // On rempli nos dictionnaires Depression, Insomnia et Anxiety
  dataset.forEach((d) => {
    // Si la personne itérée est instrumentiste et compositeur, on ajoute sa valeur de dépression, d'insomnie et d'anxiété à la somme des instrumentistes et compositeurs
    if (d["Instrumentalist"] === true && d["Composer"] === true) {
      instruCompo_D += d["Depression"];
      instruCompo_I += d["Insomnia"];
      instruCompo_A += d["Anxiety"];
      // On lui ajoute un type de personne (elle est instrumentiste et compositeur)
      d["typePersonne"] = "I&C";
      // On incrémente le compteur de personnes instrumentistes et compositeurs
      count_instruCompo += 1;
    } else if (d["Instrumentalist"] === true && d["Composer"] === false) {
      instruNocompo_D += d["Depression"];
      instruNocompo_I += d["Insomnia"];
      instruNocompo_A += d["Anxiety"];
      d["typePersonne"] = "I&noC";
      count_instruNocompo += 1;
    } else if (d["Instrumentalist"] === false && d["Composer"] === true) {
      noinstruCompo_D += d["Depression"];
      noinstruCompo_I += d["Insomnia"];
      noinstruCompo_A += d["Anxiety"];
      d["typePersonne"] = "noI&C";
      count_noinstruCompo += 1;
    } else {
      noinstruNocompo_D += d["Depression"];
      noinstruNocompo_I += d["Insomnia"];
      noinstruNocompo_A += d["Anxiety"];
      d["typePersonne"] = "noI&noC";
      count_noinstruNocompo += 1;
    }
  });

  // On calcule la moyenne de chaque type de personne et on l'ajoute au dictionnaire
  dictDepression["instruCompo"] = instruCompo_D / count_instruCompo;
  dictDepression["instruNocompo"] = instruNocompo_D / count_instruNocompo;
  dictDepression["noinstruCompo"] = noinstruCompo_D / count_noinstruCompo;
  dictDepression["noinstruNocompo"] = noinstruNocompo_D / count_noinstruNocompo;

  dictInsomnia["instruCompo"] = instruCompo_I / count_instruCompo;
  dictInsomnia["instruNocompo"] = instruNocompo_I / count_instruNocompo;
  dictInsomnia["noinstruCompo"] = noinstruCompo_I / count_noinstruCompo;
  dictInsomnia["noinstruNocompo"] = noinstruNocompo_I / count_noinstruNocompo;

  dictAnxiety["instruCompo"] = instruCompo_A / count_instruCompo;
  dictAnxiety["instruNocompo"] = instruNocompo_A / count_instruNocompo;
  dictAnxiety["noinstruCompo"] = noinstruCompo_A / count_noinstruCompo;
  dictAnxiety["noinstruNocompo"] = noinstruNocompo_A / count_noinstruNocompo;

  // Pour chaque personne, on lui ajoute les moyennes de Depression, Insomnia et Anxiety, en fonction de s'il est Instrumentalist et Composer ou non
  dataset.forEach((d) => {
    // Si son type de personne est I&C, on lui ajoute la moyenne de Depression, Insomnia et Anxiety des instrumentistes et compositeurs
    if (d["typePersonne"] === "I&C") {
      d["averageDepression"] = dictDepression["instruCompo"];
      d["averageInsomnia"] = dictInsomnia["instruCompo"];
      d["averageAnxiety"] = dictAnxiety["instruCompo"];
    } else if (d["typePersonne"] === "I&noC") {
      d["averageDepression"] = dictDepression["instruNocompo"];
      d["averageInsomnia"] = dictInsomnia["instruNocompo"];
      d["averageAnxiety"] = dictAnxiety["instruNocompo"];
    } else if (d["typePersonne"] === "noI&C") {
      d["averageDepression"] = dictDepression["noinstruCompo"];
      d["averageInsomnia"] = dictInsomnia["noinstruCompo"];
      d["averageAnxiety"] = dictAnxiety["noinstruCompo"];
    } else {
      d["averageDepression"] = dictDepression["noinstruNocompo"];
      d["averageInsomnia"] = dictInsomnia["noinstruNocompo"];
      d["averageAnxiety"] = dictAnxiety["noinstruNocompo"];
    }
  });

  /* ===== DEPRESSION - BAR CHART ===== */

  // On crée la dimension qui sera le type de personne
  const depressionDimension = ndx.dimension(function (d) {
    return d["typePersonne"];
  });

  // On crée le groupe, on veut la moyenne de la dépression pour chaque type de personne
  const depressionGroup = depressionDimension.group().reduce(
    function (p, v) {
      p = v["averageDepression"];
      return p;
    },
    function (p, v) {
      p = v["averageDepression"];
      return p;
    },
    function () {
      // Initialisation
      return 0;
    }
  );

  // On crée le graphique avec le groupName
  new dc.BarChart("#chart5", groupName)
    .xAxisLabel("Type de personne")
    .yAxisLabel("Dépression (note moy.)")
    .x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .dimension(depressionDimension) // On ajoute la dimension
    .group(depressionGroup) // On ajoute le groupe
    .elasticX(true) // On veut que l'axe des X puisse redimensionner tout seul
    .linearColors(["#fd6c9e"]);

  /* ===== END DEPRESSION - BAR CHART ===== */

  /* ===== INSOMNIA - BAR CHART ===== */

  // On crée la dimension qui sera le type de personne
  const anxietyDimension = ndx.dimension(function (d) {
    return d["typePersonne"];
  });

  // On crée le groupe, on veut la moyenne de la dépression pour chaque type de personne
  const anxietyGroup = anxietyDimension.group().reduce(
    function (p, v) {
      p = v["averageAnxiety"];
      return p;
    },
    function (p, v) {
      p = v["averageAnxiety"];
      return p;
    },
    function () {
      // Initialisation
      return 0;
    }
  );

  // On crée le graphique avec le groupName
  new dc.BarChart("#chart4", groupName)
    .xAxisLabel("Type de personne")
    .yAxisLabel("Anxiété (note moy.)")
    .x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .dimension(anxietyDimension) // On ajoute la dimension
    .group(anxietyGroup) // On ajoute le groupe
    .elasticX(true) // On veut que l'axe des X puisse redimensionner tout seul
    .linearColors(["#fd6c9e"]);

  /* ===== END INSOMNIA - BAR CHART ===== */

  /* ===== ANXIETY - BAR CHART ===== */

  // On crée la dimension qui sera le type de personne
  const insomniaDimension = ndx.dimension(function (d) {
    return d["typePersonne"];
  });

  // On crée le groupe, on veut la moyenne de la dépression pour chaque type de personne
  const insomniaGroup = insomniaDimension.group().reduce(
    function (p, v) {
      p = v["averageInsomnia"];
      return p;
    },
    function (p, v) {
      p = v["averageInsomnia"];
      return p;
    },
    function () {
      // Initialisation
      return 0;
    }
  );

  // On crée le graphique avec le groupName
  new dc.BarChart("#chart6", groupName)
    .xAxisLabel("Type de personne")
    .yAxisLabel("Insomnie (note moy.)")
    .x(d3.scaleBand())
    .xUnits(dc.units.ordinal)
    .dimension(insomniaDimension) // On ajoute la dimension
    .group(insomniaGroup) // On ajoute le groupe
    .elasticX(true) // On veut que l'axe des X puisse redimensionner tout seul
    .linearColors(["#fd6c9e"]);

  /* ===== END INSOMNIA - BAR CHART ===== */

  // On veut rendre tous les graphiques qui proviennent du chart group "dataset"
  dc.renderAll(groupName);
}
