import React from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../App";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function Signup() {
  const navigate = useNavigate();
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [contact, setContact] = React.useState("");
  const [college, setCollege] = React.useState("");

  function handleFname(event) {
    return setFname(event.target.value);
  }
  function handleLname(event) {
    return setLname(event.target.value);
  }
  function handleEmail(event) {
     return setEmail(event.target.value)
  }
  function handlePassword(event) {
    return setPassword(event.target.value);
  }
  function handleContact(event) {
    return setContact(event.target.value);
  }
  function handleCollege(event) {
    return setCollege(event.target.value);
  }

  async function submitSignup(event) {
    event.preventDefault();
    const body = { fname, lname, email, contact, password , college};
    try {
      const response = await axios.post(`${base_url}/user/signup`, body);
      if (response.status === 200) {
        console.log(response.data.message);
        localStorage.setItem('verification-email' , email)
        localStorage.setItem('fname' , fname)
        navigate('/verification')
        setFname("");
        setLname("");
        setEmail("");
        setContact("");
        setPassword("");
        setCollege("")
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
    <div>
      <form action="">
        <input
          type="text"
          value={fname}
          onChange={handleFname}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lname}
          onChange={handleLname}
          placeholder="Last Name"
        />
        <input
          type="text"
          value={email}
          onChange={handleEmail}
          placeholder="Email @muj.maniapl.edu"
        />
        <input
          type="text"
          value={contact}
          onChange={handleContact}
          placeholder="Contact no."
        />
        <CollegeSelector handleCollege={handleCollege} college = {college}/>
        <input
          type="text"
          value={password}
          onChange={handlePassword}
          placeholder="Password"
        />
        <button type="submit" onClick={submitSignup}>
          Submit
        </button>
      </form>
    </div>
  );
}

function CollegeSelector(props){
    return <div>
    <FormControl fullWidth>
    <InputLabel>College</InputLabel>
    <Select
      id="college"
      value={props.college}
      label="College"
      onChange={props.handleCollege}
    >
      <MenuItem value={'Manipal University Jaipur'}>Manipal University Jaipur</MenuItem>
    </Select>
  </FormControl>
  </div>
}

export default Signup;
