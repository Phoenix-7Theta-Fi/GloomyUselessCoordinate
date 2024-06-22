import React from 'react';
import Link from 'next/link';

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to Ayurvedic Healthcare Platform</h1>
      <div>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
};

export default Home;
