import React, { useRef, useEffect } from "react";
import { Circle, useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { MotionValue, useTransform } from "framer-motion";
import { motion } from "framer-motion-3d";
import * as THREE from "three";

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
      <Circle position={[-5, 0, 20]}>
        <meshStandardMaterial color={"#00ff00"} />
      </Circle>
      <Circle position={[7, 0, 10]}>
        <meshStandardMaterial color={"#0000ff"} />
      </Circle>
      <Circle position={[-10, 0, 0]}>
        <meshStandardMaterial color={"#ff00ff"} />
      </Circle>
    </>
  );
}

useGLTF.preload("/models/model.glb");
