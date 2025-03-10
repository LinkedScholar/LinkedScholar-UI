import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import HelloUser from "./components/HelloUser";
import Searcher from "./views/Searcher";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivacyPolicy from "./views/footer/PrivacyPolicy";
import TermsOfService from "./views/footer/TermsOfService";
import Help from "./views/footer/Help";
import Contribute from "./views/footer/Contribute";
import Sponsor from "./views/footer/Sponsor";
import Contact from "./views/footer/Contact";
import LoginPage from "./views/LoginPage";
import "bootstrap/dist/css/bootstrap.min.css";
import GraphView from "./views/GraphView";

function Api() {
    return null;
}

const App: React.FC = () => {
    return (
        <Router>
            <div className="app-container d-flex flex-column vh-100">
                <header>
                    <Navbar />
                </header>

                {/* Main Content Area (Grows to Fill Space) */}
                <main className="main-content flex-grow-1 d-flex justify-content-center align-items-center">
                    <Routes>
                        <Route path="/" element={<Searcher />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/profile" element={<HelloUser />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsOfService />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/contribute" element={<Contribute />} />
                        <Route path="/sponsor" element={<Sponsor />} />
                        <Route path="/api" element={<Api />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/network" element={<GraphView />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
};

export default App;
