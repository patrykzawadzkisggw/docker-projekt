import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'

export const EditProduct = () => {
  const [product, setProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: ''
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate() 

  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`)
        setProduct(response.data)
        setLoading(false)
      } catch (err) {
        setError('Nie udało się pobrać produktu')
        setLoading(false)
      }
    }

    fetchProduct()
  }, [id])


  const handleChange = (e) => {
    const { name, value } = e.target
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/products/${id}`, product)
      setIsSubmitting(false)
      navigate('/produkty')
    } catch (err) {
      setIsSubmitting(false)
      setError('Nie udało się zaktualizować produktu')
    }
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
    <div className="container mx-auto p-4 mt-10">
      <h1 className="text-3xl font-bold mb-6">Edytuj Produkt</h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nazwa</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Cena</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            step="0.01"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Opis</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border rounded-md shadow-sm"
            rows="4"
            required
          />
        </div>

        {error && (
          <div className="text-red-500 mb-4">
            <span>{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Zapisuję...' : 'Zaktualizuj Produkt'}
        </button>
      </form>
    </div>
  )
}


