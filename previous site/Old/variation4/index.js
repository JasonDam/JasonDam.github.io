//the fields communities, stations, crimes, and communitiesNearStations are all imported in index.html
//This site was used as reference: http://bl.ocks.org/almccon/a53831a573911d0a875821c5f9fac6be

const createVisualization = () => {
    const width = 950, height = 1100;
    const selectedCommunity = "VARSITY";

    //this projection scales geographic coordinates to the appropriate screen size
    var projection = d3.geoMercator()
        .center([-114.0719, 51.0447])
        .scale(100000)
        .translate([width/2, height/2 - 50]);

    var path = d3.geoPath()
        .projection(projection);

    //These are all crimes in 2019
    const crimeData2019 = crimes.filter((crime) => {
       return crime["Year"] === "2019";
    });

    //These are all crimes in the communities surrounding stations in 2019
    const crimeDataStations2019 = crimeData2019.filter((crime) => {
        return communitiesNearStations.includes(crime["Community Name"]);
    });

    //This is the aggregated data for total crimes of each community
    var totalCrimes = {};
    crimeDataStations2019.forEach((crime) => {
        const communityName = crime["Community Name"];
        //If there is an entry in the totalCrimes map for that specific community, increment the count, else, initialize to 1.
        totalCrimes[communityName] = totalCrimes[communityName] ? totalCrimes[communityName] + 1 : 1;
    });

    const crimeDomain = [30, 50, 70, 90, 110, 130];
    const colours = ["#ffe6e6", "#ffcccc", "#ff9999", "#ff4d4d", "#ff0000", "#b30000"];

    //Create the scale functions for colour of community depending on crime count in domain
    const colourScale = d3.scaleThreshold()
        .domain(crimeDomain)
        .range(colours);

    console.log(totalCrimes);

    var svg = d3.select(".map").append("svg")
        .attr("width", width)
        .attr("height", height);

    //Create Calgary map with community borders
    svg.selectAll("path")
        .data(communities.features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", (d) => {
            const communityName = d.properties["name"];
            console.log(communityName + ": " + totalCrimes[communityName]);
            //Colour the station communities the appropriate saturation of red, white if not station community
            return communitiesNearStations.includes(communityName) ? colourScale(totalCrimes[communityName]) : "#ffffff";
        })
        .attr("stroke", (d) => {
            return d.properties["name"] === selectedCommunity ? "aqua" : "black";
        })
        .attr("stroke-width", (d) => {
            return d.properties["name"] === selectedCommunity ? "4" : "0.5";
        });

    //Plot stations
    const station = svg.selectAll("g")
        .data(stations).enter()
        .append("g")
        .attr("transform", (d) => {
            return `translate(${projection([d.coordinates[1], d.coordinates[0]])[0]}, ${projection([d.coordinates[1], d.coordinates[0]])[1]})`
        });

    station.append("circle")
        .attr("r", "3.5px")
        .attr("fill", "blue");

    //Create crime information card
    const infoCard = d3.select(".legend").append("svg")
        .attr("width", "300px")
        .attr("height", "200px");

    infoCard.append("rect")
        .attr("class", "crime-card")
        .attr("width", "300px")
        .attr("height", "200px")
        .attr("stroke", "black")
        .attr("fill", "white");

    infoCard.append("text")
        .text(`${selectedCommunity}`)
        .attr("font-size", "36")
        .attr("transform", "translate(0, 36)");

    infoCard.append("text")
        .text(`Community Name: ${selectedCommunity}`)
        .attr("font-size", "14")
        .attr("transform", "translate(4, 72)");

    infoCard.append("text")
        .text(`Crime Count: ${totalCrimes[selectedCommunity]}`)
        .attr("font-size", "14")
        .attr("transform", "translate(4, 86)");

    svg.append("line")
        .attr("x1", "1000.125")
        .attr("y1", "266.625")
        .attr("x2", "1200")
        .attr("y2", "200")
        .attr("stroke", "black");

    //Create Legend
    d3.select(".legend").append("h3").text("Crime Count Legend");
    d3.select(".legend").append("svg")
        .attr("class", "legend-box")
        .append("g")
        .attr("class", "legend-quant");

    var legend = d3.legendColor()
        .labelFormat(d3.format(".0f"))
        .labels(d3.legendHelpers.thresholdLabels)
        .scale(colourScale)
        .shapePadding(5)
        .shapeWidth(18)
        .shapeHeight(18)
        .labelOffset(12);

    var legendBox = d3.select(".legend-box");

    legendBox.select(".legend-quant")
        .call(legend);
};
