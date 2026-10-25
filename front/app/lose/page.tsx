"use client"
import { useState } from 'react';
import { Background } from './background';
import OrientationGuard  from '../home/orientation-guard.jsx';

export default function LosePage() {
  const [signInOpen, setSignInOpen] = useState(false);
  return (
    <>
    <OrientationGuard>
      <Background />
    </OrientationGuard>
    </>
  );
}
