import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Banner from '../components/Navbar'
import DeleteButton from '../components/Delete'
import LikeButton from '../components/Like'

const usePetData = (id) => {
  const [pet, setPet] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/pets/${id}`)
      .then(res => setPet(res.data))
      .catch(err => console.log(err));
  }, [id]);

  return pet;
};

const PetDetails = () => {
  const { id } = useParams();
  const pet = usePetData(id);

  return (
    <div>
      <Banner path={"/"} title={"Back to Home"}/><br/>
      <div className="container-sm border"><br/>
        <header className="card-header d-flex"><br/>
            <h2 className='flex-grow-1'>Details About: {pet.name}</h2>
            <DeleteButton id={pet._id} name={pet.name} />
        </header>
        <main className="container card-body">
            <dl>
            <div className='row'>
                <dt className='col'><strong>Pet Type:</strong></dt>
                <dd className='col'>{pet.petType}</dd>
            </div>
            <div className='row'>
                <dt className='col'><strong>Description:</strong></dt>
                <dd className='col'>{pet.description}</dd>
            </div>
            <div className='row'>
            <dt className='col'><strong>Skills:</strong></dt>
                <dd className='col'>
                    {pet.tricks && 
                    pet.tricks.map((trick, i) => {
                        if (trick.length > 0) {
                        return <div key={i}>{trick}</div>;
                        }
                    })
                    }
                </dd>
            </div>
            </dl>
        </main>
        <footer className="card-footer d-flex justify-content-center"> <br/>
            <LikeButton />
        </footer><br/>
        </div>
    </div>
  );
};

export default PetDetails;
