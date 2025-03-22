import { ReactNode } from 'react';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
  isAuthPage?: boolean;
}

const Layout = ({ children, isAuthPage = false }: LayoutProps) => {
  return (
    <div className="layout-background">
      <div className={`app-container ${isAuthPage ? 'auth-page-container' : ''}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;