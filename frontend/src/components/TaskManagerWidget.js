import React, { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import axios from "axios"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js"


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Filler,
  Tooltip,
  Legend,
  ArcElement
)

export const TaskManagerWidget = ({ containerId }) => {
  const [cpuData, setCpuData] = useState([])
  const [memoryData, setMemoryData] = useState([])
  const [labels, setLabels] = useState([])
  const [cpuUsage, setCpuUsage] = useState(0)
  const [memoryUsage, setMemoryUsage] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/containers/${containerId}`
        )
        const { cpuUsage, memoryUsage } = response.data

        
        setCpuUsage(cpuUsage)
        setMemoryUsage(memoryUsage)

        const currentTime = new Date().toLocaleTimeString()

        
        setLabels((prevLabels) => [...prevLabels, currentTime].slice(-20))
        setCpuData((prevData) => [
          ...prevData,
          parseFloat(cpuUsage.replace("%", "")),
        ].slice(-20))
        setMemoryData((prevData) => [
          ...prevData,
          parseFloat(memoryUsage.replace("%", "")),
        ].slice(-20))
      } catch (error) {
        console.error("Błąd podczas pobierania danych:", error)
      }
    }

    fetchData()
    const intervalId = setInterval(fetchData, 1000)

    return () => clearInterval(intervalId)
  }, [containerId])

  const cpuChartData = {
    labels: labels,
    datasets: [
      {
        label: "Użycie CPU (%)",
        data: cpuData,
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        fill: true,
      },
    ],
  }

  const memoryChartData = {
    labels: labels,
    datasets: [
      {
        label: "Użycie Pamięci (%)",
        data: memoryData,
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
       
        type: "category", 
        labels: labels,
        ticks: {
          maxRotation: 0, 
        },
      },
      y: {
        min: 0, 
        max: 100, 
        ticks: {
          callback: function (value) {
            return value + "%"
          },
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context) {
            return context.raw.toFixed(2) + "%"
          },
        },
      },
    },
  }

  return (
    <div style={{ display: "flex", justifyContent: "space-around", padding: "20px" }}>
      <div style={{ width: "45%" }}>
        <h3>Użycie CPU</h3>
        <Line data={cpuChartData} options={chartOptions} />
        <p>Aktualne użycie CPU: {cpuUsage}</p>
      </div>
      <div style={{ width: "45%" }}>
        <h3>Użycie Pamięci</h3>
        <Line data={memoryChartData} options={chartOptions} />
        <p>Aktualne użycie pamięci: {memoryUsage}</p>
      </div>
    </div>
  )
}


