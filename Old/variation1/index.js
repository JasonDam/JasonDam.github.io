//the fields communities, stations, crimes, and communitiesNearStations are all imported in index.html
//This site was used as reference: http://bl.ocks.org/almccon/a53831a573911d0a875821c5f9fac6be

const createVisualization = () => {
    const width = 950, height = 1100;
    const selectedStation = "Marlborough";
    const surroundingCommunities = {}
    surroundingCommunities["selectedStation"] = ["MARLBOROUGH", "FRANKLIN"];

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

    const descriptionSelection = d3.selectAll("svg")
        .append("g")
        .attr("class", "description")
        .attr("transform", "translate(1200, 150)");

    descriptionSelection.append("rect")
        .attr("width", "300px")
        .attr("height", "200px")
        .attr("fill","white")
        .attr("stroke","black")
        .attr("transform", "translate(0, -20)");

    d3.select(".description").selectAll("text")
        .data(surroundingCommunities["selectedStation"]).enter()
        .append("text")
        .text((d) => {
            console.log(d);
            return d + ": " + totalCrimes[d];
        })
        .attr("transform", (d, i) => {return `translate(4, ${48 + 18*i})`});

    d3.select(`#${selectedStation}`)
        .attr("style", "fill:red; stroke:yellow; stroke-width:3;");

    d3.select(".description")
        .append("text")
        .text(`${selectedStation} Station`)
        .attr("font-size", "36")
        .attr("transform", "translate(4, -36)");

    d3.select(".description")
        .append("text")
        .text("Crime Count of Surrounding Communities")
        .attr("transform", "translate(4, 0)")
        .attr("text-decoration", "underline");


    d3.selectAll("svg")
        .append("line")
        .attr("x1", "1000.125")
        .attr("y1", "266.625")
        .attr("x2", "1200")
        .attr("y2", "200")
        .attr("stroke", "black");
};
