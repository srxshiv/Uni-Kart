import React from "react";
import useListings from "../utils/useListings";
import { useRecoilValue } from "recoil";
import { listingState } from "../store/listingState";
import { useNavigate } from "react-router-dom";

function Home() {
  useListings();
  const listingsObject = useRecoilValue(listingState);
  const navigate = useNavigate();

  if (listingsObject.isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="animate-pulse text-orange-600 text-lg">Loading...</div>
      </div>
    );
  }

  const listings = listingsObject.listings;

  return (
    <div className="bg-white min-h-screen px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-orange-600 mb-8">Available Listings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 overflow-hidden border border-orange-500"
            >
              <img
                src={listing.images || "/default-image.png"}
                alt={listing.name}
                className="w-full h-96 object-scale-down"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-orange-600 mb-2">
                  {listing.name}
                </h3>
                <p className="text-gray-700 mb-4 line-clamp-2">{listing.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">College</span>
                    <span className="text-orange-600">{listing.sellerId?.college || "N/A"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Seller</span>
                    <span className="text-orange-600">{listing.sellerId?.fname || "N/A"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Category</span>
                    <span className="text-orange-600">{listing.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Negotiable</span>
                    <span className="text-orange-600">{listing.negotiable ? "Yes" : "No"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-orange-600">₹{listing.price}</span>
                  <button
                    onClick={() => navigate(`/home/${listing._id}`)}
                    className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-500 transition-colors duration-200"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
