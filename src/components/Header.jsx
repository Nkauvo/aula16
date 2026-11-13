const tabTitles = {
  dashboard: 'Dashboard',
  trabalhos: 'Trabalhos',
  notas: 'Notas',
  calendario: 'Calendário',
}

export default function Header({ activeTab }) {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #1565C0, #1976D2)',
      color: 'white',
      padding: '14px 20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 768, margin: '0 auto' }}>
        <span style={{ fontSize: '1.6rem' }}>📚</span>
        <div>
          <div style={{ fontWeight: 800, fontSize: '1.1rem', letterSpacing: 0.5 }}>EduDesk</div>
          <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>{tabTitles[activeTab]}</div>
        </div>
      </div>
    </header>
  )
}
