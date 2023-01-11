import mongoose from "mongoose";
import Pokemon from "../models/Pokemon.js";
import User from "../models/User.js";

export const getAllPokemons = async (req, res, next) => {
  let pokemons;
  try {
    pokemons = await Pokemon.find().populate("user");
  } catch (error) {
    return console.log(error);
  }
  if (!pokemons) {
    return res.status(404).json({ message: "No Pokemons Found" });
  }
  return res.status(200).json({ pokemons });
};

export const addPokemon = async (req, res, next) => {
  const { title, type, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    return console.log(error);
  }
  if (!existingUser) {
    return res
      .status(400)
      .json({ message: "Unable to find user with this ID" });
  }

  const newPokemon = new Pokemon({
    title,
    type,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newPokemon.save({ session });
    existingUser.pokemons.push(newPokemon);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
  return res.status(201).json({ newPokemon });
};

export const getByID = async (req, res, next) => {
  const pokemonId = req.params.id;
  let pokemon;
  try {
    pokemon = await Pokemon.findById(pokemonId);
  } catch (error) {
    return console.log(error);
  }
  if (!pokemon) {
    return res.status(404).json({ message: "Pokemon not found" });
  }
  return res.status(200).json({ pokemon });
};

export const deletePokemon = async (req, res, next) => {
  const pokemonId = req.params.id;
  let pokemon;
  try {
    pokemon = await Pokemon.findByIdAndRemove(pokemonId).populate("user");
    await pokemon.user.pokemons.pull(pokemon);
    await pokemon.user.save();
  } catch (error) {
    return console.log(error);
  }
  if (!pokemon) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Pokemon Deleted Successfuly" });
};

export const getByUserId = async (req, res, next) => {
  const userId = req.params.id;
  let userPokemons;
  try {
    userPokemons = await User.findById(userId).populate("pokemons");
  } catch (error) {
    return console.log(error);
  }
  if (!userPokemons) {
    return res.status(404).json({ message: "No pokemons Found" });
  }
  return res.status(200).json({ user: userPokemons });
};
