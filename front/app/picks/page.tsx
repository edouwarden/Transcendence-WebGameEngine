"use client"
import { useState } from 'react';
import { Navbar } from './navbar';
import { Background } from './background';

export default function PicksPage() {
  const [signInOpen, setSignInOpen] = useState(false);
  return (
    <div className="relative h-screen overflow-hidden">
      <Background signInOpen={signInOpen} />
      <Navbar signInOpen={signInOpen} setSignInOpen={setSignInOpen} />
    </div>
  );
}
