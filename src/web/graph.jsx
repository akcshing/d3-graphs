import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export const WebGraph = ({ graphData }) => {
  const container = useRef(null);
  useEffect(() => {
    if (Object.keys(graphData).length && container.current) {
      console.log(graphData);
      simulateGraph(graphData);
    }
  }, [graphData]);

  return <svg width={900} height={600} ref={container}></svg>;
};

const simulateGraph = graphData => {
  var svg = d3.select('svg'),
    width = +svg.attr('width'),
    height = +svg.attr('height');

  var simulation = d3
    .forceSimulation()
    .force(
      'link',
      d3.forceLink().id(function(d) {
        return d.id;
      })
    )
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2));

  simulation.nodes(graphData.nodes).on('tick', ticked);

  simulation.force('link').links(graphData.links);

  //   graphData.links.forEach(function(d) {
  //     d.source = d.source_id;
  //     d.target = d.target_id;
  //   });

  var link = svg
    .append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(graphData.links)
    .enter()
    .append('line');

  var node = svg
    .append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(graphData.nodes)
    .enter()
    .append('circle')
    .attr('r', 6)
    .attr('fill', 'red')
    .attr('stroke', 'black')
    .call(
      d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
    );

  var label = svg
    .append('g')
    .attr('class', 'labels')
    .selectAll('text')
    .data(graphData.nodes)
    .enter()
    .append('text')
    .attr('class', 'label')
    .text(function(d) {
      return d.id;
    })
    .attr('id', function(d) {
      return d.id;
    });
  // .attr('visibility', 'hidden');

  function ticked() {
    link
      .attr('x1', function(d) {
        return d.source.x;
      })
      .attr('y1', function(d) {
        return d.source.y;
      })
      .attr('x2', function(d) {
        return d.target.x;
      })
      .attr('y2', function(d) {
        return d.target.y;
      });

    node
      .attr('cx', function(d) {
        return d.x;
      })
      .attr('cy', function(d) {
        return d.y;
      });

    label
      .attr('x', function(d) {
        return d.x + 8;
      })
      .attr('y', function(d) {
        return d.y + 3;
      });
  }

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
};
