import axios from "axios";
import React from "react";
import { base_url } from "../App";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleEmail(event) {
    return setEmail(event.target.value);
  }
  function handlePassword(event) {
    return setPassword(event.target.value);
  }

  async function submitLogin(event) {
    event.preventDefault();
    const body = { email, password };
    try {
      const response = await axios.post(`${base_url}/user/login`, body);
      if (response.status === 200) {
        localStorage.setItem("unikart-auth", `${response.data.token}`);
        navigate("/home");
      } else if (response.status === 411) {
        alert("Wrong credentials");
      } else if (response.status === 403) {
        alert("You are not verified");
      } else if (response.status === 404) {
        alert("User not found");
      }
    } catch (error) {
      console.error(error);
      return alert("Some error occurred");
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-[#3B1E54] text-center mb-8">
            Welcome back
          </h2>
          <form onSubmit={submitLogin} className="space-y-6">
            <div>
              <input
                type="text"
                value={email}
                onChange={handleEmail}
                placeholder="Email address"
                className="w-full px-4 py-3 rounded-lg bg-white border border-[#D4BEE4] focus:outline-none focus:border-[#FF9D23] focus:ring-1 focus:ring-[#FF9D23] transition-all duration-200"
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={handlePassword}
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg bg-white border border-[#D4BEE4] focus:outline-none focus:border-[#FF9D23] focus:ring-1 focus:ring-[#FF9D23] transition-all duration-200"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF9D23] text-white py-3 rounded-lg hover:bg-[#F93827] transition-colors duration-200 font-medium"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
