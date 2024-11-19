import axios from "axios";
import React from "react";
import { base_url } from "../App";
import { useNavigate } from "react-router-dom";

function Login(){
    const navigate = useNavigate();
    const [email , setEmail] = React.useState('')
    const [password , setPassword] = React.useState('')

    function handleEmail(event) {
        return setEmail(event.target.value)
     }
    function handlePassword(event) {
        return setPassword(event.target.value);
    }
    async function submitLogin(event){
        event.preventDefault();
        const body = {email , password}
        try{
            const response = await axios.post(`${base_url}/user/login` , body)
            if(response.status===200){
                localStorage.setItem('unikart-auth' , response.data.token)
                navigate('/home')
            }if(response.status===411){
                alert('wrong credentials')
            }if(response.status===403){
                alert('you are not verified')
            }if(response.status===404){
                alert('user not found')
            }
        }
        catch(error){
            console.error(error)
            return alert('Some error occured')
        }
    }    

    return <div>
        <form>
            <input type="text" value ={email} placeholder="Email" onChange={handleEmail}/>
            <input type="password" value = {password} placeholder="Password" onChange={handlePassword}/>
            <button type="submit" onClick={submitLogin}>Submit</button>
        </form>
    </div>

}

export default Login