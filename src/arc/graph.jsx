import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const ArcGraph = ({ graphData }) => {
  useEffect(() => {
    if (Object.keys(graphData).length) {
      console.log(graphData);
      drawGraph(graphData);
    }
  }, [graphData]);

  return <div id='my_dataviz'></div>;
};

const drawGraph = graphData => {
  const data = graphData;
  data.nodes.sort((a, b) => a.depth - b.depth);
  data.links.reverse();

  const color = d3.scaleOrdinal(d3.schemeCategory10);
  const colorDomain = color.domain(data.nodes.map(node => node.depth));

  // set the dimensions and margins of the graph
  const margin = { top: 20, right: 30, bottom: 20, left: 200 },
    // width = 10000 - margin.left - margin.right,
    // height = 30000 - margin.top - margin.bottom;
    width = 1500 - margin.left - margin.right,
    height = 25 * data.nodes.length - margin.top - margin.bottom;

  // append the svg object to the body of the page
  const svg = d3
    .select('#my_dataviz')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

  // Read dummy data

  // List of node names
  const allNodes = graphData.nodes.map(node => node.id);

  // A linear scale to position the nodes on the X axis
  //   const x = d3
  //     .scalePoint()
  //     .range([0, width])
  //     .domain(allNodes);

  const y = d3
    .scalePoint()
    .range([0, height])
    .domain(allNodes);

  // Add the circle for the nodes
  const nodes = svg
    .selectAll('mynodes')
    .data(data.nodes)
    .enter()
    .append('circle')
    .attr('cx', 50)
    .attr('cy', function(d) {
      return y(d.id);
    })
    .attr('r', 8)
    .style('fill', d => colorDomain(d.depth));

  // And give them a label
  const idLabels = svg
    .selectAll('mylabels')
    .data(data.nodes)
    .enter()
    .append('text')
    .attr('x', -80)
    .attr('y', function(d) {
      return y(d.id);
    })
    .text(function(d) {
      return d.id;
    })
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'middle');

  const depthLabels = svg
    .selectAll('mylabels')
    .data(data.nodes)
    .enter()
    .append('text')
    .attr('x', 20)
    .attr('y', function(d) {
      return y(d.id);
    })
    .text(function(d) {
      return d.depth;
    })
    .style('text-anchor', 'middle')
    .style('alignment-baseline', 'middle');

  // Add links between nodes. Here is the tricky part.
  // In my input data, links are provided between nodes -id-, NOT between node names.
  // So I have to do a link between this id and the name

  // Cool, now if I do idToNode["2"].name I've got the name of the node with id 2

  // Add the links
  const links = svg
    .selectAll('mylinks')
    .data(data.links)
    .enter()
    .append('path')
    .attr('d', arc)
    .style('fill', 'none')
    .attr('stroke', 'black');

  function arc(d) {
    const y1 = y(d.source);
    const y2 = y(d.target);
    const r = Math.abs(y2 - y1) / 2;
    return `M${58},${y1}A${r},${r} 0,0,${y1 < y2 ? 1 : 0} ${58},${y2}`;
  }

  nodes
    .on('mouseover', function(d) {
      // Highlight the nodes: every node is green except of him
      nodes.style('fill', '#B8B8B8');
      d3.select(this).style('fill', '#69b3b2');
      // Highlight the connections
      links
        .style('stroke', function(link_d) {
          return link_d.source === d.id || link_d.target === d.id
            ? '#69b3b2'
            : '#b8b8b8';
        })
        .style('stroke-width', function(link_d) {
          return link_d.source === d.id || link_d.target === d.id ? 4 : 1;
        });
    })
    .on('mouseout', function(d) {
      nodes.style('fill', d => colorDomain(d.depth));
      links.style('stroke', 'black').style('stroke-width', '1');
    });
};
