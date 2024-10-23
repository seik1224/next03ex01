import React, { useRef, useEffect } from "react";
import { Circle, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { MotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";
import * as THREE from "three";
import { Bulbasaur } from "@/components/bulbasaur";
import { Squirtle } from "@/components/squirtle";
import { Charmander } from "@/components/charmander";

export function Model() {
  const group = useRef();
  const { nodes, materials, scene, animations } = useGLTF("/models/model.glb");
  const three = useThree();
  console.log(scene);

  useEffect(() => {
    three.camera.position.set(-5, 0, 25);
  }, [three.camera]);

  return (
    <>
      <Bulbasaur position={[0, 0, 20]} scale={0.1} />
      <Squirtle position={[7, 0, 10]} scale={0.1} />
      <Charmander position={[-10, 0, 0]} scale={0.1} />
    </>
  );
}

useGLTF.preload("/models/model.glb");
