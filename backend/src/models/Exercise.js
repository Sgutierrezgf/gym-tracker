import { Schema, model } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const exerciseSchema = new Schema({
    title: String,
    reps: Number,
    weight: Number,
    type: String
}, {
    versionKey: false,
    timestamps: true
})
exerciseSchema.plugin(mongoosePaginate)
export default model('Exercise', exerciseSchema)