import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLanding from './components/MainLanding';
import Signup from './components/Signup';
import Login from './components/Login';
import Verification from './components/Verification';
import Home from './components/Home';
import ShowListing from './components/ShowListing';
import SellerHome from './components/seller/SellerHome';
import CreateListing from './components/seller/CreateListing';
import UpdateListing from './components/seller/UpdateListing';
import AppBar from './components/AppBar';
import Chat from './components/Chat';
import { Inbox } from './components/Inbox';
export const base_url = import.meta.env.VITE_BASE_URL;

export default function App() {

  return (
    <div className="min-h-screen bg-white">
      <Router>
        <AppBar />
        <div className="flex pt-16">
          <div className="flex flex-col w-full max-w-7xl mx-auto p-4">
            <Routes>
              <Route path="/" element={<MainLanding />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/home/:id" element={<ShowListing />} />
              <Route path="/home/:id/chat" element={<Chat />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/inbox" element={<Inbox />} />
              <Route path="/seller/home" element={<SellerHome />} />
              <Route path="/seller/create-listing" element={<CreateListing />} />
              <Route path="/seller/update-listing/:id" element={<UpdateListing />} />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
}
