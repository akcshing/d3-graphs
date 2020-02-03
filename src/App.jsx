import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import './App.css';

export const App = () => {
  const [beer, setBeer] = useState({});
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    console.log('in use effect');
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.punkapi.com/v2/beers/random`
      );
      console.log(JSON.stringify(data));

      setBeer(data[0]);
      setFetched(true);
    };

    if (!fetched) {
      fetchData();
    }
  }, [fetched]);

  return (
    <div className='App'>
      <header className='App-header'>
        {Object.keys(beer).length && (
          <>
            <img
              style={{ height: '10rem' }}
              src={beer.image_url}
              alt='beer pic'
            />
            <p className='App-link'>{beer.name}</p>
            <Abv abv={beer.abv} />
          </>
        )}
      </header>
    </div>
  );
};

export const useRandomBeer = () => {
  const [beer, setBeer] = useState('');
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.punkapi.com/v2/beers/random`
      );
      console.log(JSON.stringify(data));

      setBeer(data[0]);
      setFetched(true);
    };

    if (!fetched) {
      fetchData();
    }
  }, [fetched]);

  return beer;
};

export const Abv = ({ abv }) => {
  return abv > 6 ? (
    <p className='above-6' style={{ fontSize: `${abv / 2}rem` }}>
      {abv}
    </p>
  ) : (
    <p className='below-6' style={{ fontSize: `${abv / 2}rem` }}>
      {abv}
    </p>
  );
};
