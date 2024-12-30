import React from 'react'
import dockerStore from '../store/store'

export const ContainerControl = ({ containerId }) => {


    const handleStart = async () => {
      
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/start/${containerId}`, {
          method: 'POST',
        })
        if (response.ok) {
          
          dockerStore.setInfoStatus('running')
        } 
      } catch (error) {}
    }
  
   
    const handleStop = async () => {
      
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/stop/${containerId}`, {
          method: 'POST',
        })
        if (response.ok) {
          
          dockerStore.setInfoStatus('exited')
        } 
      } catch (error) {}
    }
  
    
    const handleRestart = async () => {
     
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/restart/${containerId}`, {
          method: 'POST',
        })
        if (response.ok) {
          
            dockerStore.setInfoStatus('running')
        } 
      } catch (error) {}
    }
  
    return (
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-4">
            
       <div className="flex justify-around space-x-4">
          {dockerStore.info.Status!=='running' &&(<button
            onClick={handleStart}
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-400"
          >
            Start
          </button>)}
          
          {dockerStore.info.Status!=='exited' &&(<button
            onClick={handleStop}
            className="w-full bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 disabled:bg-gray-400"
          >
            Stop
          </button>)}
          
          {dockerStore.info.Status!=='exited' && (
          <button
            onClick={handleRestart}
            className="w-full bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 disabled:bg-gray-400"
          >
            Restart
          </button>)}
        </div>
        
      </div>
    )
}
