import React from "react";
import { Link } from "react-router-dom";

interface FooterProps {
  url: string; // URL
  title: string; // タイトル
}

const Footer: React.FC<FooterProps> = ({ url, title }) => (
  <footer className="bg-gray-300 text-gray-800">
    <div className="text-right text-xl p-2">
      <Link to={url}>{title}</Link> {/* props から URL と タイトルを受け取る */}
    </div>
  </footer>
);

export default Footer;
