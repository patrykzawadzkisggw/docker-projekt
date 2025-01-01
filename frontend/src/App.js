import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { AllRoutes } from './routes/AllRoutes'
import { Header } from './components'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Header/>
      <AllRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App
