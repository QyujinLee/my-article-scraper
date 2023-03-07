import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home";
import Scraped from "./components/pages/Scraped";
import Layout from "./components/layout/Layout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/scraped" element={<Scraped />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
