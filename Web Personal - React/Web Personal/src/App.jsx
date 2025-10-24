import './App.css'

import Header from './components/header';
import FraseYClima from './components/FraseYClima';
import SobreMi from './components/Sobremi';
import Habilidades from './components/Habilidades';
import Proyectos from './components/Proyectos';
import Contacto from './components/Contacto';
import Footer from './components/Footer';

// 2. Importamos la imagen
import fotoPerfil from './assets/img/Foto CV.jpeg';

function App() {

  return (
    <>
      <Header />

      <FraseYClima />

      <SobreMi />

      <Habilidades />

      <Proyectos />

      <Contacto />

      <Footer />


    </>
  );
}

export default App