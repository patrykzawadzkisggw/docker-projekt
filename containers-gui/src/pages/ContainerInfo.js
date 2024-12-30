import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ContainerControl, Table, TaskManagerWidget } from '../components'
import { useFetch } from '../hooks'
import dockerStore from '../store/store'
import { observer } from 'mobx-react'

export const ContainerInfo = observer(() => {
  const params = useParams()
  const id = params.id
  const { data, loading2, error } = useFetch({url: `${process.env.REACT_APP_API_URL}/info/${id}`})

  useEffect(() => {
    if (data) {
      dockerStore.saveInfo(data)

    }
  }, [data])

  if (loading2) return <div>Ładowanie...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className='mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8'>
      {id && data && <ContainerControl containerId={id} />}
      {id  && dockerStore.getInfo(id) && <Table container={dockerStore.info} />}
      {dockerStore.info.Status==='running' && <TaskManagerWidget containerId={id} />}
    </div>
  )
})
