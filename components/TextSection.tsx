import { Html, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

interface TextSectionProps {
  children: React.ReactNode;
  position: [number, number, number];
  start: number;
  distance: number;
  className?: string;
}

export const TextSection = ({ children, position, start, distance, className = "" }: TextSectionProps) => {
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const divRef = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (group.current && scroll) {
      // The curve function gives us a value from 0 to 1 and back to 0 
      // over the specified range [start, start + distance]
      const curve = scroll.curve(start, distance);
      
      // Extreme zoom effect: scale goes from small to large
      const targetScale = 0.5 + curve * 1.5;
      group.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

      // Fade in and out
      const opacity = curve;
      
      if (divRef.current) {
        divRef.current.style.opacity = `${opacity}`;
        // Extreme zoom in CSS as well for the HTML content
        divRef.current.style.transform = `scale(${0.5 + curve * 0.5})`;
        divRef.current.style.pointerEvents = opacity > 0.1 ? "auto" : "none";
      }
    }
  });

  return (
    <group ref={group} position={position}>
      <Html center transform zIndexRange={[100, 0]}>
        <div 
          ref={divRef}
          className={`transition-transform ease-out will-change-transform ${className}`}
          style={{ opacity: 0, transform: "scale(0.5)" }}
        >
          {children}
        </div>
      </Html>
    </group>
  );
};
