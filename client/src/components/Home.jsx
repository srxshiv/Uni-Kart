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
      <div className="flex justify-center items-center h-screen bg-zinc-50">
        <div className="animate-pulse text-zinc-800">Loading...</div>
      </div>
    );
  }

  const listings = listingsObject.listings;

  return (
    <div className="bg-zinc-50 min-h-screen px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-zinc-900 mb-8">Available Listings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {listings.map((listing, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden border border-zinc-100"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">
                  {listing.name}
                </h3>
                <p className="text-zinc-600 mb-4 line-clamp-2">{listing.description}</p>
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">College</span>
                    <span className="text-zinc-900">{listing.sellerId?.college || "N/A"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Seller</span>
                    <span className="text-zinc-900">{listing.sellerId?.fname || "N/A"}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Category</span>
                    <span className="text-zinc-900">{listing.category}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-zinc-500">Negotiable</span>
                    <span className="text-zinc-900">{listing.negotiable ? "Yes" : "No"}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-zinc-900">${listing.price}</span>
                  <button
                    onClick={() => navigate(`/home/${listing._id}`)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
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