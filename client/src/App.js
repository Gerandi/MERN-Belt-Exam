import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import React, {useState,useEffect} from 'react';
import axios from "axios"
import io from "socket.io-client"
import Home from './views/Home';
import PetDetails from './views/PetDetails';
import NewPet from './views/NewPet';
import EditPet from './views/EditPet';

export const ShelterContext = React.createContext()

function App() {
  const [socket] = useState(() => io(":8000"))
  const [petList, setPetList] = useState([])

  useEffect(() => {
    axios.get("http://localhost:8000/api/pets")
      .then(res => setPetList(res.data))
      .then(()=>socket.emit("change_made_in_pet_list",petList))
      .catch(err => console.log(err))
  },[petList])

  useEffect(() => {
    socket.on("send_new_pet_list", data => setPetList(data))
    return () => socket.disconnect(true)
  },[])

  return (
    <ShelterContext.Provider 
    value={[petList,setPetList]}
    >
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route element={<Home/>} path="/" />
            <Route element={<PetDetails/>} path="/pets/:id" />
            <Route element={<NewPet/>} path="/pets/new" />
            <Route element={<EditPet/>} path="/pets/:id/edit" />
          </Routes>
        </BrowserRouter>
      </div>
    </ShelterContext.Provider>
  );
}

export default App;
