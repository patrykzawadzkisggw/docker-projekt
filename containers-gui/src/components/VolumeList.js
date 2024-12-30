import React from 'react'
import volumeIcon from '../assets/volume.png'
import { ContextMenuButton } from './ContextMenuButton'
import { handleDelete, timeAgo } from '../functions'

export const VolumeList = ({ volumes }) => {
  
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {volumes.map((volume) => (
        <li key={volume.name} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              alt=""
              src={volumeIcon}
              className="size-12 flex-none rounded-full bg-gray-50"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
                {volume.name}
              </p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">
              Mountpoint: {volume.mountpoint}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">Driver:</p>
            <p className="mt-1 text-xs/5 text-gray-500">
              {volume.driver}
            </p>
            <ContextMenuButton options={[{ label: 'Usuń', action: () => handleDelete("remove/volume",volume.name) },]} />
            <p className="mt-1 text-xs/5 text-gray-500">
              <time dateTime={volume.createdAt}>
                Utworzono: {timeAgo(volume.createdAt)}
              </time>
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
