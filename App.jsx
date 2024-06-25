import React, { useState } from 'react';
import Logo from './images/Graviti_Logo.png';
import MapComponent from './Component/MapComponent';
import './App.css';

function App() {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [stops, setStops] = useState([]);
  const [distance, setDistance] = useState(null);

  const handleOriginChange = (event) => {
    setOrigin(event.target.value);
  };

  const handleDestinationChange = (event) => {
    setDestination(event.target.value);
  };

  const handleStopChange = (index, event) => {
    const updatedStops = [...stops];
    updatedStops[index] = event.target.value;
    setStops(updatedStops);
  };

  const addStop = () => {
    setStops([...stops, '']);
  };

  const calculateDistance = async () => {
    if (!origin || !destination) {
      alert('Please fill in both Origin and Destination');
      return;
    }

    const waypoints = stops.filter((stop) => stop).join('|');
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
      origin
    )}&destination=${encodeURIComponent(
      destination
    )}&waypoints=${encodeURIComponent(waypoints)}&key=AIzaSyBuM5ExRiA0E0xu-Fg_dsM6rv5PtBRs3TA`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.status === 'OK') {
        setDistance(data.routes[0].legs[0].distance.text);
      } else {
        console.error('Google Maps API Error:', data.status);
        alert('Could not calculate distance. Please try again.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
      <section className="bg-[#F4F8FA] h-screen">
        <nav className="pl-16 py-2 bg-white">
          <img src={Logo} alt="LOGO" />
        </nav>
        <h2 className="text-[#1B31A8] text-lg text-center mt-8">
          Let's calculate <b>distance</b> from Google maps
        </h2>
        <div className="flex justify-around mt-16 px-16">
          <div className="w-[30%] py-4 ml-0">
            <h4 className="text-black font-medium">Origin</h4>
            <div className="flex items-center mt-2">
              <input
                type="text"
                className="w-60 px-2 py-2 border rounded-lg border-gray-300"
                value={origin}
                onChange={handleOriginChange}
              />
            </div>
            <div className="flex justify-center ml-80">
              <button onClick={calculateDistance} className="bg-[#1B31A8] text-white rounded-full font-medium px-6 py-3">
                Calculate
              </button>
            </div>
            <h4 className="text-black font-medium">Stops</h4>
            {stops.map((stop, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  className="w-60 px-2 py-2 border rounded-lg border-gray-300"
                  value={stop}
                  onChange={(e) => handleStopChange(index, e)}
                />
              </div>
            ))}
            <div className="flex items-center mt-1 ml-28">
              <button onClick={addStop} className="flex items-center text-black text-sm ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="14"
                  fill="currentColor"
                  className="bi bi-plus-circle-fill mr-1"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                </svg>
                Add another stop
              </button>
            </div>
            <h4 className="text-black font-medium mt-6">Destination</h4>
            <div className="flex items-center mt-2">
              <input
                type="text"
                className="w-60 px-2 py-2 border rounded-lg border-gray-300"
                value={destination}
                onChange={handleDestinationChange}
              />
            </div>
            <div className="border rounded-xl mt-10 overflow-hidden">
              <div className="bg-white p-4 flex items-center">
                <h4 className="text-black text-xl font-bold">Distance</h4>
                <span className="text-[#0079FF] text-4xl font-medium ml-40">
                  {distance ? `${distance} km` : "0 km"}
                </span>
              </div>
              <div className="bg-[#F4F8FA] p-4">
                <p className="mt-4 text-gray-500">
                  The distance between <b>{origin}</b> and <b>{destination}</b> via the selected
                  route is <b>{distance ? `${distance} km` : "km"}</b>.
                </p>
              </div>
            </div>
          </div>
          <div className="w-[40%]">
            <MapComponent 
              origin={{ lat: 19.076, lng: 72.8777 }} 
              destination={{ lat: 28.7041, lng: 77.1025 }} 
              stops={[
                { lat: 26.9124, lng: 75.7873 }
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
