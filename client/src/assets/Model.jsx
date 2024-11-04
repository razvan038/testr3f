// src/Model.js
import React from 'react';
import { useGLTF } from '@react-three/drei';

export function Model() {
  // Încarcă modelul folosind calea relativă din `public`
  const gltf = useGLTF('/animatie.glb', true);

  return <primitive object={gltf.scene} />;
}
