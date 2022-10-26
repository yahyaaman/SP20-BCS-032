import mongoose from "mongoose";

const skillSchema = mongoose.Schema({
    name: String
})

export default mongoose.model("skill", skillSchema)