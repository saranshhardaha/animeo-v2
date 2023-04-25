import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "Components/Sections/Header";
import Footer from "Components/Sections/Footer";
import AnimeDetail from "Views/AnimeDetail";
import Home from "Views/Home";
import Watch from "Views/Watch";
import Genres from "Views/Genres";
import Search from "Views/Search";

function App() {
  return (
    <div className="App font-manrope bg-[#000] text-white">
      <Header />
      <div className="mt-12 min-h-[calc(100vh-3rem)]">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:animeId" element={<AnimeDetail />} />
            <Route path="/genre/:genre/" element={<Genres />} />
            <Route path="/watch/:animeId/:episodeID" element={<Watch />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}
// bg-[#F5F4F9]
export default App;
