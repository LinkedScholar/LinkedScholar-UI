import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import GraphView from "./views/GraphView";
import { Toaster } from 'sonner';
import { registerErrorHandlers } from "./utils/errorHandler";
import RegistrationModal from "./components/modals/RegistrationModal";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from 'uuid';

const CLIENT_ID_KEY = 'clientId';

const getClientId = () => {
    let clientId = localStorage.getItem(CLIENT_ID_KEY);
    if (!clientId) {
        clientId = uuidv4();
        localStorage.setItem(CLIENT_ID_KEY, clientId);
    }
    return clientId;
};

function Api() {
    return null;
}

const App: React.FC = () => {
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const [clientId, setClientId] = useState('');

    useEffect(() => {
        registerErrorHandlers(setIsRegistrationModalOpen);
        const id = getClientId();
        setClientId(id);
    }, []);

    return (
        <Router>
            <div className="app-container d-flex flex-column vh-100">
                <header>
                    <Navbar clientId={clientId} />
                </header>

                <Toaster position="top-right" richColors closeButton />

                <RegistrationModal
                    isOpen={isRegistrationModalOpen}
                    onClose={() => setIsRegistrationModalOpen(false)}
                />

                <main className="main-content flex-grow-1 d-flex justify-content-center align-items-center">
                    <Routes>
                        <Route path="/" element={<Searcher clientId={clientId} />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/profile" element={<HelloUser />} />
                        <Route path="/privacy" element={<PrivacyPolicy />} />
                        <Route path="/terms" element={<TermsOfService />} />
                        <Route path="/help" element={<Help />} />
                        <Route path="/contribute" element={<Contribute />} />
                        <Route path="/sponsor" element={<Sponsor />} />
                        <Route path="/api" element={<Api />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/network" element={<GraphView clientId={clientId} />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
};

export default App;