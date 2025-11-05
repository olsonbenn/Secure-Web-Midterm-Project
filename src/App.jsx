import { useState } from 'react'
//import './App.css'
import Product from './Products'
import Cart from './Cart'
import { Summary } from './Summary'

function App() {
  //const [dataF,setDataF] = useState({});
  const [viewer,setViewer] = useState(0);

  return (
    <>
    {viewer === 0 && <Product v={viewer} setV={setViewer} />}
    {viewer === 1 && <Cart v={viewer} setV={setViewer} />}
    {viewer === 2 && <Summary v={viewer} setV={setViewer} />}
    </>
  )
}

export default App
