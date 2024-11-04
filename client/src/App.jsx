import React, { useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Model } from './assets/Model';
import './App.css';

function Scene({ scrollProgress }) {
  const { camera } = useThree();

  // Ref pentru pointLight pentru a putea controla poziția sa
  const pointLightRef = React.useRef();

  // Actualizează poziția camerei și a luminii pe baza progresului scroll-ului
  useFrame(() => {
    // Mișcare lină pe axa Y a camerei între 2 și 10
    const targetY = 2 + scrollProgress * 8;
    camera.position.y += (targetY - camera.position.y) * 0.1;

    // Poziții fixe pe axele X și Z pentru cameră
    camera.position.x = 2;
    camera.position.z = 5;

    // Mișcarea luminii pointLight în funcție de scroll pentru un efect dramatic
    if (pointLightRef.current) {
      const lightY = 10 - scrollProgress * 15; // Mișcare verticală
      const lightX = -5 + scrollProgress * 10; // Mișcare orizontală

      pointLightRef.current.position.set(lightX, lightY, 6);
    }
  });

  return (
    <>
      {/* Modelul importat */}
      <Model />

      {/* Luminile din scenă */}
      <ambientLight color="#2F4F4F" intensity={0.3} /> {/* Lumină ambientală scăzută pentru contrast */}
      
      {/* PointLight pentru efecte dramatice */}
      <pointLight
        ref={pointLightRef}
        color="#4F8484"
        intensity={100}
        distance={20}
        decay={2} // Lumină care scade rapid cu distanța
      />

      {/* DirectionalLight pentru umbre dramatice */}
      <directionalLight
        color="#565656"
        intensity={5}
        position={[5, 10, 5]}
        castShadow // Pentru umbre mai clare
        shadow-mapSize-width={1024} // Rezoluție mai mare a umbrelor
        shadow-mapSize-height={1024}
      />
      
      {/* Setarea controalelor */}
      <OrbitControls enableZoom={false} enableRotate={false} />
    </>
  );
}

function App() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollFraction = scrollY / maxScroll;
      setScrollProgress(scrollFraction);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ height: '200vh' }}>
      <Canvas
        shadows // Activăm umbrele pentru efecte dramatice
        camera={{ position: [2, 2, 5] }}
      >
        <Scene scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}

export default App;