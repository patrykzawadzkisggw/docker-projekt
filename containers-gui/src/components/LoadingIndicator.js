import React from "react"

export const LoadingIndicator = ({ loading, error }) => {
  return (
    <div className="relative w-full h-10">
      
      <div
        className={`absolute inset-0 bg-transparent ${
          loading
            ? "border-4  animate-pulse" 
            : error
            ? "border-4 border-red-500" 
            : "" 
        }`}
      ></div>
      
      {loading && (
        <div className="absolute inset-0 flex justify-center items-center text-blue-500">
          <div className="animate-spin rounded-full border-t-2 border-blue-500 w-8 h-8"></div> 
          <p className="ml-2">Ładowanie...</p>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex justify-center items-center text-red-500">
          <p>{error}</p>
        </div>
      )}
    </div>
  )
}

