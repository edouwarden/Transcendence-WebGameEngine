"use client"
import { useState } from 'react';
import{Background} from "./background"
import OrientationGuard  from './home/orientation-guard.jsx';

export default function LandingPage() {
 
  return (
    <>
    <OrientationGuard>
     <Background/>
    </OrientationGuard>
    </>
  );
}
