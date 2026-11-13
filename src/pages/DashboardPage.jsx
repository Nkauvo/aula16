import { useLocalStorage } from '../hooks/useLocalStorage'

export default function DashboardPage() {
  const [trabalhos] = useLocalStorage('trabalhos', [])
  const [notas] = useLocalStorage('notas', [])

  const pendentes = trabalhos.filter(t => t.status !== 'entregue').length
  const entregues = trabalhos.filter(t => t.status === 'entregue').length
  const mediaGeral = notas.length
    ? (notas.reduce((sum, n) => sum + parseFloat(n.nota || 0), 0) / notas.length).toFixed(1)
    : '--'

  const urgentes = trabalhos
    .filter(t => t.status !== 'entregue' && t.prazo)
    .sort((a, b) => new Date(a.prazo) - new Date(b.prazo))
    .slice(0, 3)

  const hoje = new Date()
  const greeting = hoje.getHours() < 12 ? 'Bom dia' : hoje.getHours() < 18 ? 'Boa tarde' : 'Boa noite'

  const statusColor = { 'pendente': '#F57F17', 'em-andamento': '#1565C0', 'entregue': '#2E7D32' }
  const statusLabel = { 'pendente': '⏳ Pendente', 'em-andamento': '🔄 Em andamento', 'entregue': '✅ Entregue' }

  function diasRestantes(prazo) {
    const diff = Math.ceil((new Date(prazo) - hoje) / (1000 * 60 * 60 * 24))
    if (diff < 0) return <span style={{ color: '#C62828' }}>⚠️ Atrasado!</span>
    if (diff === 0) return <span style={{ color: '#C62828' }}>🔥 Hoje!</span>
    if (diff === 1) return <span style={{ color: '#F57F17' }}>Amanhã</span>
    return <span style={{ color: '#757575' }}>em {diff} dias</span>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* Saudação */}
      <div className="card" style={{ padding: '20px', background: 'linear-gradient(135deg, #1565C0, #1976D2)', color: 'white' }}>
        <div style={{ fontSize: '0.9rem', opacity: 0.85 }}>{greeting}! 👋</div>
        <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: 4 }}>Seu resumo de hoje</div>
        <div style={{ fontSize: '0.85rem', opacity: 0.8, marginTop: 4 }}>
          {hoje.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
        {[
          { label: 'Pendentes', value: pendentes, icon: '⏳', color: '#F57F17', bg: '#FFFDE7' },
          { label: 'Entregues', value: entregues, icon: '✅', color: '#2E7D32', bg: '#E8F5E9' },
          { label: 'Média', value: mediaGeral, icon: '📊', color: '#1565C0', bg: '#E3F2FD' },
        ].map(stat => (
          <div key={stat.label} className="card" style={{ padding: '14px 10px', textAlign: 'center', background: stat.bg }}>
            <div style={{ fontSize: '1.6rem' }}>{stat.icon}</div>
            <div style={{ fontSize: '1.4rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
            <div style={{ fontSize: '0.72rem', color: '#757575', fontWeight: 600 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Urgentes */}
      {urgentes.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 12, color: '#212121' }}>
            🔥 Próximos Prazos
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {urgentes.map(t => (
              <div key={t.id} className="card" style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: '#E3F2FD',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem', flexShrink: 0,
                }}>📝</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.titulo}</div>
                  <div style={{ fontSize: '0.8rem', color: '#757575' }}>{t.disciplina}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.8rem' }}>
                  <div style={{ fontWeight: 600, color: statusColor[t.status] }}>{statusLabel[t.status]}</div>
                  <div>{diasRestantes(t.prazo)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {trabalhos.length === 0 && notas.length === 0 && (
        <div className="card empty-state">
          <div className="icon">🎓</div>
          <h3>Bem-vindo ao EduDesk!</h3>
          <p style={{ fontSize: '0.9rem', marginTop: 8 }}>Adicione seus trabalhos e notas nas abas abaixo para começar a organizar seus estudos.</p>
        </div>
      )}
    </div>
  )
}
