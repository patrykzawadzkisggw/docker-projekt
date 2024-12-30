export const handleStop = async (containerId) => {
        
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stop/${containerId}`, {
        method: 'POST',
      })
      if (response.ok) {
        
        window.location.reload()

      } 
    } catch (error) {}
  }