import React from 'react'

export const Table = ({ container }) => {
  return (
    <div>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold text-gray-900">Szczegóły</h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">kontener i jego konfiguracja.</p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Nazwa</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{container.Name && container.Name.replace("/","")}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">ID</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{container.Id}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Status</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{container.Status}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Adres IP</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{container.IPAddress}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Obraz</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{container.Image}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Utwożony</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <time dateTime={container.Created}>{new Date(container.Created).toLocaleString()}</time>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Command</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">{container.Cmd}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Zmienne środowiskowe</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              <ul className="list-disc pl-4">
                {container.Env && container.Env.map((env, index) => (
                  <li key={index}>{env}</li>
                ))
                }
              </ul>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Ports</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {container.Ports && Object.keys(container.Ports).map((port) => (
                <div key={port}>
                  {port}: {container.Ports[port].map((binding) => `${binding.HostIp}:${binding.HostPort}`).join(", ")}
                </div>
              ))
              }
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium text-gray-900">Pamięć</dt>
            <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
              {(container.Memory / 1024 / 1024).toFixed(2)} MB
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}
