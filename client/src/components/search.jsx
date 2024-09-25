import React from "react";

function SearchBar({ location, setLocation, searchLocation, savedLocations }) {
  return (
    <div>
      <div className="search" style={{ color: "white" }}>
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter location"
          type="text"
          color="black"
          style={{
            border: "2px solid gold",
            color: "white",
            boxShadow: "0 4px 8px rgba(201, 132, 4, 0.89)",
          }}
        />
      </div>

      {/* Display previously searched locations */}
      {savedLocations.length > 0 && (
        <div className="saved-locations">
          <h4 style={{ color: "gold" }}>Saved Locations</h4>
          <ul>
            {savedLocations.map((loc, index) => (
              <li
                key={index}
                onClick={() => setLocation(loc)}
                style={{ cursor: "pointer", color: "white" }}
              >
                {loc}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
