import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();

  return (
    <div className= "flex flex-col w-64 bg-gray-800 text-white p-6 shadow-lg rounded-r-lg space-y-6">      
      <ul className="space-y-4">
        <li>
          <button 
            onClick={() => navigate('/home')} 
            className="w-full text-left text-lg font-medium hover:bg-indigo-600 py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
            Home
          </button>
        </li>
        <li>
          <button 
            onClick={() => navigate('/inbox')} 
            className="w-full text-left text-lg font-medium hover:bg-indigo-600 py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
            Inbox
          </button>
        </li>
        <li>
          <button 
            onClick={() => navigate('/profile')} 
            className="w-full text-left text-lg font-medium hover:bg-indigo-600 py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
            Profile
          </button>
        </li>
        <li>
          <button 
            onClick={() => navigate('/settings')} 
            className="w-full text-left text-lg font-medium hover:bg-indigo-600 py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105">
            Settings
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
