import React, { useState } from 'react';
import { useInView, motion } from "framer-motion";
import Link from "next/link";

const ButtonRM = ({ onClick, children }) => {
  const ref = React.createRef();
  const isInView = useInView(ref);

  const [hoverD, setHoverD] = useState(false);
  return (
    <motion.div
      ref={ref}
      onHoverStart={() => setHoverD(true)}
      onHoverEnd={() => setHoverD(false)}
      onClick={onClick}
      // className="absolute flex flex-row w-44 h-14 p-2 bg-white text-black justify-center overflow-hidden items-center playwrite-pe-f1 mt-10 border-2 border-black rounded-2xl bottom-10 right-5 cursor-pointer"
      className="flex h-14 justify-center items-center mx-auto sm:mx-0 sm:mt-auto sm:ml-auto w-44 bg-black rounded-xl bottom-0 playwrite-pe-f1 overflow-hidden"
      initial={{ x: -0.1, width: 0 }}
      animate={
        isInView
          ? [
              {
                width: 176,
                transition: {
                  duration: 0.5,
                },
              },
              {
                x: [0, -0.1], // animate x infinitely
                transition: {
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              },
            ]
          : { x: -10, transition: { duration: 0.1 } }
      }
    >
      <motion.div
        className=" absolute -left-10 -bottom-10 bg-green-950 rounded-full h-1 w-1 border-2 border-black -z-10"
        initial={{ height: 0, width: 0, opacity: 1 }}
        animate={
          hoverD
            ? {
                height: 210,
                width: 290,
                opacity: 1,
                transition: { duration: 0.7 },
              }
            : { height: 0, width: 0, opacity: 1 }
        }
      ></motion.div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: 0.5 },
        }}
        className="text-white"
      >
        {children}
      </motion.span>
    </motion.div>
  );
};

export default ButtonRM;
