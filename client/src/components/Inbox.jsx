import React from "react";
import axios from "axios";
import { base_url } from "../App";
import { useNavigate } from "react-router-dom";

export function Inbox() {
  const [people, setPeople] = React.useState([]);
  const [userId, setUserId] = React.useState();
  const token = localStorage.getItem("unikart-auth");
  const navigate = useNavigate();

  const config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  async function getConvos() {
    try {
      const response = await axios.get(`${base_url}/user/inbox`, config);
      setPeople(response.data.convos);
      setUserId(response.data.id);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  }

  React.useEffect(() => {
    getConvos();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-white">
      <h1 className="text-3xl font-bold text-[#FF9D23] mb-6">Inbox</h1>
      {people.length === 0 ? (
        <p className="text-gray-500 text-center">No conversations found.</p>
      ) : (
        <div className="space-y-4">
          {people.map((person, index) => (
            <button
              key={index}
              className="flex items-center p-4 rounded-lg hover:bg-[#FF9D23] transition-all duration-150 transform hover:scale-105"
              onClick={() => {
                const id = userId + person._id; 
                navigate(`/home/${id}/chat`, {
                  state: { buyerId: userId, sellerId: person._id },
                });
              }}
            >
              <div className="w-16 h-16 bg-[#FF9D23] text-white rounded-full flex items-center justify-center font-bold text-xl shadow-md">
                {person.profileImageLink ? (
                  <img
                    src={person.profileImageLink}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  person.fname[0]?.toUpperCase() || "U"
                )}
              </div>
              <div className="ml-4">
                <p className="text-lg font-semibold text-gray-800">
                  {person.fname}
                </p>
                <p className="text-sm text-gray-500">Tap to view conversation</p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
