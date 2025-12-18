import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { AppRouter } from './Router'

function App() {

  return (
    <main>
      <BrowserRouter>
        <AppRouter/>
      </BrowserRouter>
    </main>
  )
}

export default App
