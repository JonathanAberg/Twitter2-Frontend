import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { About } from './components/About';
import { Register } from './components/Register';

import './styles/general.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Layout />}>
        <Route path="/login" index element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App