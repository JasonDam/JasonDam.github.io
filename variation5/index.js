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

    const boxHeight = 150, boxWidth = 350, titleFontSize = 24, fontSize = 12, marginLeft = 15, marginTop = 20;

    //creates the container box
    svg.append('rect')
        .attr("x", 0)
        .attr("y", height - boxHeight)
        .attr("width", boxWidth)
        .attr("height", boxHeight)
        .style("fill", "beige");

    //Selecting and printing the Train station name
    svg.selectAll("textTitle")
        .data(stations).enter()
        .append("text")
        .filter( (d) => {return d['Station Name'] == "Chinook"})
        .attr("font-size", titleFontSize)
        .attr("x", marginLeft/2)
        .attr("y", (d,i) => (height - (boxHeight - (fontSize) - marginTop)))
        .text(function (d) {
                return d['Station Name'] + " Station"
        })

    //Creating the heading
    svg.selectAll("textHeading1")
        .data(stations).enter()
        .append("text")
        .attr("font-size", 18)
        .attr("x", marginLeft)
        .attr("y", (d,i) => (height - (boxHeight - (fontSize + marginTop) - marginTop)))
        .text("Community Name and Crime Count:")

    //The below calculates the data for each community that is "selected"
    //it is just static data right now but could be changed with variables
    //Variable created for the crime count per community
    var crimeCount = 0;
    svg.selectAll("textCrimeData")
        .data(crimes).enter()
        .append("text")
        .filter((d) => {return d['Community Name'] == "CHINOOK PARK"})
        .attr("font-size", fontSize)
        .attr("x", marginLeft)
        .attr("y", (d,i) => (height - (boxHeight - (fontSize + marginTop * 2) - marginTop)))
        .text(function (d) {
                crimeCount = crimeCount + parseInt( (d.crimes = d['Crime Count']));
        })
        .text("Chinook Park: \t" + crimeCount)
};