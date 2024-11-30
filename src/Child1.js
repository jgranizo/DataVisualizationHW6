import React, { Component } from "react";
import * as d3 from "d3";

class Child1 extends Component {
  state = {};

  //create x axis with dates

  componentDidMount() {
    this.renderChart();
  }
  componentDidUpdate() {
    this.renderChart();
  }

  renderChart() {
    const keys = ["Gpt4", "Gemini", "PaLM2", "Claude", "LLaMA31"];

    var Tooltip = d3
      .select("#div_template")
      .append("div")
      .style("opacity", 100)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "2px")
      .style("border-radius", "5px")
      .style("padding", "5px")
      .style("position","absolute")
      .style("visibility","visible");

      var mouseover = function (event, d) {
        // Get the hovered color and area name
        const hoveredColor = d3.select(this).attr("fill");
        const areaName = colorScale
          .domain()
          .find((key) => colorScale(key) === hoveredColor);
      
        console.log("Hovered Color:", hoveredColor);
        console.log("Area Name:", areaName);
      
        // Update Tooltip text
        Tooltip.style("opacity", 1) // Make the tooltip visible
          .style("left", event.pageX + 10 + "px") // Position tooltip near mouse
          .style("top", event.pageY + 10 + "px");
      
        // Select or create the SVG inside the tooltip
        const tooltipSvg = Tooltip
          .selectAll("svg")
          .data([null]) // Single datum to ensure one SVG is created
          .join("svg")
          .attr("width", 250) // Adjust width for mini chart
          .attr("height", 80) // Adjust height for mini chart
          .style("margin-top", "10px"); // Add spacing
      
      // Define margins and inner dimensions for tooltip chart
const margin = { top: 10, right: 10, bottom: 20, left: 30 };
const width = 200 - margin.left - margin.right;
const height = 80 - margin.top - margin.bottom;

// Update scales to respect margins
const xScaleBand = d3
  .scaleBand()
  .domain(data.map((d) => d.Date))
  .range([0, width])
  .padding(0.1);

const yScalemini = d3
  .scaleLinear()
  .domain([0, d3.max(data, (d) => d[areaName])])
  .range([height, 0]);

// Adjust `tooltipSvg` for margins
const chartGroup2 = tooltipSvg
  .selectAll("g")
  .data([null])
  .join("g")
  .attr("transform", `translate(${margin.left},${margin.top})`);

// Bind data to `rect` elements
chartGroup2
  .selectAll("rect")
  .data(data)
  .join("rect")
  .attr("x", (d) => xScaleBand(d.Date))
  .attr("y", (d) => yScalemini(d[areaName]))
  .attr("width", xScaleBand.bandwidth())
  .attr("height", (d) => height - yScalemini(d[areaName]))
  .attr("fill", hoveredColor); // Match color of hovered area

// Add x-axis
chartGroup2
  .selectAll(".x-axis2")
  .data([null])
  .join("g")
  .attr("class", "x-axis2")
  .attr("transform", `translate(0,${height})`) // Align at the bottom
  .call(d3.axisBottom(xScaleBand).tickFormat(d3.timeFormat("%b"))) // Short months
  .selectAll("text")
  .style("font-size", "8px");

// Add y-axis
chartGroup2
  .selectAll(".y-axis2")
  .data([null])
  .join("g")
  .attr("class", "y-axis2")
  .call(d3.axisLeft(yScalemini).ticks(3)) // Fewer ticks for small chart
  .selectAll("text")
  .style("font-size", "8px");


        // Bind data to `rect` elements and update attributes
        tooltipSvg
          .selectAll("rect")
          .data(data)
          .join("rect")
          .attr("x", (d) => xScaleBand(d.Date))
          .attr("y", (d) => yScalemini(d[areaName]))
          .attr("width", xScaleBand.bandwidth())
          .attr("height", (d) => 50 - yScalemini(d[areaName]))
          .attr("fill", hoveredColor); // Match the color of the hovered path
      
  
      };
      

      
    // Bind data to rec
    var mouseout = function () {
      Tooltip.style("opacity", 0); // Hide tooltip
    };
    const data = this.props.csv_data;

    console.log(data.map((d) => d["Gemini"]));
    const parseDate = d3.timeParse("%Y-%m-%d");
    data.forEach((d) => {
      d.Date = parseDate(d.Date);
    });

