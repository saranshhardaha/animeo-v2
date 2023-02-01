import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import AnimeDetail from "./Views/AnimeDetail";
import Home from "./Views/Home";
import Watch from "./Views/Watch";

function App() {
  return (
    <div className="App font-manrope">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime/:animeId" element={<AnimeDetail />} />
          <Route path="/watch/:episodeID" element={<Watch />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
// bg-[#F5F4F9]
export default App;
