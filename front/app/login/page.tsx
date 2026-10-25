"use client"
import { useState } from 'react';
import { Navbar } from './navbar';
import { Background } from './background';
import OrientationGuard  from '../home/orientation-guard.jsx';

export default function LoginPage() {
  const [signInOpen, setSignInOpen] = useState(false);
  return (
    <>
    <OrientationGuard>
      <Background signInOpen={signInOpen} setSignInOpen={setSignInOpen}/>
      {/* <Navbar signInOpen={signInOpen} setSignInOpen={setSignInOpen} /> */}
    </OrientationGuard>
    </>
  );
}
