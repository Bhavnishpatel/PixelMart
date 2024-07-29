import { BrowserRouter, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import GsapTrasition from "./components/GsapTrasition";
import Footer from "./components/Footer";
import { Provider } from "react-redux";
import { store } from "../store/store";

const App = () => {

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <GsapTrasition />
          <Footer />
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
