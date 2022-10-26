import mongoose from "mongoose";

const langSchema = mongoose.Schema({
    name: String
})

export default mongoose.model("lang", langSchema)