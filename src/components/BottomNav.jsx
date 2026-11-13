const tabs = [
  { id: 'dashboard', icon: '🏠', label: 'Início' },
  { id: 'trabalhos', icon: '📝', label: 'Trabalhos' },
  { id: 'notas', icon: '📊', label: 'Notas' },
  { id: 'calendario', icon: '📅', label: 'Calendário' },
]

export default function BottomNav({ activeTab, setActiveTab }) {
  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0,
      background: 'white',
      borderTop: '1px solid #E0E0E0',
      display: 'flex',
      boxShadow: '0 -2px 8px rgba(0,0,0,0.1)',
      zIndex: 200,
    }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '10px 4px',
            border: 'none',
            background: 'none',
            cursor: 'pointer',
            color: activeTab === tab.id ? '#1565C0' : '#757575',
            transition: 'all 0.2s',
          }}
        >
          <span style={{ fontSize: '1.4rem', marginBottom: 2 }}>{tab.icon}</span>
          <span style={{ fontSize: '0.7rem', fontWeight: activeTab === tab.id ? 700 : 500 }}>{tab.label}</span>
          {activeTab === tab.id && (
            <span style={{ width: 20, height: 3, background: '#1565C0', borderRadius: 2, marginTop: 3 }} />
          )}
        </button>
      ))}
    </nav>
  )
}
