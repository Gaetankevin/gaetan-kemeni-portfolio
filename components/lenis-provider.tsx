"use client";
import { ReactLenis, useLenis } from '@studio-freight/react-lenis'
import { useEffect } from "react";

function Layout({ children }: { children: React.ReactNode }) {
  const lenis = useLenis(({ scroll }) => {
    // called every scroll
  });

  return <>{children}</>;
}

export function LenisProvider({ children }: { children: React.ReactNode }) {
  const options = {
    // lerp: 0.1,
    // duration: 1.5,
    // smoothTouch: true,
  };
  return (
    <ReactLenis root options={options}>
      <Layout>{children}</Layout>
    </ReactLenis>
  );
}