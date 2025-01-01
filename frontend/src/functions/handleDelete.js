export const handleDelete = async (path,volumeid) => {
        
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/${path}/${volumeid}`, {
        method: 'DELETE',
      })
      if (response.ok) {}
    } catch (error) {}
  window.location.reload()

  }