import React from 'react'
import image2 from '../assets/image.png'
import { ContextMenuButton } from './ContextMenuButton'
import { handleDelete, timeAgo } from '../functions'

export const ImagesList = ({ images }) => {
  
  return (
    <ul role="list" className="divide-y divide-gray-100">
      {images.map((image) => (
        <li key={image.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              alt=""
              src={image2}
              className="size-12 flex-none rounded-full bg-gray-50"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
                {image.repository.replace('[','').replace(']','') || 'Brak repozytorium'}
              </p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">
                {image.id}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">
              Rozmiar: {(image.size / (1024 * 1024)).toFixed(2)} MB
            </p>
            <ContextMenuButton options={[{ label: 'Usuń', action: () => handleDelete("remove/image",image.id) },]} />
            <p className="mt-1 text-xs/5 text-gray-500">
           
              <time dateTime={image.created}>
                {timeAgo(image.created)}
              </time>
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
