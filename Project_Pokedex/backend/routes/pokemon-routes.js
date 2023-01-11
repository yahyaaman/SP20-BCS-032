import express from "express";
import {
  addPokemon,
  deletePokemon,
  getAllPokemons,
  getByID,
  getByUserId,
} from "../controllers/pokemon-controller.js";

const pokemonRouter = express.Router();

pokemonRouter.get("/", getAllPokemons);
pokemonRouter.post("/add", addPokemon);
pokemonRouter.get("/:id", getByID);
pokemonRouter.delete("/:id", deletePokemon);
pokemonRouter.get("/user/:id/", getByUserId);

export default pokemonRouter;
