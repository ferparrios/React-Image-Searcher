import React, { useState } from 'react'
import Error from './Error'

const Formulario = ({setBusqueda}) => {

  const [termino, setTermino] = useState("")
  const [error, setError] = useState(false)

  const buscarImagenes = e => {
    e.preventDefault()
    // validar
    if(termino.trim() === ""){
        setError(true)
        return
    }
    setError(false)
    // enviar el termino de busqueda hacie el componente principal
    setBusqueda(termino)
  }

  return (
    <form action="" onSubmit={buscarImagenes}>
      <div className="row">
        <div className="form-group col-md-8">
          <input type="text" name="" id="" className="form-control form-control-lg" placeholder="Busca una imagen, ejemplo: futbol o cafe" onChange={ e => setTermino(e.target.value) } />
        </div>
        <div className="form-group col-md-4">
          <input type="submit" name="" id="" className="btn btn-lg btn-danger btn-block" value="Buscar"  />
        </div>
      </div>
{
  error ? <Error mensaje="Agrega un termino de busqueda" /> : null
}

    </form>
  )
}

export default Formulario
