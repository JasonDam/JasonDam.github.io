//the fields communities, stations, crimes, and communitiesNearStations are all imported in index.html
//This site was used as reference: http://bl.ocks.org/almccon/a53831a573911d0a875821c5f9fac6be

const createVisualization = () => {
    const width = 1200, height = 1100;
    const selectedCommunity = "SADDLE RIDGE";
    const selectedCenterPoint = [820, 255];

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

    //Filter geo data to just the communities surrounding station
    const communitiesGeo = communities.features.filter((community) => (communitiesNearStations.includes(community.properties["name"])));

    const svg = d3.select(".map").append("svg")
        .attr("width", width)
        .attr("height", height);

    //Create Calgary map with community borders
    svg.selectAll("path")
        .data(communitiesGeo)
        .enter().append("path")
        .attr("d", path)
        .attr("fill", "#ffffff")
        .attr("stroke", (d) => {
            return d.properties["name"] === selectedCommunity ? "red" : "black";
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
    const infoCard = svg.append("g")
        .attr("width", "300px")
        .attr("height", "200px")
        .attr("transform", "translate(850, 500)");

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
        .attr("x1", selectedCenterPoint[0])
        .attr("y1", selectedCenterPoint[1])
        .attr("x2", "1000")
        .attr("y2", "500")
        .attr("stroke", "black");
};
