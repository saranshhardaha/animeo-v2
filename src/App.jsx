import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import AnimeDetail from "./Views/AnimeDetail";
import Home from "./Views/Home";

function App() {
  return (
    <div className="App font-manrope">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/:animeId" element={<AnimeDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
// bg-[#F5F4F9]
export default App;
