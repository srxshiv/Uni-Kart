import React from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../App";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [college, setCollege] = React.useState("");

  function handleFname(event) { return setFname(event.target.value); }
  function handleLname(event) { return setLname(event.target.value); }
  function handleEmail(event) { return setEmail(event.target.value); }
  function handlePassword(event) { return setPassword(event.target.value); }
  function handleContact(event) { return setContact(event.target.value); }
  function handleCollege(event) { return setCollege(event.target.value); }

  async function submitSignup(event) {
    event.preventDefault();
    const body = { fname, lname, email, contact, password, college };
    try {
      const response = await axios.post(`${base_url}/user/signup`, body);
      if (response.status === 200) {
        console.log(response.data.message);
        localStorage.setItem("verification-email", email);
        localStorage.setItem("fname", fname);
        navigate("/verification");
        setFname("");
        setLname("");
        setEmail("");
        setContact("");
        setPassword("");
        setCollege("");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("User already exists. Please login or use a different email.");
      } else {
        alert(error.response?.data?.message || "Unexpected Error occurred");
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-zinc-900 text-center mb-8">
            Create Account
          </h2>
          <form onSubmit={submitSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={fname}
                onChange={handleFname}
                placeholder="First Name"
                className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
              />
              <input
                type="text"
                value={lname}
                onChange={handleLname}
                placeholder="Last Name"
                className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
              />
            </div>
            <input
              type="email"
              value={email}
              onChange={handleEmail}
              placeholder="Email @muj.manipal.edu"
              className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
            />
            <input
              type="tel"
              value={contact}
              onChange={handleContact}
              placeholder="Contact Number"
              className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
            />
            <select
              value={college}
              onChange={handleCollege}
              className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
            >
              <option value="">Select College</option>
              <option value="Manipal University Jaipur">Manipal University Jaipur</option>
            </select>
            <input
              type="password"
              value={password}
              onChange={handlePassword}
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-zinc-50 border border-zinc-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all duration-200"
            />
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;