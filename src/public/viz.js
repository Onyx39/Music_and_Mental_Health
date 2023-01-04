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
 * Permet de montrer les % des tranches du pie chart
 * @param chart Le pie chart sur quoi faire la modification
 */
const montrerPourcentagesPieChart = (chart) => {
    chart.selectAll('text.pie-slice').text(function (d) {
        if (((d.endAngle - d.startAngle) / (2 * Math.PI) * 100) !== 0) {
            return dc.utils.printSingleValue(Math.round((d.endAngle - d.startAngle) / (2 * Math.PI) * 100)) + '%';
        }
    })
}

/**
 * La fonction pour créer la visualisation
 */
async function createDataViz() {

    // On récupère le dataset et on le met dans la variable dataset
    let dataset = await d3.csv("/data/survey.csv");

    // On formate un peu la donnée pour nous éviter des soucis
    
    let anxietyPerHdp = {}
    let depressionPerHdp = {}
    let insomniaPerHdp = {}

    dataset.forEach((d) => {

        d["While working"] = d["While working"] === "Yes";
        d["Instrumentalist"] = d["Instrumentalist"] === "Yes";
        //d["Composer"] = d["Composer"] === "Yes";
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
            anxietyPerHdp[d["Hours per day"]] = []
        }
        anxietyPerHdp[d["Hours per day"]].push(d["Anxiety"])

        if (depressionPerHdp[d["Hours per day"]] === undefined) {
            depressionPerHdp[d["Hours per day"]] = []
        }
        depressionPerHdp[d["Hours per day"]].push(d["Depression"])

        if (insomniaPerHdp[d["Hours per day"]] === undefined) {
            insomniaPerHdp[d["Hours per day"]] = []
        }
        insomniaPerHdp[d["Hours per day"]].push(d["Insomnia"])

        d["Timestamp"] = new Date(d["Timestamp"]);
    });

    //console.log(anxietyPerHdp)

    const moyenneAnxiety = {};
    for (let hpd in anxietyPerHdp) {
        moyenneAnxiety[hpd] = d3.mean(anxietyPerHdp[hpd])
    }

    const moyenneDepression = {};
    for (let hpd in depressionPerHdp) {
        moyenneDepression[hpd] = d3.mean(depressionPerHdp[hpd])
    }

    const moyenneInsomnia = {};
    for (let hpd in insomniaPerHdp) {
        moyenneInsomnia[hpd] = d3.mean(insomniaPerHdp[hpd])
    }

    //console.log("§§§ moyenne : ", moyenne)

    dataset.forEach((d) => {
        d["meanAnxietyPerHpd"] = moyenneAnxiety[d["Hours per day"]]
        d["meanDepressionPerHpd"] = moyenneDepression[d["Hours per day"]]
        d["meanInsomniaPerHpd"] = moyenneInsomnia[d["Hours per day"]]
    })

   // console.log(dataset)

    // On crée le crossfilter que l'on va nommer ndx (une pseudo norme)
    const ndx = crossfilter(dataset);




    /* ===== COMPOSER - PIE CHART ===== */
    /*

    // On crée la dimension qui sera 'composer' (ou "Aucune information" s'il n'y a pas d'info)
    const composerDimension = ndx.dimension(function (d) {
        return d["Composer"] || "Aucune information";
    });

    // On crée le groupe, on veut le nombre de mass shooting par saison
    const composerGroup = composerDimension.group().reduceCount();

    // On crée le graphique avec le groupName
    const composerChart = dc.pieChart('#composerChart', groupName)
        .dimension(composerDimension) // On ajoute la dimension
        .group(composerGroup) // On ajoute le groupe
        .renderLabel(true) // On rend les labels
        .renderTitle(true) // On rend les titres (quand on passe la sourie sur un élément)
        .ordering(function (p) { // On veut trier par valeur croissante
            return -p.value;
        })
        .ordinalColors(['#F94144', '#F3722C']) // Les couleurs des éléments
        .legend(dc.legend().highlightSelected(true).x(0).y(13)) // On ajoute la légende
        .title(function (d) {
            return d.value
        }) // Le titre à montrer quand la sourie est passée sur un élément
        .on('pretransition', montrerPourcentagesPieChart); // On veut montrer les % dans les tranches
    
    */
    /* ===== FIN SAISONS - PIE CHART ===== */



    /* ===== MOYENNE ANXIETE FONCTION ANXIETE - LINE CHART ===== */


    // On crée la dimension qui sera 'composer' (ou "Aucune information" s'il n'y a pas d'info)
    const linechartanxietyDimension = ndx.dimension(function (d) {
        return d["Hours per day"] || "Aucune information";
    });

    // On crée le groupe, on veut le nombre de mass shooting par saison
    const linechartanxietyGroup = linechartanxietyDimension.group().reduce(
        function(p, v) {
            p = v['meanAnxietyPerHpd']
            return p
        },
        function (p, v) {
            p = v['meanAnxietyPerHpd']
            return p
        }, 
        function (){return 0;}
    )

    console.log(linechartanxietyGroup.top(Infinity))

    const lineChart1 = new dc.LineChart("#linechart1", groupName)
        .x(d3.scaleLinear().domain([0, 24]))
        .y(d3.scaleLinear().domain([0, 10]))
        .dimension(linechartanxietyDimension)
        .group(linechartanxietyGroup)
        .brushOn(false)
        .yAxisLabel("Mean of anxiety")
        .xAxisLabel("Hours per day")
        .on('renderlet', function(chart) {
            chart.selectAll('rect').on('click', function(d) {
                console.log('click!', d);
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
        function(p, v) {
            p = v['meanDepressionPerHpd']
            return p
        },
        function (p, v) {
            p = v['meanDepressionPerHpd']
            return p
        }, 
        function (){return 0;}
    )

    //console.log(linechartanxietyGroup.top(Infinity))

    const lineChart2 = new dc.LineChart("#linechart2", groupName)
        .x(d3.scaleLinear().domain([0, 24]))
        .y(d3.scaleLinear().domain([0, 10]))
        .dimension(linechartdepressionDimension)
        .group(linechartdepressionGroup)
        .brushOn(false)
        .yAxisLabel("Mean of depression")
        .xAxisLabel("Hours per day")
        .on('renderlet', function(chart) {
            chart.selectAll('rect').on('click', function(d) {
                console.log('click!', d);
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
        function(p, v) {
            p = v['meanInsomniaPerHpd']
            return p
        },
        function (p, v) {
            p = v['meanInsomniaPerHpd']
            return p
        }, 
        function (){return 0;}
    )


    const lineChart3 = new dc.LineChart("#linechart3", groupName)
        .x(d3.scaleLinear().domain([0, 24]))
        .y(d3.scaleLinear().domain([0, 10]))
        .dimension(linechartinsomniaDimension)
        .group(linechartinsomniaGroup)
        .brushOn(false)
        .yAxisLabel("Mean of insomnia")
        .xAxisLabel("Hours per day")
        .on('renderlet', function(chart) {
            chart.selectAll('rect').on('click', function(d) {
                console.log('click!', d);
            });
        });

    /* ===== MOYENNE INSOMNIA FONCTION ANXIETE - LINE CHART ===== */



    // On veut rendre tous les graphiques qui proviennent du chart group "dataset"
    dc.renderAll(groupName);
}