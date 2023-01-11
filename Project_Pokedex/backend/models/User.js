import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  pokemons: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Pokemon",
      required: true,
    },
  ],
});

export default mongoose.model("User", userSchema);
