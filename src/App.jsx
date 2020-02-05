import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { WebGraph } from './web/graph';
import {
  formatWebDataWithChildren,
  formatWebDataWithParents
} from './web/dataFormatter';
import { ChordGraph } from './chord/graph';
import { TreeGraph } from './node-tree/nodeTree';
import { ArcGraph } from './arc/graph';
import { RadialGraph } from './radialTree/graph';
import { formatTreeData } from './node-tree/dataFormatter';

import './App.css';

export const App = () => {
  const [graphData, setGraphData] = useState({});
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        // `http://localhost:3001?package=chalk&version=1.1.1`
        // `http://localhost:3001/api/search/?dependency=d&version=1.0.0`
        // `http://localhost:3001/api/search/?dependency=koa&version=2.11.0`
        `http://localhost:3001/api/search/?dependency=tool&version=21.0.0`
        // `http://localhost:3001/api/search/?dependency=protractor&version=*`
      );
      console.log(data);
      setFetched(true);
      // const formattedData = formatData(data);
      const formattedData = formatTreeData(data);
      // const formattedDataParents = formatDataWithParents(data.packages);
      // const formattedData = formatWebDataWithChildren(data);
      // console.log(formattedData);
      setGraphData(formattedData);
    };

    if (!fetched) {
      fetchData();
    }
  }, [fetched]);

  return (
    <div className='App'>
      <header className='App-header'></header>
      {/* <TreeGraph graphData={graphData} /> */}
      {/* <WebGraph graphData={graphData} /> */}
      {/* <ChordGraph graphData={graphData} /> */}
      {/* <ArcGraph graphData={graphData} /> */}
      <RadialGraph graphData={graphData} />
    </div>
  );
};
