import React, { useState, useEffect } from "react";
import API from "../../api/axios";

const ManageTransports = () => {
  const [transports, setTransports] = useState([]);

  useEffect(() => {
    API.get("/driver/transports").then((res) => setTransports(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Manage Your Transport Services
      </h1>
      <div className="space-y-4">
        {transports.map((trans) => (
          <div
            key={trans.id}
            className="flex border p-4 rounded items-center justify-between shadow-sm"
          >
            <div>
              <h3 className="font-bold">{trans.vehicle_make}</h3>
              <p>
                {trans.vehicle_type} - {trans.capacity} Seats
              </p>
            </div>
            <p className="text-blue-600 font-semibold">
              ${trans.price_per_km} / KM
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageTransports;
