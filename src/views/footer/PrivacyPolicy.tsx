import React from 'react';
import '../../styles/views/footer/footer-pages.scss'

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="page-container">

            <main className="content">
                <h1 className="footer-page-title">Privacy Policy</h1>
                <p><strong>Last Updated:</strong> March 11, 2025 </p>

                <section>
                    <h2>Introduction</h2>
                    <p>
                        Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our services.
                        Please read this policy carefully to understand our practices regarding your data and how we handle it.
                    </p>
                </section>

                <section>
                    <h2>Data We Collect</h2>
                    <p>
                        We collect and process the following types of data:
                    </p>
                    <ul>
                        <li>
                            <strong>Publicly Available Data:</strong> We use publicly available data from sources such as academic publications, institutional websites, and other open repositories.
                            This data is used to provide insights and analysis in accordance with applicable laws and regulations.
                        </li>
                        <li>
                            <strong>Personal Data:</strong> If you provide personal data (e.g., name, email address, affiliation), we encrypt and securely store this information to protect your privacy.
                        </li>
                        <li>
                            <strong>Usage Data:</strong> We may collect information about how you interact with our services, such as IP addresses, browser types, and pages visited.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>How We Use Your Data</h2>
                    <p>
                        We use the data we collect for the following purposes:
                    </p>
                    <ul>
                        <li>To provide, maintain, and improve our services.</li>
                        <li>To analyze trends and generate insights using publicly available data.</li>
                        <li>To communicate with you, respond to inquiries, and provide support.</li>
                        <li>To comply with legal obligations and protect our rights.</li>
                    </ul>
                </section>

                <section>
                    <h2>Data Encryption and Security</h2>
                    <p>
                        We take the security of your data seriously. All personal data provided by you is encrypted using industry-standard encryption protocols.
                        We implement technical and organizational measures to protect your data from unauthorized access, disclosure, alteration, or destruction.
                    </p>
                </section>

                <section>
                    <h2>Data Sharing and Disclosure</h2>
                    <p>
                        We do not sell or rent your personal data to third parties. However, we may share your data in the following circumstances:
                    </p>
                    <ul>
                        <li>With your consent.</li>
                        <li>To comply with legal obligations or respond to lawful requests from authorities.</li>
                        <li>To protect our rights, privacy, safety, or property, and that of our users or the public.</li>
                        <li>In connection with a merger, acquisition, or sale of assets, where data may be transferred as part of the transaction.</li>
                    </ul>
                </section>

                <section>
                    <h2>Your Rights</h2>
                    <p>
                        You have the following rights regarding your data:
                    </p>
                    <ul>
                        <li><strong>Access:</strong> You can request access to the personal data we hold about you.</li>
                        <li><strong>Correction:</strong> You can request corrections to any inaccurate or incomplete data.</li>
                        <li><strong>Deletion:</strong> You can request the deletion of your personal data, subject to legal obligations.</li>
                        <li><strong>Objection:</strong> You can object to the processing of your data for specific purposes.</li>
                        <li><strong>Data Portability:</strong> You can request a copy of your data in a structured, machine-readable format.</li>
                    </ul>
                    <p>
                        To exercise these rights, please contact us at contact@linkedscholar.io.
                    </p>
                </section>

                <section>
                    <h2>Third-Party Links</h2>
                    <p>
                        Our services may contain links to third-party websites or services. We are not responsible for the privacy practices or content of these third parties.
                        We encourage you to review their privacy policies before providing any personal data.
                    </p>
                </section>

                <section>
                    <h2>Changes to This Privacy Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated "Last Updated" date.
                        We encourage you to review this policy periodically to stay informed about how we are protecting your data.
                    </p>
                </section>

                <section>
                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
                    </p>
                    <p>
                        <strong>Email:</strong>  contact@linkedscholar.io<br />
                    </p>
                </section>
            </main>

        </div>
    );
};

export default PrivacyPolicy;