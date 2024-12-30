import React, { useEffect } from 'react'
import { useFetch } from '../hooks'
import { LoadingIndicator, NetworkList } from '../components'
import dockerStore from '../store/store'

export const Networks = () => {
  const { data, loading2, error } =useFetch({url: `${process.env.REACT_APP_API_URL}/networks`}) 
  useEffect(() => {
    if (data && data.length > 0) {
      dockerStore.saveNetworks(data)
    }
  }, [data])
    return (
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 '>
        <LoadingIndicator loading={loading2} error={error}/>
          <h2 className='select-none text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl '>Sieci</h2>
  
          { data && (
                      <div>
                      <ul>
                          <NetworkList networks={data}/>
                      </ul>
                      </div>
                  )}


                  {loading2 && dockerStore.getNetworks() && (
                      <div>
                      <ul>
                          <NetworkList networks={dockerStore.networks}/>
                      </ul>
                      </div>
                  )}
      </div>
    )
}
