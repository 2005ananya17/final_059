import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";

import Home from "./pages/Home";
import CampusBot from "./pages/CampusBot";
import Campus360 from "./pages/Campus360";
import Notex from "./pages/Notex";
import RiseWall from "./pages/RiseWall";
import TalkNest from "./pages/TalkNest";
import Alumni from "./pages/Alumni";
import Reviews from "./pages/Reviews";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/campusbot" element={<CampusBot />} />
        <Route path="/360" element={<Campus360 />} />
        <Route path="/notex" element={<Notex />} />
        <Route path="/risewall" element={<RiseWall />} />
        <Route path="/talknest" element={<TalkNest />} />
        <Route path="/alumni" element={<Alumni />} />
        <Route path="/reviews" element={<Reviews />} />
      </Route>
    </Routes>
  );
}
