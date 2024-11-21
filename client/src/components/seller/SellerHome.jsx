import axios from "axios";
import React from "react"
import { redirect, useNavigate } from "react-router-dom"
import { base_url } from "../../App";


function SellerHome(){
    const navigate = useNavigate();
    const [listings , setListings] = React.useState({})
    const [loading , setLoading ]= React.useState(true)
    const [error , setError] = React.useState('')

    React.useEffect(()=>{
        async function getUserListings(){
            const token = localStorage.getItem('unikart-auth')
            const config = {
                headers:{
                    Authorization : `Bearer ${token}`
                }
            }
            try{
                if(!token) return setError('PLEASE LOGIN AGAIN')
                const response =  await axios.get(`${base_url}/seller/listings` , config)
                if(response.status===200){
                    setListings(response.data)
                    setLoading(false)
                }if(response.status===404){
                    setError('No listings found , create One now!')
                }
            }catch(error){
                console.error(error)
            }
        }
        getUserListings();
    },[])

    if(error){
        return <div>
            <p>{error}</p>
        </div>
    }
    if(loading){
        return <div>
            Loading...
        </div>
    }

    else{
        return <div>
        {listings.length > 0 ? (
          listings.map((listing) => (
            <div key={listing._id}>
              <h3>{listing.title}</h3>
              <p>{listing.description}</p>
              <button onClick={()=>{navigate(`/seller/update-listing/${listing._id}`)}}>Edit Listing</button>
            </div>
          ))
        ) : (
          <p>No listings available.</p>
        )}
        <button onClick={()=>{navigate('/seller/create-listing')}}>Create new listing</button>
    </div>
    }
    
}

export default SellerHome