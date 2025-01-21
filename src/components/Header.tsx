import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => (
  <header className="bg-blue-400 text-white py-4">
    <div className="container mx-auto text-center">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  </header>
);

export default Header;
