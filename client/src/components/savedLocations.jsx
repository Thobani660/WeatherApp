// SavedLocations.js
import React from 'react';

const SavedLocations = ({ savedLocations, setLocation }) => {
  return (
    savedLocations.length > 0 && (
      <div className="saved-locations">
        <h4 style={{ color: "gold" }}>Saved Locations</h4>
        <ul>
          {savedLocations.map((loc, index) => (
            <li key={index} onClick={() => setLocation(loc)} style={{ cursor: 'pointer', color: "white" }}>
              {loc}
            </li>
          ))}
        </ul>
      </div>
    )
  );
};

export default SavedLocations;
