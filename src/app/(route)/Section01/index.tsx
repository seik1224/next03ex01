import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import {
  motion,
  MotionValue,
  useTransform,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import * as THREE from "three";
import Pikachu from "./Model";

type ActionName = "idle2" | "WalkStanding" | "Run" | "AttackTackle" | "Faint";

const Section01 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     console.log(scrollYProgress.get());
  //   });
  // }, [scrollYProgress]);

  const triggerRef = useRef<HTMLDivElement>(null);
  const sectionProgress = useTransform(scrollYProgress, [0, 0.57], [0, 1]);
  const [animation, setAnimation] = useState<ActionName>("idle2");

  const animationState = useTransform(sectionProgress, (value) => {
    if (value < 0.05) return "idle2";
    if (value < 0.25) return "WalkStanding";
    if (value < 0.5) return "Run";
    if (value < 0.75) return "AttackTackle";
    return "Faint";
  });

  useMotionValueEvent(animationState, "change", (latest) => {
    setAnimation(latest as ActionName);
  });

  const position = useTransform(
    sectionProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      new THREE.Vector3(0, -1.5, 3.5), // 매우 가까이
      new THREE.Vector3(0, 0, -5), // 멀어짐
      new THREE.Vector3(-2, 0, 0), // 왼쪽으로 이동
      new THREE.Vector3(2, 0, 0), // 오른쪽으로 이동
      new THREE.Vector3(2, 0, 0), // 마지막 위치 유지
    ]
  );

  return (
    <div ref={ref} className="h-[800vh] relative bg-yellow-400">
      <div
        ref={triggerRef}
        className="sticky top-0 h-screen w-full overflow-hidden"
      >
        <Canvas>
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} />
          <Pikachu animation={animation} position={position} />
          {/* <OrbitControls /> */}
        </Canvas>
      </div>
      <div className="absolute top-0 left-0 w-full h-[800vh] pointer-events-none">
        <motion.div
          className="h-[200vh] flex items-center justify-center"
          style={{ opacity: useTransform(sectionProgress, [0, 0.25], [1, 0]) }}
        >
          <h2 className="text-2xl font-bold">로고 섹션</h2>
        </motion.div>
        <motion.div
          className="h-[200vh] flex items-center justify-center"
          style={{
            opacity: useTransform(sectionProgress, [0.25, 0.5], [0, 1]),
          }}
        >
          <h2 className="text-2xl font-bold">텍스트 섹션 1</h2>
        </motion.div>
        <motion.div
          className="h-[200vh] flex items-center justify-center"
          style={{
            opacity: useTransform(sectionProgress, [0.5, 0.75], [0, 1]),
          }}
        >
          <h2 className="text-2xl font-bold">텍스트 섹션 2</h2>
        </motion.div>
        <motion.div
          className="h-[200vh] flex items-center justify-center"
          style={{ opacity: useTransform(sectionProgress, [0.75, 1], [0, 1]) }}
        >
          <h2 className="text-2xl font-bold">텍스트 섹션 3</h2>
        </motion.div>
      </div>
    </div>
  );
};

export default Section01;

useGLTF.preload("/models/Pikachu.glb");
