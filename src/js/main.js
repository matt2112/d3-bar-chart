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

    // function to be called when json data is ready to be processed
    const processData = (dataset) => {

        const minDate = new Date(dataset[0][0]);
        const maxDate = new Date(dataset[dataset.length - 1][0]);

        const xScale = d3.scaleTime()
            .domain([minDate, maxDate])
            .range([0, WIDTH]);

        const yScale = d3.scaleLinear()
            .domain([0, d3.max(dataset, (d) => d[1])])
            .range([HEIGHT, 0]);

        // create x axis
        const bottomAxis = d3.axisBottom()
            .ticks(10)
            .scale(xScale);

        canvas.append("g")
            .attr("transform", "translate(0, " + HEIGHT + ")")
            .call(bottomAxis)

        // label x axis
        canvas.append("text")
            .attr("x", WIDTH / 2)
            .attr("y", HEIGHT + 50)
            .text("Year");

        // create y axis
        const leftAxis = d3.axisLeft()
            .ticks(10)
            .scale(yScale);

        canvas.append("g")
            .call(leftAxis);

        // label y axis
        canvas.append("text")
            .attr("text-anchor", "end")
            .attr("y", 20)
            .attr("transform", "rotate(-90)")
            .text("Billions of Dollars");

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