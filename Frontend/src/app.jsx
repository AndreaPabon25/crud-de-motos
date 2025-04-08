import React, { useEffect, useState } from 'react'
import './App.css' // Asegúrate de tener este archivo para las animaciones

function App() {
  const [motos, setMotos] = useState([])
  const [marca, setMarca] = useState('')
  const [modelo, setModelo] = useState('')
  const [cilindraje, setCilindraje] = useState('')
  const [precio, setPrecio] = useState('')
  const [editandoId, setEditandoId] = useState(null)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')
  const [eliminandoId, setEliminandoId] = useState(null) // 👈 nuevo estado

  useEffect(() => {
    fetch('http://localhost:3001/api/motos')
      .then(res => res.json())
      .then(data => setMotos(data))
      .catch(err => setError('Error al cargar motos'))
  }, [])

  const mostrarMensaje = (texto, esError = false) => {
    if (esError) {
      setError(texto)
      setMensaje('')
    } else {
      setMensaje(texto)
      setError('')
    }
    setTimeout(() => {
      setMensaje('')
      setError('')
    }, 3000)
  }

  const limpiarFormulario = () => {
    setMarca('')
    setModelo('')
    setCilindraje('')
    setPrecio('')
    setEditandoId(null)
  }

  const handleAddOrEditMoto = (e) => {
    e.preventDefault()
    if ([marca, modelo, cilindraje, precio].some(f => f.trim() === '')) {
      mostrarMensaje('Todos los campos son obligatorios', true)
      return
    }

    const motoData = {
      marca,
      modelo,
      cilindraje: Number(cilindraje),
      precio: Number(precio)
    }

    const url = editandoId
      ? `http://localhost:3001/api/motos/${editandoId}`
      : 'http://localhost:3001/api/motos'

    const method = editandoId ? 'PUT' : 'POST'

    fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(motoData)
    })
      .then(res => res.json())
      .then(data => {
        if (editandoId) {
          setMotos(motos.map(m => m.id === editandoId ? data : m))
          mostrarMensaje('Moto actualizada con éxito')
        } else {
          setMotos([...motos, data])
          mostrarMensaje('Moto agregada con éxito')
        }
        limpiarFormulario()
      })
      .catch(() => mostrarMensaje('Error al guardar moto', true))
  }

  const handleDelete = (id) => {
    const confirmar = window.confirm('¿Estás seguro de eliminar esta moto?')
    if (!confirmar) return

    setEliminandoId(id) // 👈 activar animación

    setTimeout(() => {
      fetch(`http://localhost:3001/api/motos/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          setMotos(motos.filter(m => m.id !== id))
          mostrarMensaje('Moto eliminada')
          setEliminandoId(null)
        })
        .catch(() => {
          mostrarMensaje('Error al eliminar moto', true)
          setEliminandoId(null)
        })
    }, 300) // ⏱ espera para que se vea la animación
  }

  const handleEdit = (moto) => {
    setEditandoId(moto.id)
    setMarca(moto.marca)
    setModelo(moto.modelo)
    setCilindraje(moto.cilindraje)
    setPrecio(moto.precio)
  }

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>🏍️ CRUD de Motos</h1>

      {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleAddOrEditMoto} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Marca"
          value={marca}
          onChange={e => setMarca(e.target.value)}
          style={{ marginRight: '1rem' }}
          required
        />
        <input
          type="text"
          placeholder="Modelo"
          value={modelo}
          onChange={e => setModelo(e.target.value)}
          style={{ marginRight: '1rem' }}
          required
        />
        <input
          type="number"
          placeholder="Cilindraje"
          value={cilindraje}
          onChange={e => setCilindraje(e.target.value)}
          style={{ marginRight: '1rem' }}
          required
        />
        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
          style={{ marginRight: '1rem' }}
          required
        />
        <button type="submit">
          {editandoId ? 'Guardar Cambios' : 'Agregar Moto'}
        </button>
        {editandoId && (
          <button
            type="button"
            onClick={limpiarFormulario}
            style={{ marginLeft: '1rem' }}
          >
            Cancelar
          </button>
        )}
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {motos.map((moto) => (
          <li
            key={moto.id}
            className={eliminandoId === moto.id ? 'fade-out' : ''}
            style={{
              marginBottom: '1rem',
              transition: 'opacity 0.3s ease',
              opacity: eliminandoId === moto.id ? 0 : 1,
            }}
          >
            <strong>{moto.marca}</strong> - {moto.modelo} - {moto.cilindraje}cc - ${moto.precio}
            <button onClick={() => handleEdit(moto)} style={{ marginLeft: '1rem' }}>
              Editar
            </button>
            <button
              onClick={() => handleDelete(moto.id)}
              style={{ marginLeft: '0.5rem', color: 'red' }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
