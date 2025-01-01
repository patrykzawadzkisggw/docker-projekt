import React from 'react'
import image from '../assets/container.png'
import { Link, useNavigate } from 'react-router-dom'
import { ContextMenuButton } from './ContextMenuButton'
import { handleDelete, handleStart, handleStop, timeAgo } from '../functions'
export const List = ({containers}) => {
    const navigate = useNavigate()

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {containers.map((container) => (
        <li key={container.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img alt="" src={image} className="size-12 flex-none rounded-full bg-gray-50" />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
              <Link to={`/kontener/${container.id}`}>{container.name.replace("/","")}</Link>
              </p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">{container.image}</p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <ContextMenuButton options={ [
        { label: 'Szczegóły', action: () => navigate(`/kontener/${container.id}`) },
        { label: container.status!=="running" ? "Włącz" : "Wyłącz", action: () => (container.status!=="running" ? handleStart(container.id) : handleStop(container.id)) },
        { label: 'Usuń', action: () => handleDelete("remove",container.id) },
      ]}/>
            {!(container.status==="running") ? (
              <p className="mt-1 text-xs/5 text-gray-500">
                <time dateTime={container.finishedAt}>{timeAgo(container.finishedAt)}</time>
              </p>
            ) : (
              <div className="mt-1 flex items-center gap-x-1.5">
                <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                  <div className="size-1.5 rounded-full bg-emerald-500" />
                </div>
                <p className="text-xs/5 text-gray-500">{container.Status}</p>
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  )
}
