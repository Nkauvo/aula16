import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const disciplinas = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Física', 'Química', 'Biologia', 'Inglês', 'Educação Física', 'Artes', 'Filosofia', 'Sociologia', 'Outra']

function NotaModal({ nota, onSave, onClose }) {
  const [form, setForm] = useState(nota || { disciplina: 'Matemática', tipo: 'Prova', nota: '', periodo: '1º Bimestre', observacao: '' })
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{nota ? '✏️ Editar Nota' : '➕ Nova Nota'}</h2>
          <button className="btn btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label>Disciplina</label>
              <select value={form.disciplina} onChange={e => set('disciplina', e.target.value)}>
                {disciplinas.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Tipo de Avaliação</label>
              <select value={form.tipo} onChange={e => set('tipo', e.target.value)}>
                {['Prova', 'Trabalho', 'Simulado', 'Exercício', 'Seminário', 'Projeto'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label>Nota (0-10)</label>
              <input type="number" min="0" max="10" step="0.1" value={form.nota} onChange={e => set('nota', e.target.value)} placeholder="Ex: 8.5" />
            </div>
            <div className="form-group">
              <label>Período</label>
              <select value={form.periodo} onChange={e => set('periodo', e.target.value)}>
                {['1º Bimestre', '2º Bimestre', '3º Bimestre', '4º Bimestre', '1º Semestre', '2º Semestre'].map(p => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Observação</label>
            <textarea rows={2} value={form.observacao} onChange={e => set('observacao', e.target.value)} placeholder="Comentários sobre a avaliação..." />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => form.nota !== '' && onSave(form)} disabled={form.nota === ''}>
            💾 Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

function notaColor(n) {
  const v = parseFloat(n)
  if (v >= 8) return '#2E7D32'
  if (v >= 6) return '#F57F17'
  return '#C62828'
}

function notaLabel(n) {
  const v = parseFloat(n)
  if (v >= 9) return 'Excelente'
  if (v >= 7) return 'Bom'
  if (v >= 5) return 'Regular'
  return 'Atenção'
}

export default function NotasPage() {
  const [notas, setNotas] = useLocalStorage('notas', [])
  const [modal, setModal] = useState(null)
  const [filtroDisciplina, setFiltroDisciplina] = useState('Todas')
  const [filtroPeriodo, setFiltroPeriodo] = useState('Todos')

  function salvar(form) {
    if (modal.id) {
      setNotas(ns => ns.map(n => n.id === modal.id ? { ...form, id: modal.id } : n))
    } else {
      setNotas(ns => [...ns, { ...form, id: Date.now().toString() }])
    }
    setModal(null)
  }

  function excluir(id) {
    if (confirm('Excluir esta nota?')) setNotas(ns => ns.filter(n => n.id !== id))
  }

  const disciplinasUsadas = ['Todas', ...new Set(notas.map(n => n.disciplina))]
  const periodosUsados = ['Todos', ...new Set(notas.map(n => n.periodo))]

  const filtradas = notas.filter(n => {
    return (filtroDisciplina === 'Todas' || n.disciplina === filtroDisciplina)
        && (filtroPeriodo === 'Todos' || n.periodo === filtroPeriodo)
  })

  // Médias por disciplina
  const porDisciplina = {}
  filtradas.forEach(n => {
    if (!porDisciplina[n.disciplina]) porDisciplina[n.disciplina] = []
    porDisciplina[n.disciplina].push(parseFloat(n.nota))
  })

  const mediaGeral = filtradas.length
    ? (filtradas.reduce((s, n) => s + parseFloat(n.nota), 0) / filtradas.length).toFixed(1)
    : '--'

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 800 }}>📊 Minhas Notas</h1>
        <button className="btn btn-primary btn-sm" onClick={() => setModal({})}>+ Adicionar</button>
      </div>

      {/* Média Geral */}
      {filtradas.length > 0 && (
        <div className="card" style={{ padding: 16, marginBottom: 16, background: 'linear-gradient(135deg, #1565C0, #1976D2)', color: 'white', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>Média Geral</div>
          <div style={{ fontSize: '3rem', fontWeight: 900 }}>{mediaGeral}</div>
          <div style={{ fontSize: '0.85rem', opacity: 0.85 }}>{filtradas.length} avaliações registradas</div>
        </div>
      )}

      {/* Filtros */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
        <select value={filtroDisciplina} onChange={e => setFiltroDisciplina(e.target.value)}>
          {disciplinasUsadas.map(d => <option key={d}>{d}</option>)}
        </select>
        <select value={filtroPeriodo} onChange={e => setFiltroPeriodo(e.target.value)}>
          {periodosUsados.map(p => <option key={p}>{p}</option>)}
        </select>
      </div>

      {/* Resumo por Disciplina */}
      {Object.keys(porDisciplina).length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 10 }}>📈 Médias por Disciplina</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {Object.entries(porDisciplina).map(([disc, vals]) => {
              const media = (vals.reduce((a,b) => a+b, 0) / vals.length).toFixed(1)
              return (
                <div key={disc} className="card" style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{disc}</span>
                    <span style={{ fontWeight: 900, fontSize: '1.1rem', color: notaColor(media) }}>{media}</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${Math.min(parseFloat(media) * 10, 100)}%`, background: notaColor(media) }} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Lista */}
      <h2 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 10 }}>📋 Histórico</h2>
      {filtradas.length === 0 ? (
        <div className="card empty-state">
          <div className="icon">📊</div>
          <h3>Nenhuma nota registrada</h3>
          <p style={{ fontSize: '0.9rem', marginTop: 8 }}>Clique em "+ Adicionar" para registrar uma nota.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filtradas.map(n => (
            <div key={n.id} className="card" style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                background: notaColor(n.nota) + '22',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.2rem', fontWeight: 900, color: notaColor(n.nota), flexShrink: 0,
              }}>{parseFloat(n.nota).toFixed(1)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{n.disciplina}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 3 }}>
                  <span className="badge badge-blue">{n.tipo}</span>
                  <span className="badge badge-yellow">{n.periodo}</span>
                </div>
                {n.observacao && <div style={{ fontSize: '0.78rem', color: '#757575', marginTop: 4 }}>{n.observacao}</div>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: notaColor(n.nota) }}>{notaLabel(n.nota)}</span>
                <div style={{ display: 'flex', gap: 2 }}>
                  <button className="btn btn-icon btn-sm" onClick={() => setModal(n)}>✏️</button>
                  <button className="btn btn-icon btn-sm" onClick={() => excluir(n.id)}>🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal !== null && <NotaModal nota={modal.id ? modal : undefined} onSave={salvar} onClose={() => setModal(null)} />}
    </div>
  )
}
