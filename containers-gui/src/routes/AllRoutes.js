import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, NotFound,Images, Volumes, Networks, ContainerInfo } from '../pages'

export const AllRoutes = () => {
  return (
    <main>
         <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/kontener/:id" element={<ContainerInfo/>} />
            <Route path="/obrazy" element={<Images/>} />
            <Route path="/sieci" element={<Networks/>} />
            <Route path="/woluminy" element={<Volumes/>} />
            <Route path="*" element={<NotFound/>} />
        </Routes>
    </main>
   
  )
}
