import { useContext } from "react"
import { Link } from "react-router-dom"
import { ShelterContext } from "../App"
import Banner from "../components/Navbar"

const Home = () => {
    const [petList] = useContext(ShelterContext)
    return (
        <div>
            <Banner path={"/pets/new"} title={"Add a pet to the shelter"} /><br />
            <h2>These pets are looking for a good home</h2>
            <div className="container"><br />
              <table className="table table-striped border border-dark">
                <thead className="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {petList &&
                        petList.map((pet,i) => {
                            return (
                                <tr key={i} >
                                    <td >{pet.name}</td>
                                    <td >{pet.petType}</td>
                                    <td >
                                        <Link className="btn btn-secondary" to={`/pets/${pet._id}`}>Details</Link> | &nbsp;
                                        <Link className="btn btn-primary" to={`/pets/${pet._id}/edit`}>Edit</Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
              </table>
            </div>
        </div>
    )
}

export default Home
