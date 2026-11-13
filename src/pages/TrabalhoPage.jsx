import { useState } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const statusOptions = ['pendente', 'em-andamento', 'entregue']
const statusLabel = { 'pendente': '⏳ Pendente', 'em-andamento': '🔄 Em andamento', 'entregue': '✅ Entregue' }
const statusColor = { 'pendente': '#F57F17', 'em-andamento': '#1565C0', 'entregue': '#2E7D32' }
const statusBg = { 'pendente': '#FFFDE7', 'em-andamento': '#E3F2FD', 'entregue': '#E8F5E9' }

const disciplinas = ['Matemática', 'Português', 'História', 'Geografia', 'Ciências', 'Física', 'Química', 'Biologia', 'Inglês', 'Educação Física', 'Artes', 'Filosofia', 'Sociologia', 'Outra']

function TrabalhoModal({ trabalho, onSave, onClose }) {
  const [form, setForm] = useState(trabalho || { titulo: '', disciplina: 'Matemática', tipo: 'Trabalho', prazo: '', descricao: '', status: 'pendente', prioridade: 'media' })

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{trabalho ? '✏️ Editar Trabalho' : '➕ Novo Trabalho'}</h2>
          <button className="btn btn-icon" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Título *</label>
            <input value={form.titulo} onChange={e => set('titulo', e.target.value)} placeholder="Ex: Trabalho de Biologia - Células" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label>Disciplina</label>
              <select value={form.disciplina} onChange={e => set('disciplina', e.target.value)}>
                {disciplinas.map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Tipo</label>
              <select value={form.tipo} onChange={e => set('tipo', e.target.value)}>
                {['Trabalho', 'Prova', 'Seminário', 'Projeto', 'Exercício', 'Pesquisa'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div className="form-group">
              <label>Prazo</label>
              <input type="date" value={form.prazo} onChange={e => set('prazo', e.target.value)} />
            </div>
            <div className="form-group">
              <label>Prioridade</label>
              <select value={form.prioridade} onChange={e => set('prioridade', e.target.value)}>
                <option value="alta">🔴 Alta</option>
                <option value="media">🟡 Média</option>
                <option value="baixa">🟢 Baixa</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select value={form.status} onChange={e => set('status', e.target.value)}>
              {statusOptions.map(s => <option key={s} value={s}>{statusLabel[s]}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Descrição / Observações</label>
            <textarea rows={3} value={form.descricao} onChange={e => set('descricao', e.target.value)} placeholder="Detalhes do trabalho..." />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={() => form.titulo && onSave(form)} disabled={!form.titulo}>
            💾 Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

export default function TrabalhoPage() {
  const [trabalhos, setTrabalhos] = useLocalStorage('trabalhos', [])
  const [modal, setModal] = useState(null)
  const [filtro, setFiltro] = useState('todos')
  const [busca, setBusca] = useState('')

  function salvar(form) {
    if (modal.id) {
      setTrabalhos(ts => ts.map(t => t.id === modal.id ? { ...form, id: modal.id } : t))
    } else {
      setTrabalhos(ts => [...ts, { ...form, id: Date.now().toString() }])
    }
    setModal(null)
  }

  function excluir(id) {
    if (confirm('Excluir este trabalho?')) {
      setTrabalhos(ts => ts.filter(t => t.id !== id))
    }
  }

  function toggleStatus(id) {
    setTrabalhos(ts => ts.map(t => {
      if (t.id !== id) return t
      const idx = statusOptions.indexOf(t.status)
      return { ...t, status: statusOptions[(idx + 1) % statusOptions.length] }
    }))
  }

  const filtrados = trabalhos.filter(t => {
    const matchFiltro = filtro === 'todos' || t.status === filtro
    const matchBusca = !busca || t.titulo.toLowerCase().includes(busca.toLowerCase()) || t.disciplina.toLowerCase().includes(busca.toLowerCase())
    return matchFiltro && matchBusca
  }).sort((a, b) => {
    if (!a.prazo) return 1; if (!b.prazo) return -1
    return new Date(a.prazo) - new Date(b.prazo)
  })

  const prioridadeIcon = { alta: '🔴', media: '🟡', baixa: '🟢' }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: 800 }}>📝 Meus Trabalhos</h1>
        <button className="btn btn-primary btn-sm" onClick={() => setModal({})}>+ Novo</button>
      </div>

      <input style={{ marginBottom: 12 }} value={busca} onChange={e => setBusca(e.target.value)} placeholder="🔍 Buscar trabalhos..." />

      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {[['todos','Todos'],['pendente','Pendentes'],['em-andamento','Em andamento'],['entregue','Entregues']].map(([v, l]) => (
          <button key={v} onClick={() => setFiltro(v)} style={{
            padding: '6px 14px', borderRadius: 999, border: 'none', cursor: 'pointer', flexShrink: 0,
            fontWeight: 600, fontSize: '0.8rem',
            background: filtro === v ? '#1565C0' : '#E0E0E0',
            color: filtro === v ? 'white' : '#757575',
          }}>{l}</button>
        ))}
      </div>

      {filtrados.length === 0 ? (
        <div className="card empty-state">
          <div className="icon">📝</div>
          <h3>Nenhum trabalho encontrado</h3>
          <p style={{ fontSize: '0.9rem', marginTop: 8 }}>Clique em "+ Novo" para adicionar seu primeiro trabalho.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {filtrados.map(t => (
            <div key={t.id} className="card" style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span>{prioridadeIcon[t.prioridade] || '🟡'}</span>
                    <span style={{ fontWeight: 700, fontSize: '0.95rem' }}>{t.titulo}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <span className="badge badge-blue">{t.disciplina}</span>
                    <span className="badge badge-yellow">{t.tipo}</span>
                  </div>
                  {t.prazo && (
                    <div style={{ fontSize: '0.8rem', color: '#757575', marginTop: 6 }}>
                      📅 {new Date(t.prazo + 'T00:00:00').toLocaleDateString('pt-BR')}
                    </div>
                  )}
                  {t.descricao && <div style={{ fontSize: '0.8rem', color: '#757575', marginTop: 4 }}>{t.descricao}</div>}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6 }}>
                  <button onClick={() => toggleStatus(t.id)} style={{
                    padding: '4px 10px', borderRadius: 999, border: 'none', cursor: 'pointer',
                    fontSize: '0.75rem', fontWeight: 700,
                    background: statusBg[t.status], color: statusColor[t.status],
                  }}>{statusLabel[t.status]}</button>
                  <div style={{ display: 'flex', gap: 4 }}>
                    <button className="btn btn-icon btn-sm" onClick={() => setModal(t)} title="Editar">✏️</button>
                    <button className="btn btn-icon btn-sm" onClick={() => excluir(t.id)} title="Excluir">🗑️</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal !== null && <TrabalhoModal trabalho={modal.id ? modal : undefined} onSave={salvar} onClose={() => setModal(null)} />}
    </div>
  )
}
