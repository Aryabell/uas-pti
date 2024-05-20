import React from 'react';

const Footer = () => {
    return (
        <footer>
            <section className="footer" id="footer">
                <div className="container">
                    <div className="detail">
                        <h3>Kelompok 5</h3>
                        <div className="social">
                            <a href="https://twitter.com/banten_pemprov" className="text-blue-400 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter-square fa-2x"></i>
                            </a>
                            <a href="https://www.instagram.com/pemprov.banten/" className="text-pink-500 hover:text-pink-700" target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram fa-2x"></i>
                            </a>
                        </div>
                    </div>
                    </div>
                    <div className="explanation">
                        <p>
                            The contents listed on this website are intended for informational purposes rather than commercial.
                            We don't want to break any rules or use someone's art or content without permission.
                            If you own any of the pictures or content on our website and don't want them there,
                            or if you need proper credit, please let us know. We'll either remove them or give you credit as needed.
                        </p>
                    </div>

                <div className="copyright">
                    <div>
                        &copy;2024 - Kelompok 5, inc, all rights reserved
                    </div>
                    <div>
                        <a>term & conditions</a>
                        <a>Privacy policy</a>
                    </div>
                </div>
            </section>
        </footer>
    );
};

export default Footer;
