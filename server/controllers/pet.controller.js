const Pet = require("../models/pet.model")

// create a new pet
module.exports.createPet = (req,res) => {
    Pet.exists({name: req.body.name})
        .then(petExists => {
            if(petExists) return Promise.reject({errors:{name:{message:"Sorry, there already is a pet with this name"}}})
            return Pet.create(req.body)
        })
        .then(newPet => res.json(newPet))
        .catch(err => res.status(400).json(err))
}

// get all pets
module.exports.getAllPets = (req,res) => {
    Pet.find().sort({petType:1})
        .then(allPets => res.json(allPets))
        .catch(err => res.json(err))
}

// get one pet
module.exports.getPetById = (req,res) => {
    Pet.findById({_id:req.params.id})
        .then(pet => res.json(pet))
        .catch(err => res.json(err))
}

// update one pet
module.exports.updatePet = (req,res) => {
    Pet.updateOne({_id:req.params.id}, req.body, {runValidators:true})
        .then(results => res.json(results))
        .catch(err => res.status(400).json(err))
}

// delete one pet
module.exports.deletePet = (req,res) => {
    Pet.findByIdAndDelete({_id:req.params.id})
        .then(results => res.json(results))
        .catch(err => res.json(err))
}