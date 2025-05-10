import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header.jsx'
import { Aside } from '../components/Aside.jsx'
import Footer from './Footer.jsx'

import '../styles/layout.css'

export function Layout() {
return (
    <>
<div className="content-frame">
    <div className="content-column">
        <Header />
    <main>
        <Outlet />
    </main>
        </div>
        <Aside />
        </div>
        <Footer />
    </>
)
}