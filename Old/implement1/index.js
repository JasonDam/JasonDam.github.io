function makeScatter(id){
    let viewBox = document.getElementById(id).viewBox.baseVal;
    let totalWidth = viewBox.width;
    let totalHeight = viewBox.height;

    let margins = {top: 20, right: 20, bottom: 20, left: 40};
    let innerWidth = totalWidth - margins.left - margins.right;
    let innerHeight = totalHeight - margins.top - margins.bottom;

    let chart = d3.select("#chartScatter");

    // let domain = d3.extent(data[0]);
    let domain = [50.8,51.25];
    let domain2 = [-113.85, -114.5];
    let range = [innerHeight, 0];
    let scale = d3.scaleLinear(domain,range).nice();

    // let domain2 = d3.extent(data[1]);
    let range2 = [0, innerWidth];
    let scale2 = d3.scaleLinear(domain2,range2).nice();
    let marginHeight = innerHeight + margins.top;

    let scale3 = d3.scaleLinear(domain,range2).nice();


    chart.append('rect')
        .attr("x", margins.left)
        .attr("y", margins.top)
        .attr("width", innerWidth)
        .attr("height", innerHeight)
        .style("fill", "white");

    chart.append("g")
        .attr("transform", `translate(${margins.left},${margins.top})`)
        .call(d3.axisLeft(scale));

    chart.append("g")
        .attr("transform", `translate(${margins.left},${marginHeight})`)
        .call(d3.axisBottom(scale2));

    chart.append('g')
        .attr("transform", `translate(${margins.left}, ${margins.top})`)
        .attr('class', 'grid')
        .call(d3.axisLeft(scale)
            .tickFormat('')
            .tickSize(-innerWidth)
        );

    let plot = chart.append("g")
        .attr('transform', `translate(${margins.left}, ${margins.top})`)
        .selectAll(".plot")
        .data(data);

    plot.enter().append("circle").attr("class", ".plot")
        .merge(plot)
        .attr("r", "5px")
        .attr("cx", (d,i) => (scale2(d[1])))
        .attr("cy", (d,i) => (scale(d[0])))
        .attr("fill", "red");
}