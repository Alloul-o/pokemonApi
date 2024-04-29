import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Pokemon({ url }) {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    fetchPokemonData();
  }, [url]);

  const fetchPokemonData =  () => {
    try {
      // const response =  axios.get(url);
      // setPokemonData(response.data);
      // console.log('hhhh'+response.data)
      axios.get(url)
        .then(response => {
          setPokemonData(response.data);
        })
    } catch (error) {
      console.error('Error fetching  data:', error);
    }
  };

  return (
    <div>
      {pokemonData && (
        <div>
          <h2>{pokemonData.name}</h2>
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
        </div>
      )}
    </div>
  );
}

export default Pokemon;
