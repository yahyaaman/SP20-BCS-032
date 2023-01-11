import * as React from "react";
import { Routes, Route, useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import axios from "axios";
import Biography from "../components/Biography";
import Evolutions from "../components/Evolutions";
import Stats from "../components/Stats";
import "../Styles/Details.css";
import img from "../components/464.png";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Details = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState([]);
  let type = null;
  // const { name, id, species, height, weight, types, sprites } = pokemon;

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
    type = pokemon.types[0].type.name;
  }
  // console.log("type =", type);
  const style = `left ${type}`;
  const circleStyle = `${type}cardcircle`;

  // useEffect(() => {
  //   axios
  //     .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
  //     .then(function (response) {
  //       const { data } = response;
  //       // const { type } = types[0].type.name;
  //       setPokemon(data);
  //     })
  //     .catch(function (error) {
  //       setPokemon(false);
  //     });
  // }, [pokemonId]);

  // console.log(type);

  return (
    <>
      {pokemon.length === 0 && (
        <div class="loader-container">
          <div class="loader-circle"></div>
          <div class="loader-circle"></div>
          <div class="loader-circle"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
          <div class="shadow"></div>
        </div>
      )}
      {pokemon.length !== 0 && pokemon && (
        <div className="detailsContainer">
          <div className="btn-container">
            <Link className="back-btn" to={`/`}>
              Go back
            </Link>
          </div>

          <div className="detailsCard">
            <div className={style}>
              <div className="charId">
                <p className="idText">#{pokemonId}</p>
              </div>
              <div className="charName">
                <h1 className="nameText">{pokemon.name}</h1>
              </div>
              <div className="imgContainer">
                <h1 className="japannese">シザリガー</h1>
                <div className="characterImg">
                  <div className={circleStyle}>
                    <img
                      className="img"
                      src={
                        pokemon.length == 0
                          ? "https://www.freeiconspng.com/thumbs/pokeball-png/file-pokeball-png-0.png"
                          : pokemon.sprites.other.dream_world.front_default
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                    variant="fullWidth"
                    TabIndicatorProps={{
                      sx: { backgroundColor: "red" },
                    }}
                    sx={{
                      "& button: focus": { fontColor: "black" },
                    }}
                  >
                    <Tab label="Biography" {...a11yProps(0)} />
                    <Tab label="Stats" {...a11yProps(1)} />
                    <Tab label="Evolution" {...a11yProps(2)} />
                  </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                  <Biography />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Stats />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <Evolutions />
                </TabPanel>
              </Box>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default Details;
