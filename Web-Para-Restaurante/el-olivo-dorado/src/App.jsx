import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Menu from './components/Menu';
import Location from './components/Location';
import ReservationForm from './components/ReservationForm'; // <-- 1. Importar Form
import Footer from './components/Footer';                 // <-- 2. Importar Footer

function App() {
  return (
    <div className="bg-brand-bg text-brand-dark">
      <Navbar />
      <main>
        <Hero />
        <Menu />
        <Location />
        <ReservationForm /> {/* <-- 3. Añadir Form */}
      </main>
      <Footer />              {/* <-- 4. Añadir Footer */}
    </div>
  )
}

export default App