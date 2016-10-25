const $ = require('jquery');
const d3 = require('d3');

$(document).ready(() => {

    // define constants
    const WIDTH = 1000;
    const HEIGHT = 400;
    const BAR_PADDING = 1;

    // create svg element
    const canvas = d3.select("body")
        .append("svg")
        .attr("width", WIDTH)
        .attr("height", HEIGHT);

    const processData = (dataset) => {

        const xScale = d3.scaleLinear()
            .domain([0, dataset.length])
            .range([0, WIDTH]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, (d) => d[1])])
            .range([0, HEIGHT]);

        canvas.selectAll("rect")
            .data(dataset)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .style("width", (WIDTH / dataset.length) - BAR_PADDING)
            .style("height", (d) => yScale(d[1]))
            .attr("x", (d, i) => i * (WIDTH / dataset.length))
            .attr("y", (d) => HEIGHT - yScale(d[1]))
    }

    // get example data set from freeCodeCamp
    $.getJSON("https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json", (json) => processData(json.data))
});