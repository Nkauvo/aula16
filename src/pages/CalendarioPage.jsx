import { useLocalStorage } from '../hooks/useLocalStorage'

export default function CalendarioPage() {
  const [trabalhos] = useLocalStorage('trabalhos', [])
  const hoje = new Date()
  const ano = hoje.getFullYear()
  const mes = hoje.getMonth()
  const nomesMeses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
  const nomeDias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']

  const primeiroDia = new Date(ano, mes, 1).getDay()
  const diasNoMes = new Date(ano, mes + 1, 0).getDate()

  const eventosPorDia = {}
  trabalhos.filter(t => t.prazo && t.status !== 'entregue').forEach(t => {
    const d = new Date(t.prazo + 'T00:00:00')
    if (d.getFullYear() === ano && d.getMonth() === mes) {
      const key = d.getDate()
      if (!eventosPorDia[key]) eventosPorDia[key] = []
      eventosPorDia[key].push(t)
    }
  })

  const statusColor = { 'pendente': '#F57F17', 'em-andamento': '#1565C0', 'entregue': '#2E7D32' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 800 }}>📅 Calendário</h1>
        <span className="badge badge-blue">{nomesMeses[mes]} {ano}</span>
      </div>

      <div className="card" style={{ padding: 16, marginBottom: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, marginBottom: 8 }}>
          {nomeDias.map(d => (
            <div key={d} style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: '#757575', padding: '4px 0' }}>{d}</div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2 }}>
          {Array.from({ length: primeiroDia }).map((_, i) => <div key={'e' + i} />)}
          {Array.from({ length: diasNoMes }).map((_, i) => {
            const dia = i + 1
            const isHoje = dia === hoje.getDate()
            const eventos = eventosPorDia[dia] || []
            return (
              <div key={dia} style={{
                aspectRatio: '1',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                background: isHoje ? '#1565C0' : eventos.length ? '#E3F2FD' : 'transparent',
                color: isHoje ? 'white' : '#212121',
                fontSize: '0.85rem',
                fontWeight: isHoje ? 800 : eventos.length ? 700 : 400,
                position: 'relative',
                padding: '2px',
              }}>
                {dia}
                {eventos.length > 0 && (
                  <div style={{ display: 'flex', gap: 2, marginTop: 1 }}>
                    {eventos.slice(0, 3).map((e, idx) => (
                      <div key={idx} style={{ width: 5, height: 5, borderRadius: '50%', background: statusColor[e.status] || '#F57F17' }} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Legenda e eventos do mês */}
      <h2 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 10 }}>📌 Prazos do Mês</h2>
      {Object.keys(eventosPorDia).length === 0 ? (
        <div className="card empty-state">
          <div className="icon">📅</div>
          <h3>Nenhum prazo este mês</h3>
          <p style={{ fontSize: '0.9rem', marginTop: 8 }}>Adicione trabalhos com data de entrega para vê-los aqui.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {Object.entries(eventosPorDia).sort(([a],[b]) => parseInt(a)-parseInt(b)).map(([dia, evs]) => (
            evs.map(ev => (
              <div key={ev.id} className="card" style={{ padding: '12px 16px', display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{
                  width: 44, height: 44, background: '#1565C0', borderRadius: 10,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, color: 'white',
                }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 600, opacity: 0.8 }}>{nomesMeses[mes].slice(0,3)}</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 900, lineHeight: 1 }}>{dia}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{ev.titulo}</div>
                  <div style={{ fontSize: '0.8rem', color: '#757575' }}>{ev.disciplina} · {ev.tipo}</div>
                </div>
              </div>
            ))
          ))}
        </div>
      )}
    </div>
  )
}
