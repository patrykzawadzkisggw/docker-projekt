import React from 'react'
import networkIcon from '../assets/network.png'
import { ContextMenuButton } from './ContextMenuButton'
import { timeAgo,handleDelete } from '../functions'

export const NetworkList = ({ networks }) => {
  

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {networks.map((network) => (
        <li key={network.id} className="flex justify-between gap-x-6 py-5">
          <div className="flex min-w-0 gap-x-4">
            <img
              alt=""
              src={networkIcon}
              className="size-12 flex-none rounded-full bg-gray-50"
            />
            <div className="min-w-0 flex-auto">
              <p className="text-sm/6 font-semibold text-gray-900">
                {network.name}
              </p>
              <p className="mt-1 truncate text-xs/5 text-gray-500">
                Driver: {network.driver} | Scope: {network.scope}
              </p>
            </div>
          </div>
          <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
            <p className="text-sm/6 text-gray-900">Subnet: {network.subnet}</p>
            <p className="text-sm/6 text-gray-900">Gateway: {network.gateway}</p>
            <ContextMenuButton options={[{ label: 'Usuń', action: () => handleDelete("remove/network",network.id) },]}/>
            <p className="mt-1 text-xs/5 text-gray-500">
            
              <time dateTime={network.created}>
                Utworzono: {timeAgo(network.created)}
              </time>
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}
