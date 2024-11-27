import { useParams } from "react-router-dom"
import React from "react"
import axios from "axios"
import { base_url } from "../App"

function ShowListing() {
    const params = useParams()
    const token = localStorage.getItem('unikart-auth')
    const [listing, setListing] = React.useState({})
    const [loading, setLoading] = React.useState(true)

    const config = {
        headers: {
            Authorization: 'Bearer ' + token
        }
    }

    React.useEffect(() => {
        async function getListing() {
            try {
                const response = await axios.get(`${base_url}/user/listings/${params.id}`, config)
                if (response.status === 200) {
                    setListing(response.data)
                    console.log(response.data)
                }
                if (response.status === 404) {
                    alert('Listing not found')
                }
            } catch (error) {
                console.error(error)
            }
        }
        getListing()
        setLoading(false)
    }, [params.id])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-zinc-50">
                <div className="animate-pulse text-zinc-800">Loading...</div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-200 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    <img
                        src={listing.images || "/default-image.png"}
                        alt={listing.name}
                        className="w-full h-96 object-scale-down" 
                    />
                    <div className="p-8">
                        <h1 className="text-3xl font-bold text-zinc-900 mb-4">{listing.name}</h1>
                        <p className="text-zinc-600 text-lg mb-6">{listing.description}</p>
                        
                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <h3 className="text-sm text-zinc-500 mb-1">Price</h3>
                                <p className="text-2xl font-bold text-zinc-900">₹{listing.price}</p>
                            </div>
                            <div>
                                <h3 className="text-sm text-zinc-500 mb-1">Category</h3>
                                <p className="text-zinc-900">{listing.category}</p>
                            </div>
                            <div>
                                <h3 className="text-sm text-zinc-500 mb-1">Seller College</h3>
                                <p className="text-zinc-900">{listing.sellerId?.college || "N/A"}</p>
                            </div>
                            <div>
                                <h3 className="text-sm text-zinc-500 mb-1">Seller Name</h3>
                                <p className="text-zinc-900">{listing.sellerId?.fname || "N/A"}</p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium">
                                Contact Seller
                            </button>
                            <button className="flex-1 bg-white text-indigo-600 py-3 rounded-lg border border-indigo-600 hover:bg-indigo-50 transition-colors duration-200 font-medium">
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowListing