import React, { useEffect } from 'react';
import * as d3 from 'd3';

export const RadialGraph = ({ graphData }) => {
  useEffect(() => {
    if (Object.keys(graphData).length) {
      console.log(graphData);
      drawGraph(graphData);
    }
  }, [graphData]);

  return <svg id='my_dataviz'></svg>;
};

const drawGraph = graphData => {
  const data = graphData;
  const width = 975;
  const radius = width / 2;
  const tree = d3.cluster().size([2 * Math.PI, radius - 100]);
  const root = tree(
    d3.hierarchy(data)
    // .sort((a, b) => d3.ascending(a.data.name, b.data.name))
  );

  const svg = d3
    .select('svg')
    .style('max-width', '100%')
    .style('height', 'auto')
    .style('font', '10px sans-serif')
    .style('margin', '5px');

  const link = svg
    .append('g')
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-opacity', 0.4)
    .attr('stroke-width', 1.5)
    .selectAll('path')
    .data(root.links())
    .join('path')
    .attr(
      'd',
      d3
        .linkRadial()
        .angle(d => d.x)
        .radius(d => d.y)
    );

  const node = svg
    .append('g')
    .attr('stroke-linejoin', 'round')
    .attr('stroke-width', 3)
    .selectAll('g')
    .data(root.descendants().reverse())
    .join('g')
    .attr(
      'transform',
      d => `
      rotate(${(d.x * 180) / Math.PI - 90})
      translate(${d.y},0)
    `
    );

  node
    .append('circle')
    .attr('fill', d => (d.children ? '#555' : '#999'))
    .attr('r', 2.5);

  node
    .append('text')
    .attr('dy', '0.31em')
    .attr('x', d => (d.x < Math.PI === !d.children ? 6 : -6))
    .attr('text-anchor', d => (d.x < Math.PI === !d.children ? 'start' : 'end'))
    .attr('transform', d => (d.x >= Math.PI ? 'rotate(180)' : null))
    .text(d => (d.data.name ? `${d.data.name}@${d.data.version}` : d.data))
    .clone(true)
    .lower()
    .attr('stroke', 'white');

  //   yield
  svg.node();

  svg.attr('viewBox', autoBox);
};

function autoBox() {
  const { x, y, width, height } = this.getBBox();
  return [x, y, width * 1.5, height];
}
