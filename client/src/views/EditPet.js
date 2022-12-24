import { useState,useEffect } from "react"
import {useParams,useNavigate} from "react-router-dom"
import axios from "axios"
import Banner from "../components/Navbar"
import PetForm from "../components/Form"

const EditPet = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [pet,setPet] = useState({})
    const [errors,setErrors] = useState({})
    const [loaded,setLoaded] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pets/${id}`)
            .then(res => setPet(res.data))
            .then(() => setLoaded(true))
            .catch(err => console.log(err))
    },[])

    const updatePet = updatedPet => {
        axios.put(`http://localhost:8000/api/pets/${id}`, updatedPet)
            .then(() => navigate('/'))
            .catch(err => setErrors(err.response.data.errors))
    }

    return (
        <div>
            <Banner path={"/"} title={"Back to Home"}/><br/>
            { loaded &&
                <div className="container border"><br/>
                  <h2>Edit {pet.name}</h2>
                  <PetForm className="form-control"
                      submitProp={updatePet}
                      initName={pet.name}
                      initType={pet.petType}
                      initDesc={pet.description}
                      initTricks={pet.tricks}
                      initLikes={pet.likes}
                      errors={errors}
                      icon={<i class="bi bi-pencil-square"></i>}
                      btn={"Edit Pet"}
                  /><br/>
                </div>
            }
        </div>
    )
}

export default EditPet
