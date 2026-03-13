"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

export function TypingEffect({ text }: { text: string }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      duration: 5.5, // Adjust duration as needed
      ease: "easeInOut",
      onComplete: () => setComplete(true),
    });
    return controls.stop;
  }, [text, count]); // Added dependencies for stability

  return (
    <span className="font-mono text-emerald-500">
      <motion.span>{displayText}</motion.span>
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        className="inline-block w-[2px] h-[1.2em] ml-1 bg-emerald-500 align-middle"
      />
    </span>
  );
}