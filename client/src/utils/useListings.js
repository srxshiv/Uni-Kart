import axios from "axios";
import React from "react";
import { base_url } from "../App";
import { listingState } from "../store/listingState";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";

function useListings(){
    const setListings = useSetRecoilState(listingState)
    const token = localStorage.getItem('unikart-auth')

    const navigate= useNavigate();
    const config = {
        headers : {
            Authorization : `Bearer ${token}`
        }
    }
    React.useEffect(()=>{
        if(!token) {
            alert('You are not logged in')
            navigate('/')
        }
        async function getListings(){
            try{
                const response = await axios.get(`${base_url}/user/listings` , config )
                if(response.status ===200) {
                    setListings({listings: response.data.listings , isLoading: false , totalListings:response.data.totalListings , pages : response.data.pages})
                }
            }
            catch(error){
                return error.response.data.message
            }
        }
        getListings();
    }, [])
}

export default useListings;