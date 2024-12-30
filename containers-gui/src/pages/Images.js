import React, { useEffect } from 'react'
import { ImagesList, LoadingIndicator } from '../components'
import { useFetch } from '../hooks'
import dockerStore from '../store/store'

export const Images = () => {
  const { data, loading2, error } = useFetch({ url: `${process.env.REACT_APP_API_URL}/images` })

  useEffect(() => {
    if (data && data.length > 0) {
      dockerStore.saveImages(data)
    }
  }, [data])

  return (
    <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
        <LoadingIndicator loading={loading2} error={error}/>
      <h2 className='select-none text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
        Obrazy
      </h2>

      {data && (
        <div>
          <ul>
            <ImagesList images={data} />
          </ul>
        </div>
      )}

      {loading2 && dockerStore.getImages() && (
        <div>
          <ul>
            <ImagesList images={dockerStore.images} />
          </ul>
        </div>
      )}
    </div>
  )
}
