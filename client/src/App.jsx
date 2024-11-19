import './App.css'
import { BrowserRouter as Router , Routes  , Route } from 'react-router-dom'
import MainLanding from './components/MainLanding';
import Signup from './components/Signup';
import Login from './components/Login';
import Verification from './components/Verification';
import Home from './components/Home';
import ShowListing from './components/ShowListing';


export const base_url = import.meta.env.VITE_BASE_URL

export default function App(){
  return <Router>
    <Routes>
      <Route path='/' element={<MainLanding/>}/>
      <Route path='/signup' element ={<Signup/>}/>
      <Route path='/login' element ={<Login/>}/>
      <Route path='/home' element ={<Home/>}/>
      <Route path='/home/:id' element ={<ShowListing/>}/>
      <Route path='/verification' element ={<Verification/>}/>
    </Routes>
  </Router>
}