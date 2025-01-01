import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const ActiveClas = "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
  const ActiveClassMobile = "block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white"
  const InActiveClas = "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
  const InactiveClassMobile = "block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(prevState => !prevState)
  }

  return (
    <nav className="bg-gray-800 sticky top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen ? "true" : "false"}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMobileMenuOpen ? "hidden" : "block"} size-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <svg
                className={`${isMobileMenuOpen ? "block" : "hidden"} size-6`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
             
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <NavLink to="/" className={({ isActive }) => (isActive ? ActiveClas : InActiveClas)} aria-current="page" end>Kontenery</NavLink>
                <NavLink to="/obrazy" className={({ isActive }) => (isActive ? ActiveClas : InActiveClas)}>Obrazy</NavLink>
                <NavLink to="/sieci" className={({ isActive }) => (isActive ? ActiveClas : InActiveClas)}>Sieci</NavLink>
                <NavLink to="/woluminy" className={({ isActive }) => (isActive ? ActiveClas : InActiveClas)}>Woluminy</NavLink>
                <NavLink to="/produkty" className={({ isActive }) => (isActive ? ActiveClas : InActiveClas)}>Produkty</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

     
      <div className={`${isMobileMenuOpen ? "block" : "hidden"} sm:hidden`} id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <NavLink to="/" className={({ isActive }) => (isActive ? ActiveClassMobile : InactiveClassMobile)} aria-current="page" end>Kontenery</NavLink>
          <NavLink to="/obrazy" className={({ isActive }) => (isActive ? ActiveClassMobile : InactiveClassMobile)}>Obrazy</NavLink>
          <NavLink to="/sieci" className={({ isActive }) => (isActive ? ActiveClassMobile : InactiveClassMobile)}>Sieci</NavLink>
          <NavLink to="/woluminy" className={({ isActive }) => (isActive ? ActiveClassMobile : InactiveClassMobile)}>Woluminy</NavLink>
          <NavLink to="/produkty" className={({ isActive }) => (isActive ? ActiveClassMobile : InactiveClassMobile)}>Produkty</NavLink>
        </div>
      </div>
    </nav>
  )
}
