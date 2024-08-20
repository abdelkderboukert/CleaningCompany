"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import NavBar from "../component/NavBar";

export default function page() {
  return (
    <div className=" fixed h-screen w-full bg-black overflow-auto text-neutral-50">
      <div className="h-dvh w-dvw p-5">
        <div className=" relative flex  flex-col h-full w-full rounded-3xl overflow-auto bg-neutral-900">
          <NavBar />
          <Tarif/>
        </div>
      </div>
    </div>
  );
}

const Tarif = () => {
    const [tarifs, setTarif]=useState([])
    useEffect(() => {
      fetch("http://localhost:8000/api/tarif/")
        .then((response) => response.json())
        .then((data) => setTarif(data));
    }, []);
    return (
      <div className="h-full w-full p-5 overflow-scroll">
        <div className="h-full w-full rounded-2xl border-2 border-black overflow-scroll p-6">
          <div className="flex text-white text-2xl md:text-3xl my-12 w-full">
            Tarif de mois:
            <button className=" sticky top-0 ri left-0 bg-neutral-950 w-2/12 h-14 ml-auto rounded-2xl">
              hh
            </button>
          </div>

          <motion.ul
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.25,
                },
              },
            }}
            initial="hidden"
            animate="show"
            className="container grid md:grid-cols-2 gap-4"
          >
            {tarifs.map((tarif) => (
              <motion.li
                key={tarif.id}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.25,
                    },
                  },
                }}
                className="felx min-h-16 max-h-min w-full bg-neutral-800 m-3 rounded-xl p-5 felx-row transition-opacity"
              >
                <span className="flex w-100% sm:w-2/6 md:text-3xl">
                  {tarif.item}&nbsp;
                </span>
                <span className="text-neutral-500">
                  Prix:{tarif.monto}&nbsp;{tarif.date}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    );
}
