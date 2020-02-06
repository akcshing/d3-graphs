import React, { useState } from 'react';
import axios from 'axios';
import { WebGraph } from './web/graph';
import {
  formatNetworkData,
  formatWebDataWithParents
} from './web/dataFormatter';
// import { ChordGraph } from './chord/graph';
import { TreeGraph } from './node-tree/nodeTree';
import { ArcGraph } from './arc/graph';
import { RadialGraph } from './radialTree/graph';
import { formatTreeData } from './node-tree/dataFormatter';
import * as d3 from 'd3';

import './App.css';
// const CHALK_PKG_URL = `http://localhost:3001?package=chalk&version=1.1.1`
const CHALK_PKG_URL = `http://localhost:3001/api/search/?dependency=chalk&version=1.1.1`;
const D_PKG_URL = `http://localhost:3001/api/search/?dependency=d&version=1.0.0`;
// const KOA_PKG_URL = `http://localhost:3001/api/search/?dependency=koa&version=2.11.0`;
const TOOL_PKG_URL = `http://localhost:3001/api/search/?dependency=tool&version=21.0.0`;
const PROTRACTOR_PKG_URL = `http://localhost:3001/api/search/?dependency=protractor&version=*`;
// const BLOATER_PKG_URL = `http://localhost:3001/api/search/?dependency=bloater&version=*`;
const RADIAL_TIDY = `radial tidy`;
const TREE = 'tree';
const WEB = 'web';
const ARC = 'arc';

export const App = () => {
  const [graphNetworkData, setGraphNetworkData] = useState({});
  const [graphArcData, setGraphArcData] = useState({});
  const [graphTreeData, setGraphTreeData] = useState({});
  const [graphType, setGraphType] = useState('');
  const [size, setSize] = useState('');
  const [fetching, setFetching] = useState(false);
  const [licenceList, setLicenceList] = useState([]);

  // useEffect(() =
  const fetchData = async url => {
    setFetching(true);
    const { data } = await axios.get(url);
    console.log(data);
    setFetching(false);
    d3.select('svg')
      .selectAll('*')
      .remove();
    d3.select('#my_dataviz')
      .selectAll('*')
      .remove();

    // const formattedData = formatData(data);
    setLicenceList(extractLicences(data));

    setGraphTreeData(formatTreeData(data));

    setGraphArcData(formatNetworkData(data));

    setGraphNetworkData(formatNetworkData(data));

    // const formattedDataParents = formatDataWithParents(data.packages);
    // const formattedArcData = formatWebDataWithChildren(data);
    // console.log(formattedData);
  };

  return (
    <div className='App'>
      <header className='App-header'></header>
      <div>
        <button
          disabled={fetching}
          onClick={() => {
            setSize('small');
            fetchData(CHALK_PKG_URL);
          }}
        >
          small
        </button>
        <button
          disabled={fetching}
          onClick={() => {
            setSize('med');
            fetchData(PROTRACTOR_PKG_URL);
          }}
        >
          med
        </button>
        <button
          disabled={fetching}
          onClick={() => {
            setSize('large');
            fetchData(TOOL_PKG_URL);
          }}
        >
          large
        </button>
        <button
          disabled={fetching}
          onClick={() => {
            setSize('cyclic');
            fetchData(D_PKG_URL);
          }}
        >
          cyclic
        </button>
      </div>
      <div>
        <button onClick={() => setGraphType(RADIAL_TIDY)}>Radial Tidy</button>
        <button onClick={() => setGraphType(TREE)}>Tree</button>
        <button onClick={() => setGraphType(WEB)}>Network</button>
        <button onClick={() => setGraphType(ARC)}>Arc</button>
        {fetching && <div>fetching</div>}
      </div>
      <div>
        {size}
        {graphType}
      </div>
      <div>
        {graphTreeData && graphType === TREE && (
          <TreeGraph graphData={graphTreeData} />
        )}
        {graphNetworkData && graphType === WEB && (
          <WebGraph graphData={graphNetworkData} />
        )}
        {/* <ChordGraph graphData={graphData} /> */}
        {graphArcData && graphType === ARC && (
          <ArcGraph graphData={graphArcData} />
        )}
        {graphTreeData && graphType === RADIAL_TIDY && (
          <RadialGraph graphData={graphTreeData} licenceList={licenceList} />
        )}
      </div>
    </div>
  );
};

const extractLicences = ({ package: pkg, dependencies }) => {
  const licences = pkg.licenseInfo.givenLicense
    ? [undefined, pkg.licenseInfo.givenLicense]
    : [undefined];
  for (const dep in dependencies) {
    if (dependencies[dep].licenseInfo) {
      if (licences.indexOf(dependencies[dep].licenseInfo.givenLicense) < 0) {
        licences.push(dependencies[dep].licenseInfo.givenLicense);
      }
    }
  }
  console.log(licences);
  return licences;
};
