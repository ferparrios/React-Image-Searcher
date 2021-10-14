import React, { useState, useEffect } from 'react'
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {

  const [busqueda, setBusqueda] = useState("")
  const [imagenes, setImagenes] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [totalPaginas, setTotalPaginas] = useState(1)

  useEffect(() => {
    
    const consultarApi = async () => {
      if (busqueda === "") return
      const imagenesPorPagina = 20
      const key = "23847436-81ad99162e8925033bcb8be2e"
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`

      const respuesta = await fetch(url)
      const resultado = await respuesta.json()

      // console.log(resultado.hits);
      setImagenes(resultado.hits)

      // console.log(resultado);
      // Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina)
      setTotalPaginas(calcularTotalPaginas)

      // Mover la pantalla hacia arriba

      const jumbotron = document.querySelector(".jumbotron")
      jumbotron.scrollIntoView({ behavior: "smooth" })
    }

    consultarApi()
    

  }, [busqueda, paginaActual])

  // definir la pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaActual - 1
    if(nuevaPaginaActual === 0) return
    setPaginaActual(nuevaPaginaActual);
  }

  // definir la pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaActual + 1
    if(nuevaPaginaActual > totalPaginas) return
    setPaginaActual(nuevaPaginaActual)
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">
          Buscador de Imagenes
        </p>
          <Formulario setBusqueda={setBusqueda}/>
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes  imagenes={imagenes} />

        {
          (paginaActual === 1) ? null : (
            <button className="btn btn-info mr-1" onClick={paginaAnterior} >
              &laquo; Anterior
            </button>
          )
        }

        {
          (paginaActual === totalPaginas) ? null : (
            <button className="btn btn-info" onClick={paginaSiguiente}>
              Siguiente &raquo;
            </button>
          )
        }

      </div>
    </div>
  );
}

export default App;
