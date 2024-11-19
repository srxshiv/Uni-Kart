import React from "react";
import { loginState } from "../store/loginState";
import { useLogin } from "../utils/useLogin";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";

function MainLanding() {
    useLogin();
    const navigate = useNavigate()
    const user = useRecoilValue(loginState)
    console.log(user)

    if(user.isLoading){
        return <div>loading...</div>
    }
    if(user.fname){
        return <div>
            Hi {user.fname}
            <button onClick={()=>navigate('/home')}>Home</button>
        </div>
    }
    else {
        return <div>
            <button onClick={()=>navigate('/signup')}>signup</button>
            <button onClick={()=>navigate('/login')}>Login</button>
        </div>
    }
}


export default MainLanding;
