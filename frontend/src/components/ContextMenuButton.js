import React, { useState } from "react"

export const ContextMenuButton = ({ options }) => {

  const [isMenuOpen, setIsMenuOpen] = useState(false)


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

 
  const closeMenu = (e) => {
    if (!e.target.closest(".context-menu-button") && !e.target.closest(".context-menu")) {
      setIsMenuOpen(false)
    }
  }


  React.useEffect(() => {
    document.addEventListener("click", closeMenu)
    return () => {
      document.removeEventListener("click", closeMenu)
    }
  }, [])

  
  const handleOptionClick = (func) => {
    func()  
    setIsMenuOpen(false)  
  }

  return (
    <div className="relative">
      
      <button
        onClick={toggleMenu}
        className={(isMenuOpen ? "bg-gray-300 " : "") + "context-menu-button flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-300 focus:outline-none gap-1"}
      >
        <span className="block w-1.5 h-1.5 bg-stone-600 rounded-full"></span>
        <span className="block w-1.5 h-1.5 bg-stone-600 rounded-full"></span>
        <span className="block w-1.5 h-1.5 bg-stone-600 rounded-full"></span>
      </button>

     
      {isMenuOpen && (
        <div className="context-menu absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <ul>
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick(option.action)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
