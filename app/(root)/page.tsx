import React from 'react';
import { UserButton } from '@clerk/nextjs';

// Define your React component
const HomePage = () => {
  return (
    <div>
    Home
    <UserButton afterSignOutUrl='/'/>
    </div>
  );
};

// Export the component as the default export
export default HomePage;
