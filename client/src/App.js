import './App.css';
import Users from './Users';
import CreateUser from './CreateUser';
import {BrowserRouter, Routes,Route} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";
import {getUser} from "./redux/userSlice";
import { useDispatch } from 'react-redux';
import UpdateUser from './UpdateUser';

function App() {
//   const dispatch = useDispatch(); 

//   useEffect(()=>{
//     const fetchData = async()=>{
//         try{
//             const response = await axios.get("http://localhost:3001"); //here the server is running on port: 3001 so based on the backend server port we write the url i.e., http://localhost:3001. If suppose the backend server is running on the port 5000 then the url should be like "http://localhost:5000"
//             dispatch(getUser(response.data))
//             console.log(response.data)

//         }catch(error){
//             console.log("error",error.message)
//         }
       
//     }
//     fetchData()

// },[])


  return (
   
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Users/>} />
        <Route path='/create' element={<CreateUser/>} />
        <Route path="/edit/:id" element={<UpdateUser/>} />
      </Routes>
      </BrowserRouter>
   
  );
}

export default App;
