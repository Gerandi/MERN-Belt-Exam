import axios from "axios"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import { ShelterContext } from "../App"

const DeleteButton = ({ id, name }) => {
  const [petList, setPetList] = useContext(ShelterContext)
  const navigate = useNavigate()

  const removeFromDom = petId => {
    axios.delete(`http://localhost:8000/api/pets/${petId}`)
      .then(() => setPetList(petList.filter(pet => pet._id !== petId)))
      .then(() => navigate('/'))
      .catch(err => console.log(err))
  }
  return (
    <button className="btn btn-danger" onClick={e => removeFromDom(id)}>Adopt {name}</button>
  )
}

export default DeleteButton
