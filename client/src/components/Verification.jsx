import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { base_url } from "../App";
import { useSetRecoilState } from "recoil";
import { loginState } from "../store/loginState";

function Verification(){
    const navigate = useNavigate();
    const [otp, setOtp] = React.useState('')
    const email = localStorage.getItem('verification-email')
    const fname = localStorage.getItem('fname')
  
    const handleChange = (event) => {
      setOtp(event.target.value)
    }

    const handleSubmit= async() =>{
        const body = {
            verificationCode : otp , 
            email , fname
          }
          const response = await axios.post(`${base_url}/user/verification` , body)
          if(response.status ===200){
            localStorage.setItem('unikart-auth' , `${response.data.token}`)
            localStorage.removeItem('verification-email')
            localStorage.removeItem('fname')
            navigate('/home')
          }
          else{
            alert(response.data.message)
          }
    }
    return <div>
        <input type="text" value={otp} onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
    </div>
  }

export default Verification