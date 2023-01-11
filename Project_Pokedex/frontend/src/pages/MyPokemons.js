import * as React from "react";
import Header from "../components/Header";
import "../Styles/MyPokemons.css";
import { Link, useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";

import axios from "../axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: 10,
};

const MyPokemons = () => {
  const id = localStorage.getItem("userId");
  console.log(id);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState();

  const [user, setUser] = useState();
  const [pokemon, setPokemon] = useState([]);
  const [title, setTitle] = useState();
  const [type, setType] = useState();
  const [image, setImage] = useState();

  const navigate = useNavigate();

  let titleHandler = (e) => {
    setTitle(e.target.value);
    console.log(title);
  };
  let typeHandler = (e) => {
    setType(e.target.value);
    console.log(type);
  };
  let imageHandler = (e) => {
    setImage(e.target.value);
    console.log(image);
  };

  async function addNewPokemon() {
    const res = await axios.post("/pokemon/add", {
      title: title,
      type: type,
      image: image,
      user: localStorage.getItem("userId"),
    });
    const data = res.data;
    console.log(data);
    return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewPokemon()
      .then(() => handleClose())
      .then(() => navigate("/mypokemons"));
  };

  useEffect(() => {
    const getPokemons = async () => {
      const res = await axios
        .get(`/pokemon/user/63b2d084a421fd3622493bc1`)
        .catch((err) => console.log(err));
      console.log("res === ", res);
      const data = await res.data.user.pokemons;
      setPokemon(data);
      // return data;
      console.log(data);
    };
    getPokemons();
  }, []);

  return (
    <div>
      <Header />
      <div className="mp-main">
        <div className="mp-title">
          <h1>My Pokémons</h1>
        </div>

        <div className="pokemons-body">
          {pokemon.map((pok, index) => (
            <UserCard
              id={pok._id}
              key={index}
              isUser={true}
              title={pok.title}
              type={pok.type}
              image={pok.image}
            />
          ))}
        </div>
        <div className="btn-container">
          <Link to={""}>
            <button className="add-btn" onClick={handleOpen}>
              +
            </button>
          </Link>

          {/* <a href="#" class="float">
            +
          </a> */}
        </div>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <div className="form-body">
              <h1>Add a pokemon</h1>
              <p>Enter Name</p>
              <input
                type="text"
                id="input-form"
                onChange={titleHandler}
                placeHolder="Name..."
              ></input>
              <p>Select Type</p>
              {/* <div className="type-container">
                <button className="Ghost-btn">Ghost</button>
                <button className="Electric-btn">Electric</button>
                <button className="Poison-btn">Poison</button>
                <button className="Fairy-btn">Fairy</button>
              </div> */}
              <input
                type="text"
                id="input-form"
                onChange={typeHandler}
                placeHolder="Type..."
              ></input>
              <p>Provide Image</p>
              <input
                type="text"
                id="input-form"
                placeHolder="Enter image URL..."
                onChange={imageHandler}
              ></input>

              <button onClick={handleSubmit} className="submitBtn">
                Submit
              </button>
            </div>
          </Box>
        </Modal>

        <div className="mp-body"></div>
      </div>
    </div>
  );
};

export default MyPokemons;
