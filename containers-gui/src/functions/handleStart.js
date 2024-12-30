export const handleStart = async (containerId) => {
        
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/start/${containerId}`, {
        method: 'POST',
      })
      if (response.ok) {
       
        window.location.reload()
      }
    } catch (error) {}
  }