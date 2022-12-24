const mongoose = require("mongoose")

const PetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Enter a name"],
        minLength: [3, "The name of the pet must be at least 3 characters"],
        maxLength: [60, "The pets name can not me more than 60 characters"]
    },
    petType: {
        type: String,
        required: [true, "Please enter the type of Pet"],
        minLength: [3, "The type must be at least 3 characters"],
        maxLength: [55, "The type can't me more than 60 characters"]
    },
    description: {
        type: String,
        required: [true, "Description of the Pet is required"],
        minLength: [3, "Description must be at least 3 characters"],
        maxLength: [255, "Description can not me more than 255 characters"]
    },
    tricks: {
        type: [String]
    },
    likes: {
        type: Number
    }
}, {timestamps:true})

module.exports = mongoose.model("Pet", PetSchema)