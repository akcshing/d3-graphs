import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const ChordGraph = ({ graphData }) => {
  useEffect(() => {
    if (Object.keys(graphData).length) {
      console.log(graphData);
      drawGraph(graphData);
    }
  }, [graphData]);

  return <div id='my_dataviz'></div>;
};

const drawGraph = graphData => {
  var svg = d3
    .select('#my_dataviz')
    .append('svg')
    .attr('width', 440)
    .attr('height', 440)
    .append('g')
    .attr('transform', 'translate(220,220)');

  // create input data: a square matrix that provides flow between entities
  var matrix = [
    [11975, 5871, 8916, 2868],
    [11975, 5871, 8916, 2868],
    [11975, 5871, 8916, 2868],
    [11975, 5871, 8916, 2868]
  ];

  // give this matrix to d3.chord(): it will calculates all the info we need to draw arc and ribbon
  var res = d3
    .chord()
    .padAngle(0.05) // padding between entities (black arc)
    .sortSubgroups(d3.descending)(matrix);

  // add the groups on the inner part of the circle
  svg
    .datum(res)
    .append('g')
    .selectAll('g')
    .data(function(d) {
      return d.groups;
    })
    .enter()
    .append('g')
    .append('path')
    .style('fill', 'grey')
    .style('stroke', 'black')
    .attr(
      'd',
      d3
        .arc()
        .innerRadius(200)
        .outerRadius(210)
    );

  // Add the links between groups
  svg
    .datum(res)
    .append('g')
    .selectAll('path')
    .data(function(d) {
      return d;
    })
    .enter()
    .append('path')
    .attr('d', d3.ribbon().radius(200))
    .style('fill', '#69b3a2')
    .style('stroke', 'black');
};
