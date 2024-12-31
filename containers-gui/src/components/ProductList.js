import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { DeleteProductDialog } from './DeleteProductDialog'


export const ProductList = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`)
        setProducts(response.data)
        setLoading(false)
      } catch (err) {
        setError('Nie udało się pobrać produktów')
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleDeleteClick = (id) => {
    setSelectedProductId(id)
    setIsDeleteDialogOpen(true)
  }


  const handleCloseDialog = () => {
    setIsDeleteDialogOpen(false)
    setSelectedProductId(null)
  }

  const handleDeleteProduct = () => {
    setProducts(products.filter(product => product.id !== selectedProductId))
    handleCloseDialog()
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl">Ładowanie...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-red-500">{error}</span>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
        <div className='flex justify-between'>
        <h1 className="text-3xl font-bold mb-6">Lista Produktów</h1>
      <div className="mb-6">
        <Link 
          to="/produkty/dodaj" 
          className="inline-flex items-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Dodaj Nowy Produkt
        </Link>
      </div>
        </div>
      
      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">ID</th>
              <th scope="col" className="px-6 py-3">Nazwa</th>
              <th scope="col" className="px-6 py-3">Cena</th>
              <th scope="col" className="px-6 py-3">Opis</th>
              <th scope="col" className="px-6 py-3">Akcje</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4">{product.id}</td>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.price.toFixed(2)} zł</td>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4 flex gap-4">
                  <Link to={`/produkty/edytuj/${product.id}`} className="text-blue-500 hover:underline">
                    Edytuj
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(product.id)}
                    className="text-red-500 hover:underline"
                  >
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDeleteDialogOpen && (
        <DeleteProductDialog
          productId={selectedProductId}
          onClose={handleCloseDialog}
          onDelete={handleDeleteProduct}
        />
      )}
    </div>
  )
}

