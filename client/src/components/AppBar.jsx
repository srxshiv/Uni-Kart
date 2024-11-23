import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { loginState } from "../store/loginState";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../utils/useLogin";
import useLogout from "../utils/useLogout";

function AppBar() {
  useLogin();
  const user = useRecoilValue(loginState);
  const navigate = useNavigate();
  const logout = useLogout();
  const [isSeller, setIsSeller] = useState(false);

  const toggleSellerBuyer = () => {
    setIsSeller(!isSeller);
    if (!isSeller) {
      navigate("/seller/home");
    } else {
      navigate("/home");
    }
  };

  const handleHomeClick = () => {
    if (isSeller) {
      navigate("/seller/home"); // Go to seller home if in seller mode
    } else {
      navigate("/home"); // Otherwise go to regular home
    }
  };

  return (
    <div className="fixed top-0 w-full bg-white border-b border-zinc-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            UniKart
          </div>

          <nav className="flex items-center gap-6">
            <button
              onClick={handleHomeClick} // Use the new handleHomeClick function
              className="text-zinc-600 hover:text-indigo-600 transition-colors duration-200"
            >
              Home
            </button>
            
            {!user.fname ? (
              <>
                <button
                  onClick={() => navigate("/signup")}
                  className="text-zinc-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  Sign up
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                >
                  Sign in
                </button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleSellerBuyer}
                  className="text-zinc-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  {isSeller ? "Switch to Buying" : "Switch to Selling"}
                </button>
                <button
                  onClick={logout}
                  className="text-zinc-600 hover:text-indigo-600 transition-colors duration-200"
                >
                  Sign out
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default AppBar;
