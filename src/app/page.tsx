"use client";
import { useState, useEffect } from "react";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"; // 예전버전
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"; // 최신버전에서 권장 : npm i --save-dev @types/three
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader.js";
import Loading from "@/components/Loading";
import Lenis from "@studio-freight/lenis";
import Section01 from "./(route)/Section01";
import Section02 from "./(route)/Section02";

const modelPaths = [
  "/models/Pika.glb",
  "/models/bulbasaur.glb",
  "/models/charmander.glb",
  "/models/squirtle.glb",
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  // const [loadedModels, setLoadedModels] = useState<GLTF[]>([]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const loader = new GLTFLoader();
    console.log(loader);
    let loadedCount = 0;

    const loadModel = (path: string) => {
      return new Promise<GLTF>((resolve, reject) => {
        loader.load(
          path,
          (gltf) => {
            loadedCount++;
            setProgress((loadedCount / modelPaths.length) * 100);
            console.log(`모델 로드 완료: ${path}`);
            resolve(gltf);
          },
          undefined,
          reject
        );
      });
    };

    Promise.all(modelPaths.map(loadModel))
      .then((models) => {
        // setLoadedModels(models);
        setIsLoading(false);
        console.log("모든 모델 로드 완료:", models);
      })
      .catch((error) => {
        console.error("모델 로딩 중 오류 발생:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading progress={progress} />
      ) : (
        <>
          <Section01 />
          <Section02 />
        </>
      )}
    </>
  );
}
