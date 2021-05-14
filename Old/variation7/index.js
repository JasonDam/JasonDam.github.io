//the fields communities, stations, crimes, and communitiesNearStations are all imported in index.html

const createVisualization = () => {
    const width = 1000, height = 1200;

//this projection scales geographic coordinates to the appropriate screen size
    var projection = d3.geoMercator()
        .center([-114.0719, 51.0447])
        .scale(100000)
        .translate([width/2 - 50, height/2 - 50]);

    var path = d3.geoPath()
        .projection(projection);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

//Create Calgary map with community borders
    svg.selectAll("path")
        .data(communities.features)
        .enter().append("path")
        .attr("d", path)

//Plot stations
    svg.selectAll("circle")
        .data(stations).enter()
        .append("circle")
        .attr("cx", (d) => { return projection([d.coordinates[1], d.coordinates[0]])[0]; })
        .attr("cy", (d) => { return projection([d.coordinates[1], d.coordinates[0]])[1]; })
        .attr("r", "3px")
        .attr("fill", (d) => {
            if (d['Station Name'] == "Chinook"){
                return "red"
            } else {
                return "blue"
            }
        })

    const boxHeight = 150, boxWidth = 350, titleFontSize = 24, fontSize = 12, marginLeft = 15, marginTop = 20, boxDist = 200;
    var eleLocX;
    var eleLocY;
    //creates the container box
    // svg.selectAll("rect")
    //     .data(stations).enter()
    //     .append('rect')
    //     .filter( (d) => {
    //         return d['Station Name'] == "Chinook";
    //     })
    //     .attr("x", (d) => {
    //             eleLocX = projection([d.coordinates[1],d.coordinates[0]])[0] + boxDist;
    //             return eleLocX;
    //     })
    //     .attr("y", (d) => {
    //             eleLocY = projection([d.coordinates[1],d.coordinates[0]])[1] - boxHeight;
    //             return eleLocY;
    //     })
    //     // .attr("opacity", 0.5)
    //     .attr("width", boxWidth)
    //     .attr("height", boxHeight)
    //     .style("fill", "beige");

    //Selecting and printing the Train station name
    svg.selectAll("textTitle")
        .data(stations).enter()
        .append("text")
        .filter( (d) => {return d['Station Name'] == "Chinook"})
        .attr("font-size", titleFontSize)
        .attr("x", (d) => {
            eleLocX = projection([d.coordinates[1],d.coordinates[0]])[0];
            return eleLocX + boxDist - marginLeft;
        })
        .attr("y", (d) => {
            eleLocY = projection([d.coordinates[1],d.coordinates[0]])[1];
            return eleLocY;
        })
        .text(function (d) {
                return d['Station Name'] + " Station"
        })

    //Creating the heading
    svg.selectAll("textHeading1")
        .data(stations).enter()
        .append("text")
        .attr("font-size", 18)
        .attr("x", eleLocX + boxDist)
        .attr("y", eleLocY + marginTop)
        .text("Community Name and Crime Count:")

    //The below calculates the data for each community that is "selected"
    //it is just static data right now but could be changed with variables
    //Variable created for the crime count per community
    var crimeCount = 0;

    svg.selectAll("textCrimeData")
        .data(crimes).enter()
        .append("text")
        .filter((d) => { return d['Community Name'] == "CHINOOK PARK"})
        .attr("font-size", fontSize)
        .attr("x", eleLocX + boxDist + marginLeft)
        .attr("y", eleLocY + marginTop * 2)
        .text(function (d) {
            // if (d['Community Name'] == "CHINOOK PARK"){
                crimeCount = crimeCount + parseInt( (d.crimes = d['Crime Count']));
            // }
        })
        .text("Chinook Park: \t" + crimeCount)

    svg.selectAll("line")
        .data(stations).enter()
        .append("line")
        .filter( (d) => {return d["Station Name"] == "Chinook"})
        .attr("x1", eleLocX)
        .attr("x2", eleLocX + boxWidth + boxDist/2)
        .attr("y1", eleLocY)
        .attr("y2", eleLocY)
        .attr("stroke-width", 2)
        .attr("stroke", "black")
};