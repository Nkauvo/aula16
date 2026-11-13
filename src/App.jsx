import { useState } from 'react'
import Header from './components/Header'
import BottomNav from './components/BottomNav'
import DashboardPage from './pages/DashboardPage'
import TrabalhoPage from './pages/TrabalhoPage'
import NotasPage from './pages/NotasPage'
import CalendarioPage from './pages/CalendarioPage'
import './index.css'

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const pages = {
    dashboard: <DashboardPage />,
    trabalhos: <TrabalhoPage />,
    notas: <NotasPage />,
    calendario: <CalendarioPage />,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header activeTab={activeTab} />
      <main style={{ flex: 1, padding: '16px', paddingBottom: '80px', maxWidth: '768px', margin: '0 auto', width: '100%' }}>
        {pages[activeTab]}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  )
}
