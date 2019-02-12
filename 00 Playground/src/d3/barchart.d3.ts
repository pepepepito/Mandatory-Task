import { select } from "d3-selection";
import { scaleLinear, scaleTime, scaleOrdinal, scaleBand, scaleLog } from "d3-scale";
import { schemeAccent, schemeCategory10 } from "d3-scale-chromatic";
import { line } from "d3-shape";
import { malagaStats, TempStat, month, avgTemp } from "./barchart.data";
import { axisBottom, axisLeft } from "d3-axis";
import { extent } from "d3-array";
import { accessSync } from "fs";

const d3 = {
  select,
  scaleLinear,
  scaleTime,
  scaleBand,
  extent,
  line,
  axisBottom,
  axisLeft,
  scaleOrdinal,
  schemeAccent,
  schemeCategory10,
  scaleLog,
};

const width = 500;
const height = 300;
const padding = 50;
var margin = { top: 20, right: 20, bottom: 50, left: 70 }


const card = d3
  .select("#root")
  .append("div")
  .attr("class", "card");

const svg = card
  .append("svg")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("viewBox", `${-padding} ${-padding} ${width + 2 * padding} ${height + 2 * padding}`);

month.forEach(function (d) {
});

const scaleXPos = d3
  .scaleBand()
  .domain(month.map((d, i) => i)) // Range Jan to Dec 2019
  .range([0, width]) // pixels
  .paddingInner(0.05);

const scaleYPos = d3.scaleLinear()
  .domain(d3.extent(malagaStats.reduce((acc, s) => acc.concat(s.values), [])))
  .range([height, 0]);

// let's paint the line, we are going to add a single array, later
// on we will got for a more ellaborated solution
// We pass data
// path, attribute "d" each point in the path
const barGroup = svg
  .append('g');

barGroup
  .selectAll('rect')
  .data(avgTemp)
  .enter()
  .append("rect")
  .attr("x", (d, i) => scaleXPos(i))
  .attr("y", d => scaleYPos(d))
  .attr("width", scaleXPos.bandwidth())
  .attr("height", d => height - scaleYPos(d))
  .attr("fill", "url(#barGradient)");

const axisGroup = svg.append("g");

// Y Axis: call axisLeft helper and pass the scale
axisGroup
  .append("g")
  .call(d3.axisLeft(scaleYPos));

// text label for the y axis
svg.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.bottom)
  .attr("x", 0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Temperature ºC");

// X axis:
axisGroup
  .append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(scaleXPos));
// text label for the x axis
svg.append("text")
  .attr("transform",
    "translate(" + (width / 2) + " ," +
    (height + margin.top + 20) + ")")
  .style("text-anchor", "middle")
  .text("Month");


const gradient = svg
  .append("defs")
  .append("linearGradient")
  .attr("id", "barGradient")
  .attr("gradientUnits", "userSpaceOnUse")
  .attr("x1", "0")
  .attr("y1", height)
  .attr("x2", "0")
  .attr("y2", "0");
gradient
  .append("stop")
  .attr("offset", "0")
  .attr("stop-color", "#185a9d");
gradient
  .append("stop")
  .attr("offset", "70%")
  .attr("stop-color", "#e21414");
gradient
  .append("stop")
  .attr("offset", "100%")
  .attr("stop-color", "#e21414");

/*
var options = ["HOT", "COLD"];
var color = ["#185a9d", "#e21414"];

var legend = svg.selectAll(".legend")
  .data(options.slice())
  .enter().append("g")
  .attr("class", "legend")
  .attr("transform", function (d, i) { return "translate(0," + i * 20 + ")"; });

legend.append("rect")
  .attr("x", 450)
  .attr("width", 18)
  .attr("height", 18)
  .style("fill", color.values.toString);

legend.append("text")
  .attr("x", 470)
  .attr("y", 9)
  .attr("dy", ".35em")
  .style("text-anchor", "start")
  .text(function (d) { return d; });
*/
// add legend   

var color_hash = {
  0: ["HOT", "#e21414"],
  1: ["COLD", "#185a9d"]
}
var legend = svg.append("g")
  .attr("x", width - 65)
  .attr("y", 25)
  .attr("height", 100)
  .attr("width", 100);

legend.selectAll('g').data(avgTemp)
  .enter()
  .append('g')
  .each(function (d, i) {
    if(i<=1){
    var g = d3.select(this);
    g.append("rect")
      .attr("x", width - 65)
      .attr("y", i * 25)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", color_hash[String(i)][1]);

    g.append("text")
      .attr("x", width - 50)
      .attr("y", i * 25 + 8)
      .attr("height", 30)
      .attr("width", 100)
      .style("fill", color_hash[String(i)][1])
      .text(color_hash[String(i)][0]);
    }
  });