import { Fragment } from 'react'
import { createRoot } from 'react-dom/client'

//punto de entrada a nuestra aplicación
const root = createRoot(document.getElementById('root'))
root.render(
  <Fragment>
    <button>
      HOLA, SOY UN BUTTON
    </button>
  </Fragment>
)
