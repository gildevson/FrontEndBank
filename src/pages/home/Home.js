import React from 'react';
import './Home.css'; // Importa o CSS

const Home = () => {
    return (
        <div className="home-wrapper">
            <div className="home-content">
                <div className="text-section">
                    <h1>Beyond Compliance</h1>
                    <p>From secure hosting to compliance monitoring and automation, we make it easy to be secure and build customer trust.</p>
                    <button className="cta-button">Get Started</button>
                </div>
                <div className="video-section">
                    <div className="video-container">
                        <img src="https://via.placeholder.com/300" alt="Person Placeholder" className="person-image" />
                        <blockquote>
                            <p>“What I really wanted at QuadPay, where security is of tantamount importance, was to have something that was comprehensive, followed best practices, and could actually be implemented across an organization at scale.”</p>
                            <cite>- Ian Yamey, CTO</cite>
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
