import React from 'react';
import { ResponsiveLayout } from '../molecules';

interface LayoutProps {
  children: React.ReactChild | React.ReactFragment
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <ResponsiveLayout flexDirection='column'>
      {children}
    </ResponsiveLayout>
  )
}

export default Layout;