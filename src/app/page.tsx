"use client";
import Section01 from "./(route)/Section01";
import { useScroll } from "framer-motion";
import Section02 from "./(route)/Section02";

export default function Home() {
  const { scrollYProgress } = useScroll();

  return (
    <>
      <Section01 scrollYProgress={scrollYProgress} />
      <Section02 scrollYProgress={scrollYProgress} />
    </>
  );
}
