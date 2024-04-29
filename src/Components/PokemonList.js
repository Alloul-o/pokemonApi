import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './Pokemon';
import './PokemonList.css'; // Import CSS file for styling

const PokemonList = () => {
  const [pokemons, setPokemons] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(30);
  const [totalPokemons, setTotalPokemons] = useState(0);

  const fetchPokemons = async () => {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${perPage}&offset=${(currentPage - 1) * perPage}`);
    setPokemons(response.data.results);
    setTotalPokemons(response.data.count);
  };

  useEffect(() => {
    fetchPokemons();
  }, [currentPage, perPage]);

  const handleLoadMore = () => {
    setPerPage(prevperPage => prevperPage + 15);
    fetchPokemons();
  };

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(totalPokemons / perPage);
  const pagesToShow = [];
  for (let i = currentPage - 1; i <= currentPage + 1; i++) {
    if (i > 0 && i <= totalPages) {
      pagesToShow.push(i);
    }
  }

  return (
    <div className="container">
    <h1>Pokemons</h1>
    <ol className="pokemon-list">
      {pokemons.map((pokemon, index) => (
        <li key={index} className="pokemon-item">
          <Pokemon url={pokemon.url} />
        </li>
      ))}
    </ol>
    <div className="pagination">
      <button onClick={handleLoadMore} className="load-more-btn">Load More</button>
      <div className="page-buttons">
        {pagesToShow.map((page) => (
          <button key={page} onClick={() => handlePagination(page)} className={currentPage === page ? 'active' : ''}>Page {page}</button>
        ))}
      </div>
    </div>
  </div>
  );
};

export default PokemonList;
