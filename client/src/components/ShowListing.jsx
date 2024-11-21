import { useParams } from "react-router-dom"
import React from "react"
import axios from "axios"
import { base_url } from "../App"

function ShowListing(){
    const params = useParams()
    const token = localStorage.getItem('unikart-auth')
    const [listing , setListing] = React.useState({})
    const [loading , setLoading] = React.useState(true)

    const config = {
        headers : {
            Authorization : 'Bearer' + token
        }
    }

    React.useEffect(()=>{
        async function getListing(){
            try{
                const response = await axios.get(`${base_url}/user/listings/${params.id}` , config )
                if(response.status===200){
                    setListing(response.data.listing)
                    console.log(response.data.listing)
                }
                if(response.status===404){
                    alert('listing not found')
                }
            }catch(error){
                console.error(error)
            }
        }
        try{
            getListing()
        }catch(error){
            console.error(error)
        }finally{
            setLoading(false)
        }

    },[loading])

    if(loading){
        return <div>
            Loading...
        </div>
    }

    return <div>
        <img src="" alt="image" />
        <p>{listing._id}</p>
        <p>{listing.name}</p>
        <p>{listing.description}</p>
        <p>{listing.price}</p>
        <p>{listing.category}</p>
        <button>Contact</button>
        <button>Send a message</button>
    </div>
}

export default ShowListing