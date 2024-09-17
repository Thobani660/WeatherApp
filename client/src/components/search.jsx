// Search.js
import React from 'react';

const Search = ({ location, setLocation, searchLocation }) => {
  return (
    <div className="search" style={{ color: "white" }}>
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter location"
        type="text"
        style={{ border: "2px solid gold", color: "white", boxShadow: "0 4px 8px rgba(201, 132, 4, 0.89)" }}
      />
    </div>
  );
};

export default Search;
