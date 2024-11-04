// src/Model.js
import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Modell() {
  // Încarcă modelul folosind calea relativă din `public`
  const gltf = useGLTF('/alien_glass_material_test.glb', true);

  return <primitive object={gltf.scene} />;
}