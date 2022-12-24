import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Banner from "../components/Navbar"
import PetForm from "../components/Form"

const NewPet = () => {
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const addPet = newPet => {
        axios.post("http://localhost:8000/api/pets", newPet)
            .then(() => navigate("/"))
            .catch(err => setErrors(err.response.data.errors))
    }

    return (
        <div>
            <Banner path={"/"} title={"Back to Home"} /><br />
            <div className="container border"><br />
                <h2>Know a pet needing a home?</h2>
                <PetForm
                    submitProp={addPet}
                    initName={""}
                    initType={""}
                    initDesc={""}
                    initTricks={["", "", ""]}
                    initLikes={0}
                    errors={errors}
                    icon={<i class="bi bi-upload"> </i>}
                    btn={"Add Pet"}
                />
                <br />
            </div>
        </div>
    )
}

export default NewPet