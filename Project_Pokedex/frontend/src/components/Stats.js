import React from "react";
import "../Styles/Stats.css";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import axios from "axios";
import { Routes, Route, useParams, Link } from "react-router-dom";

const Stats = () => {
  let { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState([]);
  let hp = null;
  let atk = null;
  let def = null;
  let sp_atk = null;
  let sp_def = null;
  let speed = null;

  useEffect(() => {
    async function fetchData() {
      let response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      let data = await response.data;
      // const { name, id, species, height, weight, types, sprites } = pokemon;

      setPokemon(data);
    }

    fetchData();
  }, []);

  if (pokemon.length != 0) {
    hp = pokemon.stats[0].base_stat;
    atk = pokemon.stats[1].base_stat;
    def = pokemon.stats[2].base_stat;
    sp_atk = pokemon.stats[3].base_stat;
    sp_def = pokemon.stats[4].base_stat;
    speed = pokemon.stats[5].base_stat;
  }

  return (
    <div>
      <div className="stats-container">
        <h1>Base Stats</h1>

        <div className="stats-body">
          <div className="stats-name">
            <p>Hp</p>
            <p>Attack</p>
            <p>Defense</p>
            <p>Sp.Atk</p>
            <p>Sp.Def</p>
            <p>Speed</p>
          </div>
          <div className="stats-num">
            <p>{hp}</p>
            <p>{atk}</p>
            <p>{def}</p>
            <p>{sp_atk}</p>
            <p>{sp_def}</p>
            <p>{speed}</p>
          </div>
          <div className="stats-bar">
            <Stack sx={{ width: "80%", color: "#e3350d" }} spacing={2}>
              <LinearProgress
                color="inherit"
                variant="determinate"
                value={(hp / 354) * 100}
              />
            </Stack>

            <Stack sx={{ width: "80%", color: "red" }} spacing={2}>
              <LinearProgress
                color="inherit"
                variant="determinate"
                value={(atk / 305) * 100}
              />
            </Stack>

            <Stack sx={{ width: "80%", color: "red" }} spacing={2}>
              <LinearProgress
                color="inherit"
                variant="determinate"
                value={(def / 296) * 100}
              />
            </Stack>

            <Stack sx={{ width: "80%", color: "red" }} spacing={2}>
              <LinearProgress
                color="inherit"
                variant="determinate"
                value={(sp_atk / 230) * 100}
              />
            </Stack>

            <Stack sx={{ width: "80%", color: "red" }} spacing={2}>
              <LinearProgress
                color="inherit"
                variant="determinate"
                value={(sp_def / 252) * 100}
              />
            </Stack>
            <Stack sx={{ width: "80%", color: "red" }} spacing={2}>
              <LinearProgress
                color="inherit"
                variant="determinate"
                value={(speed / 188) * 100}
              />
            </Stack>
          </div>
          <div className="stats-total">
            <p>354</p>
            <p>305</p>
            <p>296</p>
            <p>230</p>
            <p>252</p>
            <p>188</p>
            <p>188</p>
          </div>
        </div>
        <p>Total {hp + atk + def + sp_atk + sp_def + speed}</p>
        <p>
          Min & Max values are calculated for level 100 Pokemon. Minimum values
          are based on 0 EVs & 0 IVs, meanwhile Maximum values are based on 252
          EVs & 31 IVs.
        </p>
      </div>
    </div>
  );
};

export default Stats;
