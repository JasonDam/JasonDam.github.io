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

    const titleFontSize = 24, fontSize = 12, marginLeft = 15, marginTop = 20, boxDist = 250;

    //Selecting and printing the Train station name
    svg.selectAll("textTitle")
        .data(stations).enter()
        .append("text")
        .filter( (d) => {return d['Station Name'] == "Chinook"})
        .attr("font-size", titleFontSize + 12)
        .attr("x", marginLeft/2)
        .attr("y", marginTop + 12)
        .text(function (d) {
                return d['Station Name'] + " Station"
        })

    //The below calculates the data for each community that is "selected"
    //it is just static data right now but could be changed with variables
    //Variable created for the crime count per community
    var crimeCount = 0;

    svg.selectAll("textCrimeData")
        .data(crimes).enter()
        .append("text")
        .filter((d) => { return d['Community Name'] == "CHINOOK PARK"})
        .attr("font-size", fontSize)
        .attr("x", marginLeft)
        .attr("y", marginTop * 2.5) //can add a *i when we are doing multiple entries
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
        .attr("x1", marginLeft/2)
        .attr("x2", 350)
        .attr("y1", fontSize + 12 + marginTop/2)
        .attr("y2", fontSize + 12 + marginTop/2)
        .attr("stroke-width", 2)
        .attr("stroke", "black")
};