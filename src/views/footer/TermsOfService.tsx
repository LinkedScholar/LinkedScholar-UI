import React from 'react';
import '../../styles/views/footer/footer-pages.scss';

const TermsOfService: React.FC = () => {
    return (
        <div className="page-container">
            <main className="content">
                <h1 className="footer-page-title">Terms of Service</h1>
                <p><strong>Last Updated:</strong> March 11, 2025</p>

                <section>
                    <h2>Introduction</h2>
                    <p>
                        Welcome to Linked Scholar. By accessing or using our services, you agree to comply with and be bound by the following Terms of Service.
                        If you do not agree to these terms, please do not use our services.
                    </p>
                </section>

                <section>
                    <h2>Acceptance of Terms</h2>
                    <p>
                        By using Linked Scholar, you confirm that you have read, understood, and agree to these Terms of Service.
                        These terms apply to all users of the service, including visitors, researchers, and contributors.
                    </p>
                </section>

                <section>
                    <h2>Prohibited Activities</h2>
                    <p>
                        You agree not to engage in the following activities:
                    </p>
                    <ul>
                        <li>
                            <strong>Economic Profit:</strong> It is strictly forbidden to use Linked Scholar or any of its content for economic profit or commercial purposes.
                            The service is intended for academic, educational, and non-commercial use only.
                        </li>
                        <li>
                            <strong>Unauthorized Distribution:</strong> You may not distribute, reproduce, or share any content from Linked Scholar without prior written consent from the creators.
                        </li>
                        <li>
                            <strong>Illegal Use:</strong> You may not use the service for any unlawful purpose or in violation of any applicable laws or regulations.
                        </li>
                    </ul>
                </section>

                <section>
                    <h2>Copyright and Intellectual Property</h2>
                    <p>
                        All content, data, and materials provided by Linked Scholar are protected by copyright and intellectual property laws.
                        The creators retain all rights to the content, and any use, distribution, or modification of the content requires explicit permission.
                    </p>
                    <p>
                        If you wish to use or distribute any content from Linked Scholar, you must contact the creators at contact@linkedscholar.io to obtain written consent.
                    </p>
                </section>

                <section>
                    <h2>User Responsibilities</h2>
                    <p>
                        As a user of Linked Scholar, you agree to:
                    </p>
                    <ul>
                        <li>Use the service only for lawful and non-commercial purposes.</li>
                        <li>Respect the intellectual property rights of the creators and other users.</li>
                        <li>Not attempt to reverse-engineer, decompile, or exploit the service.</li>
                    </ul>
                </section>

                <section>
                    <h2>Limitation of Liability</h2>
                    <p>
                        Linked Scholar and its creators are not liable for any damages or losses resulting from your use of the service.
                        This includes, but is not limited to, direct, indirect, incidental, or consequential damages.
                    </p>
                </section>

                <section>
                    <h2>Changes to These Terms</h2>
                    <p>
                        We reserve the right to update or modify these Terms of Service at any time. Any changes will be posted on this page with an updated "Last Updated" date.
                        Your continued use of the service after changes are made constitutes your acceptance of the revised terms.
                    </p>
                </section>

                <section>
                    <h2>Contact Us</h2>
                    <p>
                        If you have any questions or concerns about these Terms of Service, please contact us at:
                    </p>
                    <p>
                        <strong>Email:</strong> contact@linkedscholar.io<br />
                    </p>
                </section>
            </main>
        </div>
    );
};

export default TermsOfService;