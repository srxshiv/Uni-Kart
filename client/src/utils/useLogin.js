import axios from "axios";
import { loginState } from "../store/loginState";
import { base_url } from "../App";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

export default function useLogin() {
  const token = localStorage.getItem("unikart-auth");
  const setLogin = useSetRecoilState(loginState)

  useEffect(()=>{
    console.log("USE LOGIN JUST RAN")
    const checkAuth = async ()=>{
      try {
        const response = await axios.post(`${base_url}/user/auth-check`, {} ,{
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          console.log("Use login data returned " + response.data)
          setLogin({
            isLoading: false,
            fname : response.data.fname ,
            _id : response.data._id
          });
        }
      }
      catch (error){
        console.error(error)
        setLogin({
          isLoading : false ,
          fname : null ,
          _id : null
        })
      }
    }
    if(token) checkAuth() ;
    else setLogin({
      isLoading : false ,
      fname : null ,
      _id : null
    }) ;
  } , [setLogin , token])
}
