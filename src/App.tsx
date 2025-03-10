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


function Api() {
    return null;
}

const App: React.FC = () => {
    return (
        <Router>
            <div className="app-container">
                <header>
                    <h1>Redux with OAuth2 Authentication</h1>
                    <Navbar />
                </header>

                <main className="main-content">
                    <HelloUser />
                    <Routes>
                        <Route path="/" element={<Searcher />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<HelloUser />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsOfService />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/contribute" element={<Contribute />} />
                        <Route path="/sponsor" element={<Sponsor />} />
                        <Route path="/api" element={<Api />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
};

export default App;
