import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import {
  motion,
  useTransform,
  useMotionValueEvent,
  useScroll,
  MotionValue,
} from "framer-motion";
import * as THREE from "three";
import Pikachu from "./Model";

const CameraController = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const pivotRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (pivotRef.current) {
      pivotRef.current.add(camera);
      camera.position.set(0, 0, 5);
      camera.lookAt(0, 0, 0);
    }
  }, [camera]);

  useFrame(() => {
    const progress = scrollYProgress.get();
    if (pivotRef.current) {
      const targetPosition = new THREE.Vector3();
      let targetRotationY = 0;

      if (progress >= 0.1 && progress <= 0.2) {
        targetPosition.set(0, 1, -5);
        targetRotationY = -(Math.PI / 180) * 180;
      }

      pivotRef.current.position.lerp(targetPosition, 0.05);
      pivotRef.current.rotation.y = THREE.MathUtils.lerp(
        pivotRef.current.rotation.y,
        targetRotationY,
        0.05
      );
    }
  });

  return <group ref={pivotRef} position={[0, 0, 0]} />;
};

type ActionName = "idle2" | "WalkStanding" | "Run" | "AttackTackle" | "Faint";

const Section01 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    window.addEventListener("scroll", () => {
      console.log(scrollYProgress.get());
    });
  }, [scrollYProgress]);

  const triggerRef = useRef<HTMLDivElement>(null);
  // const sectionProgress = useTransform(scrollYProgress, [0, 0.57], [0, 1]);
  const [animation, setAnimation] = useState<ActionName>("idle2");

  const animationState = useTransform(scrollYProgress, (value) => {
    if (value < 0.05) return "idle2";
    if (value < 0.1) return "WalkStanding";
    if (value < 0.5) return "Run";
    if (value < 0.75) return "AttackTackle";
    return "Faint";
  });

  useMotionValueEvent(animationState, "change", (latest) => {
    setAnimation(latest as ActionName);
  });

  const position = useTransform(
    scrollYProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      new THREE.Vector3(0, -1.5, 3.5), // 매우 가까이
      new THREE.Vector3(0, 0, -5), // 멀어짐
      new THREE.Vector3(-2, 0, 0), // 왼쪽으로 이동
      new THREE.Vector3(-2, 0, 0), // 오른쪽으로 이동
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
          <CameraController scrollYProgress={scrollYProgress} />
          <ambientLight intensity={2} />
          <pointLight position={[10, 10, 10]} />
          <Pikachu animation={animation} position={position} />
        </Canvas>
      </div>
      <div className="absolute top-0 left-0 w-full h-[800vh] pointer-events-none">
        <motion.div className="w-full h-[200vh] flex items-start justify-center pt-[10vh]">
          <h2 className="text-2xl font-bold">
            <img
              className="max-w-[600px] w-full px-10"
              src="/logo.svg"
              alt="로고"
            />
          </h2>
        </motion.div>
        <motion.div className="w-full h-[200vh] flex items-center justify-center"></motion.div>
        <motion.div
          className="w-full h-[200vh] flex items-center justify-center px-[30px]"
          style={{
            opacity: useTransform(
              scrollYProgress,
              [0.6, 0.65, 0.65, 0.7],
              [0, 1, 1, 0]
            ),
          }}
        >
          <div className="w-[400px]"></div>
          <div className="w-[400px] text-left">
            <h2 className="text-2xl font-bold mb-4">Volt Tackle</h2>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs">위력</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index < 5 ? "bg-yellow-950" : "bg-gray-50"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">PP</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index < 3 ? "bg-yellow-950" : "bg-gray-50"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs">
              전기를 한데 모아 돌진한다. 자신도 대상에게 준 피해의 1/3만큼 반동
              피해를 받는다. 10% 확률로 상대를 마비 상태로 만든다.
            </p>
          </div>
        </motion.div>
        <motion.div
          className="w-full h-[200vh] flex items-center justify-center px-[30px]"
          style={{
            opacity: useTransform(
              scrollYProgress,
              [0.85, 0.9, 0.9, 1],
              [0, 1, 1, 0]
            ),
          }}
        >
          <div className="w-[400px] text-left">
            <h2 className="text-2xl font-bold mb-4">Faint</h2>
            <div className="flex items-center gap-4 mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs">위력</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index < 3 ? "bg-yellow-950" : "bg-gray-50"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs">PP</span>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index < 2 ? "bg-yellow-950" : "bg-gray-50"
                      }`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs">
              방어나 판별 등을 하고 있는 상대에게 공격할 수 있다. 방어 효과를
              해제시킨다.
            </p>
          </div>
          <div className="w-[400px]"></div>
        </motion.div>
      </div>
    </div>
  );
};

export default Section01;

useGLTF.preload("/models/Pikachu.glb");
