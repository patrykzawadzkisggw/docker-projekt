import { useState, useEffect } from "react"

export const useFetch = ({ url }) => {
    const [error, setError] = useState(null)
    const [loading2, setLoading] = useState(true)
    const [data, setData] = useState([])
    
    const fetchWithRetry = async (url, retries = 3, delay = 1000) => {
        let attempt = 0
        while (attempt < retries) {
            try {
                const response = await fetch(url, { method: "GET" })
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const json = await response.json()
                return json
            } catch (err) {
                attempt++
                if (attempt >= retries) {
                    throw err
                }
                console.error(`Fetch attempt ${attempt} failed:`, err.message)
                await new Promise(resolve => setTimeout(resolve, delay))
            }
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true)
                const fetchedData = await fetchWithRetry(url)
                setData(fetchedData)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                console.error("Fetch error: ", err)
                setLoading(false)
            }
        }

        fetchProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    return { error, loading2, data }
}
