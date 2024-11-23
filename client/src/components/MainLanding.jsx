import React from "react";
import { loginState } from "../store/loginState";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

function MainLanding() {
  const navigate = useNavigate();
  const user = useRecoilValue(loginState);

  if (user.isLoading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-pulse text-zinc-800">Loading...</div>
      </div>
    );
  }

  if (user.fname) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-zinc-900 mb-4">
            Welcome back, {user.fname}
          </h1>
          <p className="text-zinc-600 mb-8">
            Your marketplace awaits. Let's get started.
          </p>
          <button
            onClick={() => navigate('/home')}
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  } else {
    navigate('/login');
    return null;
  }
}

export default MainLanding;
