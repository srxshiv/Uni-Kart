import { useNavigate, useParams } from "react-router-dom";
import React from "react";
import axios from "axios";
import { base_url } from "../App";
import { useRecoilValue } from "recoil";
import { loginState } from "../store/loginState";

function ShowListing() {
  const params = useParams();
  const token = localStorage.getItem("unikart-auth");
  const [listing, setListing] = React.useState({});
  const [loading, setLoading] = React.useState(true);
  const buyer = useRecoilValue(loginState);
  console.log(buyer)
  const buyerId = buyer._id;
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  React.useEffect(() => {
    async function getListing() {
      try {
        const response = await axios.get(`${base_url}/user/listings/${params.id}`, config);
        if (response.status === 200) {
          setListing(response.data);
        }
        if (response.status === 404) {
          alert("Listing not found");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getListing();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-pulse text-orange-600 text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-orange-500">
          <img
            src={listing.images || "/default-image.png"}
            alt={listing.name}
            className="w-full h-96 object-scale-down"
          />
          <div className="p-8">
            <h1 className="text-3xl font-bold text-orange-600 mb-4">{listing.name}</h1>
            <p className="text-gray-700 text-lg mb-6">{listing.description}</p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Price</h3>
                <p className="text-2xl font-bold text-orange-600">₹{listing.price}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Category</h3>
                <p className="text-gray-800">{listing.category}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Seller College</h3>
                <p className="text-gray-800">{listing.sellerId?.college || "N/A"}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500 mb-1">Seller Name</h3>
                <p className="text-gray-800">{listing.sellerId?.fname || "N/A"}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <button className="flex-1 bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-500 transition-colors duration-200 font-medium">
                Contact Seller
              </button>
              <button
                onClick={() =>
                  navigate(`/home/${buyerId + listing.sellerId._id}/chat`, {
                    state: { buyerId, sellerId: listing.sellerId._id },
                  })
                }
                className="flex-1 bg-white text-orange-600 py-3 rounded-lg border border-orange-600 hover:bg-orange-50 transition-colors duration-200 font-medium"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowListing;
