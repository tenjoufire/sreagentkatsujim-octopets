import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../data/constants";
import "../styles/Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Simplified footer based on Figma design */}
          <div className="footer-logo">
            <span className="logo-text">Octopets</span>
          </div>
          
          <div className="footer-links">
            <Link to={ROUTES.HOME}>ホーム</Link>
            <Link to={ROUTES.LISTINGS}>スポット一覧</Link>
            <Link to={ROUTES.ADD_LISTING}>スポットを追加</Link>
            <Link to="#">Octopetsについて</Link>
            <Link to="#">お問い合わせ</Link>
          </div>
          
          <div className="footer-social">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://x.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Octopets. All rights reserved. 無断転載を禁じます。</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
