import axios from "axios";
import { loginState } from "../store/loginState";
import { base_url } from "../App";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";

export function useLogin() {
  const token = localStorage.getItem("unikart-auth");
  const setLogin = useSetRecoilState(loginState)

  useEffect(()=>{
    const checkAuth = async ()=>{
      try {
        const response = await axios.post(`${base_url}/user/auth-check`, {} ,{
          headers: {
            Authorization: `Beaerer ${token}`,
          },
        });
        if (response.status === 200) {
          setLogin({
            isLoading: false,
            fname : response.data.fname
          });
        }
      }
      catch (error){
        console.error(error)
        setLogin({
          isLoading : false ,
          fname : null
        })
      }
    }
    if(token) checkAuth() ;
    else setLogin({
      isLoading : false ,
      fname : null
    }) ;
  } , [setLogin , token])
}
