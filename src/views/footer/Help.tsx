import React from 'react';
import '../../styles/views/footer/footer-pages.scss'


const Help: React.FC = () => {
    return (
        <div className="page-container">

            <main className="content">
                <h1 className="footer-page-title">Help & FAQs</h1>

                <section>

                    <div className="faq-item">
                        <h3>What is LinkedScholar?</h3>
                        <p>
                            LinkedScholar is a web application designed to help users explore and analyze academic research networks.
                            It provides insights into researchers, their collaborations, and their fields of interest using publicly available data.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>How do I search for researchers?</h3>
                        <p>
                            To search for researchers, use the search bar on the homepage or explore the network graph.
                            You can filter researchers by affiliation, collaboration strength, or fields of interest.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>Is LinkedScholar free to use?</h3>
                        <p>
                            Yes, LinkedScholar is completely free to use. We are committed to providing open access to academic research insights.
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>Can I distribute or modify the software?</h3>
                        <p>
                            LinkedScholar is protected by copyright and intellectual property laws.
                            You may not distribute, modify, or use the software for commercial purposes without explicit permission from the creators.
                            If you are interested in collaboration or distribution, please contact us at [Insert Contact Information].
                        </p>
                    </div>

                    <div className="faq-item">
                        <h3>What are the future updates for LinkedScholar?</h3>
                        <p>
                            We are continuously working to improve LinkedScholar. Future updates may include:
                        </p>
                        <ul>
                            <li>Enhanced search and filtering capabilities.</li>
                            <li>Integration with additional academic databases.</li>
                            <li>New visualization tools for analyzing research networks.</li>
                        </ul>
                    </div>

                    <div className="faq-item">
                        <h3>How can I contact support?</h3>
                        <p>
                            If you have any questions or need assistance, please contact us at:
                        </p>
                        <p>
                            <strong>Email:</strong>  contact@linkedscholar.io<br />
                        </p>
                    </div>
                </section>
            </main>

        </div>
    );
};

export default Help;