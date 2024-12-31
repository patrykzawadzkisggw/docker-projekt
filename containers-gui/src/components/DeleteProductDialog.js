import React from 'react'
import axios from 'axios'

export const DeleteProductDialog = ({ productId, onClose, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/api/products/${productId}`)
      onDelete()  
      onClose()  
    } catch (error) {
      console.error("Błąd podczas usuwania produktu:", error)
      alert('Nie udało się usunąć produktu')
      onClose()
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Czy na pewno chcesz usunąć ten produkt?</h2>
        <div className="flex justify-end gap-4">
          <button 
            onClick={onClose}
            className="py-2 px-4 bg-gray-500 text-white rounded-md hover:bg-gray-600"
          >
            Anuluj
          </button>
          <button 
            onClick={handleDelete}
            className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Usuń
          </button>
        </div>
      </div>
    </div>
  )
}


