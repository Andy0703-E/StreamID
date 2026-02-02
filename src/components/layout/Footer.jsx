
import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <h3>StreamID</h3>
                    <p>Platform streaming hiburan terlengkap untuk Anime, Drama, Komik, dan TV Indonesia.</p>
                </div>
                <div className="footer-links">
                    <div className="link-group">
                        <h4>Navigasi</h4>
                        <a href="/">Home</a>
                        <a href="/tv">TV Indonesia</a>
                        <a href="/anime">Anime</a>

                        <a href="/komik">Komik</a>
                    </div>
                    <div className="link-group">
                        <h4>Tentang</h4>
                        <a href="/about">Tentang Kami</a>
                        <a href="/privacy">Kebijakan Privasi</a>
                        <a href="/contact">Hubungi Kami</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} StreamID. All rights reserved.</p>
            </div>

            <style jsx>{`
                .footer {
                    background: #0f1115;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    padding: 3rem 0 1.5rem;
                    margin-top: auto;
                }

                .footer-content {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 3rem;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 1rem;
                }

                .footer-brand h3 {
                    color: white;
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    font-family: 'Outfit', sans-serif;
                }

                .footer-brand p {
                    color: #94a3b8;
                    line-height: 1.6;
                    max-width: 300px;
                }

                .footer-links {
                    display: flex;
                    gap: 4rem;
                }

                .link-group {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }

                .link-group h4 {
                    color: white;
                    font-size: 1rem;
                    margin-bottom: 0.5rem;
                    font-family: 'Outfit', sans-serif;
                }

                .link-group a {
                    color: #94a3b8;
                    text-decoration: none;
                    font-size: 0.9rem;
                    transition: color 0.2s;
                }

                .link-group a:hover {
                    color: #e11d48;
                }

                .footer-bottom {
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    margin-top: 3rem;
                    padding-top: 1.5rem;
                    text-align: center;
                }

                .footer-bottom p {
                    color: #64748b;
                    font-size: 0.875rem;
                }

                @media (max-width: 768px) {
                    .footer-content {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }

                    .footer-links {
                        flex-wrap: wrap;
                        gap: 2rem;
                    }
                }
            `}</style>
        </footer>
    );
};

export default Footer;
