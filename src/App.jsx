import Navbar       from "./components/Navbar";
import Hero         from "./components/Hero";
import Clases       from "./components/Clases";
import Planes       from "./components/Planes";
import Profe        from "./components/Profe";
import Galeria      from "./components/Galeria";
import Playlist     from "./components/Playlist";
import Testimonios  from "./components/Testimonios";
import FAQ          from "./components/FAQ";
import Contacto     from "./components/Contacto";
import Footer       from "./components/Footer";
import WspFloat     from "./components/WspFloat";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Clases />
        <Planes />
        <Profe />
        <Galeria />
        <Playlist />
        <Testimonios />
        <FAQ />
        <Contacto />
      </main>
      <Footer />
      <WspFloat />
    </>
  );
}
