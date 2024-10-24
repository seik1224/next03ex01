import React, { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Bulbasaur } from "@/components/bulbasaur";
import { Squirtle } from "@/components/squirtle";
import { Charmander } from "@/components/charmander";

export function Model() {
  const three = useThree();

  // useEffect(() => {
  //   three.camera.position.set(-5, 0, 25);
  // }, [three.camera]);

  return (
    <>
      <Bulbasaur position={[0, 0, 20]} scale={0.1} />
      <Squirtle position={[7, 0, 10]} scale={0.1} />
      <Charmander position={[-10, 0, 0]} scale={0.1} />
    </>
  );
}
