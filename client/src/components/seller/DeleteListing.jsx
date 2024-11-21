import axios from "axios"
import React from "react"
import { base_url } from "../../App"

function DeleteListing(props){
    const id = props.id
    const token = localStorage.getItem('unikart-auth')

    const deleteListing = async ()=>{
        const config = {headers: {Authorization : `Bearer ${token}`}}

        const response = await axios.delete(`${base_url}/seller/listings/${id}` , config)
        alert(response.data.message)
    }

    return <div>
        <button onClick={deleteListing}>Delete Listing</button>
    </div>
}

export default DeleteListing