import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import GsapTrasition from "./components/GsapTrasition";
import gsap from "gsap";
import Footer from "./components/Footer";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <GsapTrasition />
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
