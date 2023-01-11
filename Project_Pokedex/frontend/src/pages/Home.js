import "../Styles/Home.css";
import Header from "../components/Header";
import Card from "../components/Card";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Home = () => {
  const [allPokemons, setAllPokemons] = useState([]);
  const [loadMore, setLoadMore] = useState(
    "https://pokeapi.co/api/v2/pokemon?limit=50"
  );
  const [filter, setFilter] = useState("");
  const getAllPokemons = async () => {
    const res = await fetch(loadMore);
    const data = await res.json();

    setLoadMore(data.next);

    function createPokemonObject(results) {
      results.forEach(async (pokemon) => {
        const res = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        const data = await res.json();
        setAllPokemons((currentList) => [...currentList, data]);
        // await allPokemons.sort((a, b) => a.id - b.id);
      });
    }
    createPokemonObject(data.results);
  };

  useEffect(() => {
    getAllPokemons();
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <>
      {/* {allPokemons.length === 0 && (
        <div class="loader-container">
          <div class="loader-circle"></div>
          <div class="loader-circle"></div>
          <div class="loader-circle"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
        </div>
      )} */}
      {allPokemons.length !== 0 && allPokemons && (
        <div>
          <Header />
          <div className="main">
            <div className="title">
              <h1>React Pokédex</h1>
            </div>
            <div className="search">
              <input
                onChange={handleSearchChange}
                type="text"
                id="searchbar"
                placeHolder="Search for a pokemon..."
              ></input>
              <Link to={`/${Math.floor(Math.random() * 500) + 1}`}>
                <button className="searchBtn">Random Pokémon</button>
              </Link>
            </div>
            <div className="body">
              {allPokemons.map(
                (pokemon, index) =>
                  pokemon.name.includes(filter) && (
                    <Link to={`/${pokemon.id}`}>
                      <Card
                        id={pokemon.id}
                        name={pokemon.name}
                        image={pokemon.sprites.other.dream_world.front_default}
                        type={pokemon.types[0].type.name}
                        key={index}
                      />
                    </Link>
                  )
              )}
            </div>
            <button className="load-more" onClick={() => getAllPokemons()}>
              Load more
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
