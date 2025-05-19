import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Hero from "./pages/Hero";
import Home from "./pages/Home";
import About from "./pages/About";
import CountryDetail from "./pages/CountryDetail";
// import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/country" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/country/:name" element={<CountryDetail />} />
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}
