import React, { useState, useEffect } from "react";
import API from "../../api/axios";

const ManageAccommodations = () => {
  const [accommodations, setAccommodations] = useState([]);

  useEffect(() => {
    API.get("/host/accommodations").then((res) => setAccommodations(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Your Accommodations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {accommodations.map((acc) => (
          <div key={acc.id} className="border rounded shadow p-4">
            <img
              src={acc.image_url}
              alt={acc.name}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-xl font-semibold mt-2">{acc.name}</h3>
            <p className="text-gray-600">{acc.location}</p>
            <p className="text-green-600 font-bold">
              ${acc.price_per_night} / night
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageAccommodations;
