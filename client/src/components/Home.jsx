import React from "react";
import useListings from "../utils/useListings";
import { useRecoilValue } from "recoil";
import { listingState } from "../store/listingState";
import useLogout from "../utils/useLogout";

function Home(){
    useListings()
    const listingsObject = useRecoilValue(listingState);
    const logout = useLogout()

    if(listingsObject.isLoading){
        return <div>
            loading...
        </div>
    }
    const listings = listingsObject.listings
    console.log(listings[1])
    return <div>
        <button onClick={logout}>LOG OUT</button>
                <ul>
                {listings.map((listing, index) => (
                    <li key={index}>
                        <h3>{listing.name}</h3>
                        <p>{listing.description}</p>
                        <p>{listing._id}</p>
                        <p>
                            <strong>Seller College:</strong>{" "}
                            {listing.sellerId?.college || "N/A"}
                        </p>
                        <p>
                            <strong>Seller Name:</strong>{" "}
                            {listing.sellerId?.fname || "N/A"}
                        </p>
                        <p>{listing.category}</p>
                        <p>Negotiable?: {listing.negotiable ? "Yes" : "No"}</p>
                        <p>
                            <strong>Price:</strong> ${listing.price}
                        </p>
                        <button>Buy</button>
                    </li>
                ))}
            </ul>
    </div>
}

export default Home;