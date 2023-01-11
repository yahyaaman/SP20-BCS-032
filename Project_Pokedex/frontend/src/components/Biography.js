import "../Styles/Biography.css";
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

const Biography = () => {
  let { pokemonId } = useParams();
  let japannese = null;
  let flavor_text = null;
  let species_type = null;
  let ability_1 = null;
  let ability_2 = null;

  const [pokemon, setPokemon] = useState(
    `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
  );
  const [species, setSpecies] = useState([]);
  const [abilities, setAbilities] = useState([]);

  const { name, id, height, weight, types, base_experience } = pokemon;

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`)
      .then(function (response) {
        const { data } = response;
        setAbilities(data);
        setSpecies(data);
      })
      .catch(function (error) {
        setAbilities(false);
        setSpecies(false);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/ability/${pokemonId}`)
      .then(function (response) {
        const { data } = response;
        setAbilities(data);
      })
      .catch(function (error) {
        setAbilities(false);
      });
  }, []);

  if (abilities.length != 0) {
    flavor_text = species.flavor_text_entries[0].flavor_text;
    species_type = species.genera[7].genus;
    ability_1 = pokemon.abilities[0].ability.name;
    ability_2 = pokemon.abilities[1].ability.name;
  }
  // console.log(flavor_text);

  return (
    <div className="detailsContainer">
      <div className="detailsBody">
        <h1>Pokémon Data</h1>
        <p>{flavor_text}</p>
      </div>
      <div className="details">
        <div className="detailsLeft">
          <div className="species">
            <p>Species</p>
          </div>
          <div className="height">
            <p>Height</p>
          </div>
          <div className="weight">
            <p>Weight</p>
          </div>
          <div className="abilities">
            <p>Abilities</p>
          </div>
          <div className="gender">
            <p>Gender</p>
          </div>
        </div>
        <div className="detailsRight">
          <div className="species">
            <p>{species_type}</p>
          </div>
          <div className="height">
            <p>{height / 10} m</p>
          </div>
          <div className="weight">
            <p>{weight / 10} kg</p>
          </div>
          <div className="abilities">
            <p>1. {ability_1}</p>
            <p>2. {ability_2}</p>
            <p>3. Damp (Hidden Ability)</p>
          </div>
          <div className="gender">
            <p>male 50% female 50%</p>
          </div>
        </div>
      </div>
      <div className="detailsBody">
        <h1>Training</h1>
      </div>
      <div className="trainingData">
        <div className="detailsLeft">
          <div className="leftTraining">
            <p>Base Exp</p>
          </div>
          <div className="leftTraining">
            <p>Base Happiness</p>
          </div>
          <div className="leftTraining">
            <p>Catch Rate</p>
          </div>
          <div className="leftTraining">
            <p>Growth Rate</p>
          </div>
        </div>
        <div className="detailsRight">
          <div className="rightTraining">
            <p>{base_experience}</p>
          </div>
          <div className="rightTraining">
            <p>{species.base_happiness}</p>
          </div>
          <div className="rightTraining">
            <p>{species.capture_rate}%</p>
          </div>
          <div className="rightTraining">
            <p>Medium</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Biography;
