import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Chatbot from "../components/Chatbot";
import "../layout/MainLayout.css";

export default function MainLayout() {
  return (
    <>
      <Navbar />

      <main className="content">
        <Outlet />
      </main>

      <Chatbot />
      <Footer />
    </>
  );
}
