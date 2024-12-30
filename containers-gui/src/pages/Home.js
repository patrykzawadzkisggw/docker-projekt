import React, { useEffect } from 'react'
import { useFetch } from '../hooks'
import {  List, LoadingIndicator } from '../components'
import dockerStore from '../store/store'
import { observer } from 'mobx-react'


export const Home = observer(() => {
    const { data, loading2, error } = useFetch({ url: `${process.env.REACT_APP_API_URL}/containers` })
  
    useEffect(() => {
      if (data && data.length > 0) {
        dockerStore.saveContainers(data)
      }
    }, [data])
  
    return (
      <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        <LoadingIndicator loading={loading2} error={error}/>
        <h2 className='select-none text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Kontenery
        </h2>
  
        {data && (
          <ul>
            <List containers={data} />
          </ul>
        )}

        {loading2 && dockerStore.getContainers() && (
          <ul>
            <List containers={dockerStore.containers} />
          </ul>
        )}
       </div>
    )
  })
  