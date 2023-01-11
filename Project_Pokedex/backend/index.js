import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from "./routes/user-routes.js";
import pokemonRouter from "./routes/pokemon-routes.js";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/pokemon", pokemonRouter);

const connection_url =
  "mongodb+srv://yahya:johncena3534@cluster0.hqhvdxp.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(connection_url)
  .then(() => console.log("successfully connected to database"))
  .catch((err) => console.log(err));

//listener
app.listen(port, () => console.log(`listening on localhost: ${port}`));
