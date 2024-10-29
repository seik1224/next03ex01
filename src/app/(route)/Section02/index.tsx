import React, { useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { motion, useTransform, MotionValue, useScroll } from "framer-motion";
import * as THREE from "three";
import { Model } from "./Model";
import { Environment } from "@react-three/drei";

const CameraController = ({
  position,
}: {
  position: MotionValue<THREE.Vector3>;
}) => {
  const { camera } = useThree(); // 카메라 객체 접근

  useFrame(() => {
    const currentPosition = position.get();
    camera.position.lerp(currentPosition, 0.05);
  });

  return null; // 타입스크립트 에러 방지
};

const Section02 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const sectionProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const cameraPosition = useTransform(
    sectionProgress,
    [0, 0.23, 0.43, 0.56, 0.76, 0.9, 1],
    [
      new THREE.Vector3(0, 0, 30),
      new THREE.Vector3(0, 0, 25),
      new THREE.Vector3(0, 0, 25),
      new THREE.Vector3(7, 0, 15),
      new THREE.Vector3(7, 0, 15),
      new THREE.Vector3(-10, 0, 5),
      new THREE.Vector3(-10, 0, 5),
    ]
  );

  const backgroundColor = useTransform(
    sectionProgress,
    [0, 0.23, 0.43, 0.56, 0.76, 0.9, 1],
    [
      "#1c6c00",
      "#1c6c00",
      "#1c6c00",
      "#003b8b",
      "#003b8b",
      "#8b0000",
      "#8b0000",
    ]
  );

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     console.log(scrollYProgress.get());
  //   });
  // }, [scrollYProgress]);
  return (
    <motion.section
      ref={ref}
      className="h-[300vh] relative "
      style={{ backgroundColor }}
    >
      <div className="sticky top-0 h-screen  w-full overflow-hidden">
        <Canvas>
          <CameraController position={cameraPosition} />
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={3} />
          <Model />
        </Canvas>
      </div>
      <div className="absolute top-0 left-0 w-full h-[300vh] pointer-events-none">
        <motion.div
          className="w-full h-screen flex items-center justify-center  pt-[60vh]"
          style={{
            opacity: useTransform(
              sectionProgress,
              [0.23, 0.33, 0.43, 0.53],
              [0, 1, 1, 0]
            ),
          }}
        >
          <div className="flex flex-col justify-center items-center text-center max-w-[400px] px-4 pt-4 pb-6 rounded-3xl border border-green-300 bg-green-900 text-white">
            <h2 className="text-2xl font-bold mb-4">이상해씨</h2>
            <p className="mb-2 text-green-300">
              이상해씨 - 이상해풀 - 이상해꽃
            </p>
            <p className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
              velit quidem saepe dignissimos provident enim eligendi voluptates,
              quo id expedita,
            </p>
          </div>
        </motion.div>
        <motion.div
          className="w-full h-screen flex items-center justify-center  pt-[60vh]"
          style={{
            opacity: useTransform(
              sectionProgress,
              [0.56, 0.66, 0.76, 0.86],
              [0, 1, 1, 0]
            ),
          }}
        >
          <div className="flex flex-col justify-center items-center text-center max-w-[400px] px-4 pt-4 pb-6 rounded-3xl border border-blue-300 bg-blue-950 text-white">
            <h2 className="text-2xl font-bold mb-4">꼬부기</h2>
            <p className="mb-2 text-blue-300">꼬부기 - 어니부기 - 거북왕</p>
            <p className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
              velit quidem saepe dignissimos provident enim eligendi voluptates,
              quo id expedita,
            </p>
          </div>
        </motion.div>
        <motion.div
          className="w-full h-screen flex items-center justify-center  pt-[60vh]"
          style={{
            opacity: useTransform(sectionProgress, [0.9, 1], [0, 1]),
          }}
        >
          <div className="flex flex-col justify-center items-center text-center max-w-[400px] px-4 pt-4 pb-6 rounded-3xl border border-red-300 bg-red-950 text-white">
            <h2 className="text-2xl font-bold mb-4">파이리</h2>
            <p className="mb-2 text-red-300">파이리 - 리자드 - 리자몽</p>
            <p className="text-xs">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
              velit quidem saepe dignissimos provident enim eligendi voluptates,
              quo id expedita,
            </p>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Section02;
