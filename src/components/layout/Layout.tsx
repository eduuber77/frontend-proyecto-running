import React, { ReactNode } from 'react';
import Header from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header - Usando el componente Header */}
      <Header />
      
      {/* Main Content */}
      <main className="flex-grow bg-white">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;