    console.log(data.map((item) => item));
    const margin = { top: 20, right: 60, bottom: 50, left: 80 },
      width = 600,
      height = 400,
      innerWidth = width - margin.left - margin.right,
      innerHeight = height - margin.top - margin.bottom;

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.Date))
      .range([0, innerWidth]);

    // yScale for values

    const colorScale = d3
      .scaleOrdinal()
      .domain(keys)
      .range(["#e41a1c", "#377eb8", " #4daf4a", "#984ea3", "#ff7f00"]);

    var stackedData = d3.stack().offset(d3.stackOffsetSilhouette).keys(keys)(
      data
    );
    const yMin = d3.min(stackedData.flatMap((layer) => layer.map((d) => d[0])));
    const yMax = d3.max(stackedData.flatMap((layer) => layer.map((d) => d[1])));

    const yScale = d3
      .scaleLinear()
      .domain([yMin, yMax * 1.1]) // Include negative and positive ranges
      .range([innerHeight, 0]);

    const svg = d3
      .select("#chart-container")
      .selectAll("svg")
      .data([null])
      .join("svg")
      .attr("width", width)
      .attr("height", height);
    // Create a group for the chart with margins
    const chartGroup = svg
      .selectAll("g.chart-group")
      .data([null])
      .join("g")
      .attr("class", "chart-group")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    chartGroup
      .selectAll(".Mylayers")
      .data(stackedData)
      .join("path") // Directly handle path creation and updates
      .attr("class", "Mylayers")
      .attr("fill", (d, i) => colorScale(keys[i]))
      .attr(
        "d",
        d3
          .area()
          .x((d) => xScale(d.data.Date))
          .y0((d) => yScale(d[0]))
          .y1((d) => yScale(d[1]))
          
      )
      .on("mouseover", mouseover)
      .on("mouseout", mouseout);

    // Add the x-axis
    chartGroup
  .selectAll(".x-axis")
  .data([null])
  .join("g")
  .attr("class", "x-axis")
  .attr("transform", `translate(0,${innerHeight})`) // Place at bottom of chart
  .call(
    d3.axisBottom(xScale)
      .ticks(d3.timeMonth.every(1)) // Ensure one tick per month
      .tickFormat((d, i) => {
        const formatter = d3.timeFormat("%b");
        return formatter(d); // Show short month name
      })
  )
  .selectAll("text")
  .style("font-size", "10px")
  .style("text-anchor", "middle"); // Center-align the text

// Define a consistent colorScale with keys and colors
const colorScale2 = d3.scaleOrdinal()
  .domain(keys)
  .range(["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00"]);

// Define the dimensions of the legend
const legendWidth = 200;
const legendHeight = keys.length * 20;

// Create or update the legend container
const legendSvg = d3
  .select("#legend-container")
  .selectAll("svg")
  .data([null]) // Ensure only one SVG exists
  .join("svg")
  .attr("width", legendWidth)
  .attr("height", legendHeight);

// Create or update the legend group
const legendGroup = legendSvg
  .selectAll("g.legend-item")
  .data(keys)
  .join("g")
  .attr("class", "legend-item")
  .attr("transform", (d, i) => `translate(0, ${i * 20})`);

// Add or update the color rectangles
legendGroup
  .selectAll("rect")
  .data(d => [d]) // Bind each key to one rectangle
  .join("rect")
  .attr("x", 10)
  .attr("y", 0)
  .attr("width", 15)
  .attr("height", 15)
  .attr("fill", d => colorScale2(d)); // Use the correct color for each key

// Add or update the text labels
legendGroup
  .selectAll("text")
  .data(d => [d]) // Bind each key to one text element
  .join("text")
  .attr("x", 30)
  .attr("y", 12)
  .text(d => d) // Match the key name
  .style("font-size", "12px")
  .attr("alignment-baseline", "middle");


    

  }
  render() {
    return (
      <div>
        <svg></svg>
        <div id="div_template"></div>
        <div id="chart-container" style={{ display: "inline-block" }}></div>
        <div id="legend-container" style={{ display: "inline-block", verticalAlign: "top" }}></div>
      
        <div id="chart-container"></div>
      </div>
    );
  }
}

export default Child1;
