import React from 'react';
import Tree from 'react-tree-graph';
import 'react-tree-graph/dist/style.css';

export const TreeGraph = ({ graphData }) => {
  return (
    // <div className='tree-wrapper' style={{ width: '50em', height: '20em' }}>
    <Tree data={graphData} height={800} width={1200} />
    // </div>
  );
};
