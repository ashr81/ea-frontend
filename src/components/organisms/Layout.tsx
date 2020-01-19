/**
 * Initial layout with breadcrumb as static on route changes.
 */
import React from 'react';
import { Flex } from '../atoms';
interface LayoutProps {
  children: React.ReactChild | React.ReactFragment
}
const Layout = ({ children }: LayoutProps) => {
  return (
    <Flex flexDirection='column'>
      {children}
    </Flex>
  )
}

export default Layout;