const $ = require('jquery');
const d3 = require('d3');

$(document).ready(() => {

    // define constants
    const WIDTH = 1000;
    const HEIGHT = 500;
    const BAR_PADDING = 1;

    // create svg element
    const canvas = d3.select("#container")
        .append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT)

    const processData = (dataset) => {

        const xScale = d3.scaleLinear()
            .domain([0, dataset.length])
            .range([0, WIDTH]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, (d) => d[1])])
            .range([HEIGHT, 0]);

        const bottomAxis = d3.axisBottom()
            .ticks(10)
            .scale(xScale);

        canvas.append("g")
            .attr("transform", "translate(0, " + HEIGHT + ")")
            .call(bottomAxis)

        const leftAxis = d3.axisLeft()
            .ticks(10)
            .scale(yScale);

        canvas.append("g")
            .call(leftAxis);

        canvas.selectAll("rect")
            .data(dataset)
            .enter()
            // create a new bar for every data point
            .append("rect")
            .attr("class", "bar")
            .style("width", (WIDTH / dataset.length) - BAR_PADDING)
            .style("height", (d) => HEIGHT - yScale(d[1]))
            .attr("x", (d, i) => i * (WIDTH / dataset.length))
            .attr("y", (d) => yScale(d[1]))



    }

    // get example data set from freeCodeCamp
    $.getJSON("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", (json) => processData(json.data))
});