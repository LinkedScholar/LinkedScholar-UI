import React from 'react';


const API: React.FC = () => {
    return (
        <div className="page-container">

            <main className="content api-content">
                <h1 className="footer-page-title">LinkedScholar API</h1>
                <p className="api-description">
                    Our API allows you to interact with LinkedScholar’s data and services programmatically.
                    <strong> This API is private and requires an API key.</strong> Access is granted based on usage and quota limitations.
                </p>

                <section className="api-details">
                    <h2>API Access & Pricing</h2>
                    <ul>
                        <li>Our API requires an API key for authentication.</li>
                        <li>API keys are purchased based on usage and quota limitations.</li>
                        <li>This API is <strong>not public</strong> and is intended for private use.</li>
                        <li>To request an API key, please contact us via the <a href="/contact">Contact Form</a>.</li>
                    </ul>
                </section>

                <section className="api-docs">
                    <h2>API Documentation</h2>
                    <p>You can explore and test our API using the Postman collection linked below.</p>
                    <a href="https://www.postman.com/your-postman-link" target="_blank" rel="noopener noreferrer">
                        <button className="postman-button">View Postman Collection</button>
                    </a>
                </section>

                <section className="api-contact">
                    <h2>Get in Touch</h2>
                    <p>Need an API key or have questions about the API? Contact us through the <a href="/contact">Contact Form</a>.</p>
                </section>
            </main>

        </div>
    );
};

export default API;
