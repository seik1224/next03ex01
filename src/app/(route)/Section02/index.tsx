import React, { useRef, useState, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { motion, useTransform, MotionValue, useScroll } from "framer-motion";
import { Model } from "./Model";
import { PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

interface Section02Props {
  scrollYProgress: MotionValue<number>;
}

// const Scene = ({
//   scrollYProgress,
// }: {
//   scrollYProgress: MotionValue<number>;
// }) => {
//   const { camera } = useThree();
//   const [currentModel, setCurrentModel] = useState(0);
//   const groupRef = useRef<THREE.Group>();

//   const modelPositions = [
//     new THREE.Vector3(-5, 0, 20),
//     new THREE.Vector3(7, 0, 10),
//     new THREE.Vector3(-10, 0, 0),
//   ];

//   useEffect(() => {
//     const handleWheel = (event: WheelEvent) => {
//       if (event.deltaY > 0) {
//         setCurrentModel((prev) => (prev + 1) % modelPositions.length);
//       } else {
//         setCurrentModel(
//           (prev) => (prev - 1 + modelPositions.length) % modelPositions.length
//         );
//       }
//     };

//     window.addEventListener("wheel", handleWheel);
//     return () => window.removeEventListener("wheel", handleWheel);
//   }, []);

//   useFrame(() => {
//     if (groupRef.current) {
//       groupRef.current.position.lerp(modelPositions[currentModel], 0.05);
//     }
//     camera.position.lerp(
//       new THREE.Vector3(
//         modelPositions[currentModel].x,
//         2,
//         modelPositions[currentModel].z + 5
//       ),
//       0.05
//     );
//   });

//   return (
//     <group ref={groupRef}>
//       {modelPositions.map((position, index) => (
//         <Model key={index} position={position} />
//       ))}
//     </group>
//   );
// };

const CameraController = ({
  position,
}: {
  position: MotionValue<THREE.Vector3>;
}) => {
  const { camera } = useThree();

  useFrame(() => {
    const currentPosition = position.get();
    camera.position.lerp(currentPosition, 0.05);
  });

  return null;
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
        <Canvas shadows>
          <CameraController position={cameraPosition} />
          <ambientLight intensity={2} />
          <Model />
        </Canvas>
      </div>
      <div className="absolute top-0 left-0 w-full h-[300vh] pointer-events-none">
        <motion.div
          className="w-full h-screen flex items-center justify-center border-4 border-green-500"
          style={{
            opacity: useTransform(sectionProgress, [0.23, 0.33], [0, 1]),
          }}
        >
          <h2 className="text-2xl font-bold">페이지 5</h2>
        </motion.div>
        <motion.div
          className="w-full h-screen flex items-center justify-center border-4 border-blue-500"
          style={{
            opacity: useTransform(sectionProgress, [0.56, 0.66], [0, 1]),
          }}
        >
          <h2 className="text-2xl font-bold">페이지 6</h2>
        </motion.div>
        <motion.div
          className="w-full h-screen flex items-center justify-center border-4 border-red-500"
          style={{
            opacity: useTransform(sectionProgress, [0.9, 1], [0, 1]),
          }}
        >
          <h2 className="text-2xl font-bold">페이지 7</h2>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Section02;
