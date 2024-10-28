import React, { useEffect, useRef, useState } from "react";
import { useFrame, useGraph } from "@react-three/fiber";
import { useAnimations, useGLTF, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { GLTF, SkeletonUtils } from "three-stdlib";
import { MotionValue } from "framer-motion";

type ActionName =
  | "AttackTackle"
  | "Faint"
  | "Happy"
  | "Hurt"
  | "Idle"
  | "idle2"
  | "Run"
  | "ThunderBolt"
  | "thurnderBoltChargeContinue"
  | "WalkStanding";

interface GLTFAction extends THREE.AnimationClip {
  name: ActionName;
}

type GLTFResult = GLTF & {
  nodes: {
    pikachu_1: THREE.SkinnedMesh;
    pikachu_2: THREE.SkinnedMesh;
    pikachu_3: THREE.SkinnedMesh;
    PG_root: THREE.Bone;
  };
  materials: {
    mouth: THREE.MeshStandardMaterial;
    eye: THREE.MeshStandardMaterial;
    body: THREE.MeshStandardMaterial;
  };
  animations: GLTFAction[];
};

interface PikachuProps {
  animation: ActionName;
  position: MotionValue<THREE.Vector3>;
}

const Pikachu = ({ animation, position }: PikachuProps) => {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF("/models/Pikachu.glb") as GLTFResult;
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone) as GLTFResult;
  const { actions } = useAnimations(animations, group);

  const [currentAnimation, setCurrentAnimation] =
    useState<ActionName>("WalkStanding");

  // 텍스처 로드
  // const bodyTexture = useTexture("/tex/PikachuBodyTex.jpg");
  // const eyeTexture = useTexture("/tex/PikachuEyeTextureAtlas.png");
  // const mouthTexture = useTexture("/tex/PikachuMouthTextureAtlas.png");

  // useEffect(() => {
  //   // 텍스처 적용
  //   scene.traverse((child) => {
  //     if (child instanceof THREE.Mesh) {
  //       if (child.material.name === "body") {
  //         child.material.map = bodyTexture;
  //       } else if (child.material.name === "eye") {
  //         child.material.map = eyeTexture;
  //       } else if (child.material.name === "mouth") {
  //         child.material.map = mouthTexture;
  //       }
  //     }
  //   });
  // }, [scene, bodyTexture, eyeTexture, mouthTexture]);

  useEffect(() => {
    // 이전 애니메이션 정지
    Object.values(actions).forEach((action) => action?.stop());

    // 새 애니메이션 시작
    const action = actions[animation];
    if (action) {
      action.reset().fadeIn(0.5).play();
    }

    return () => {
      if (action) {
        action.fadeOut(0.5);
      }
    };
  }, [animation, actions]);

  useFrame(() => {
    if (group.current) {
      group.current.position.copy(position.get());
    }
  });

  return (
    <group ref={group} dispose={null}>
      <group name="Scene">
        <group name="Pikachu" rotation={[Math.PI / 2, 0, 0]} scale={4.232}>
          <primitive object={nodes.PG_root} />
          <group name="pikachu">
            <skinnedMesh
              name="pikachu_1"
              geometry={nodes.pikachu_1.geometry}
              material={materials.mouth}
              skeleton={nodes.pikachu_1.skeleton}
            />
            <skinnedMesh
              name="pikachu_2"
              geometry={nodes.pikachu_2.geometry}
              material={materials.eye}
              skeleton={nodes.pikachu_2.skeleton}
            />
            <skinnedMesh
              name="pikachu_3"
              geometry={nodes.pikachu_3.geometry}
              material={materials.body}
              skeleton={nodes.pikachu_3.skeleton}
            />
          </group>
        </group>
      </group>
    </group>
  );
};

export default Pikachu;

useGLTF.preload("/models/Pikachu.glb");
