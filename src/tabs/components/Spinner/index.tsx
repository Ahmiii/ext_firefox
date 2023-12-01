import React from "react";

export default ({ loading, children }) => {
  return (
    <div className="">
      {loading && (
        <div className="absolute z-50 bg-white opacity-75 w-full h-full flex items-center justify-center">
          <div className="animate-spin rounded-full h-14 w-14 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <div
        className={`relative ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};
