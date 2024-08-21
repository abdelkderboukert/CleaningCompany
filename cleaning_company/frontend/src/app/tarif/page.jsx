"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FiPlus, FiTrash } from "react-icons/fi";
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
    const [iSshow, setISshow] = useState(false);
    const [NewTarif, setNewTarif] = useState({
      item: "",
      monto: 0,
      date: new Date().toISOString().slice(0, 10),
    });
    useEffect(() => {
      fetch("http://localhost:8000/api/tarif/")
        .then((response) => response.json())
        .then((data) => setTarif(data));
    }, []);

    const handelShow = () =>{
      setISshow(true)
    }

    const handlSubmit = (event) =>{
      event.preventDefault();
      fetch("http://localhost:8000/api/tarif/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(NewTarif),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error(error));

      setNewTarif({ item: "", monto: 0 }); // Reset NewTarif state
      setISshow(false); // Hide the form
    }
     
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1; // Get the current month (1-12)

    const filteredTarifs = tarifs.filter((tarif) => {
      const tarifDate = tarif.date.split("-"); // Split the date string into an array
      const tarifYear = parseInt(tarifDate[0], 10); // Extract the year from the array (index 0)
      const tarifMonth = parseInt(tarifDate[1], 10); // Extract the month from the array (index 1)
      return tarifYear === currentYear && tarifMonth === currentMonth; // Filter tariffs with the same year and month as the current date
    });

    return (
      <div className="h-full w-full p-5 overflow-scroll">
        <div className="h-full w-full rounded-2xl border-2 border-black overflow-scroll p-6">
          <div className="flex text-white text-2xl md:text-3xl my-12 w-full">
            Tarif de mois:
            <button
              onClick={handelShow}
              className=" sticky top-0 ri left-0 bg-neutral-950 w-2/12 h-14 ml-auto rounded-2xl"
            >
              add
            </button>
          </div>
          {iSshow && (
            <motion.form
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              onSubmit={(e) => {
                handlSubmit(e);
              }}
              className="w-full h-full min-h-min bg-neutral-800 shadow-md shadow-black rounded-xl p-2 mb-4"
            >
              <h1 className="md:text-3xl mb-3">Add&nbsp;new&nbsp;tarif:</h1>
              <div className="grid md:grid-cols-2 gap-4">
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.25,
                      },
                    },
                  }}
                  class="flex relative item border-2 border-black rounded-2xl items-center"
                >
                  <input
                    type="text"
                    name="item"
                    className="h-full bg-neutral-800 p-4 w-full rounded-2xl"
                    onChange={(e) => {
                      setNewTarif({
                        ...NewTarif,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                  <div className=" absolute max-h-min ml-4 max-w-min bg-neutral-800 -top-4 text-lg">
                    item
                  </div>
                </motion.div>
                <motion.div
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.25,
                      },
                    },
                  }}
                  class="flex relative item border-2 border-black rounded-2xl items-center"
                >
                  <input
                    type="number"
                    name="monto"
                    min={0}
                    className="h-full bg-neutral-800 w-full rounded-2xl"
                    onChange={(e) => {
                      setNewTarif({
                        ...NewTarif,
                        [e.target.name]: e.target.value,
                      });
                    }}
                  />
                  <div className=" absolute max-h-min max-w-min ml-4 bg-neutral-800 -top-4 text-lg">
                    monto
                  </div>
                </motion.div>
              </div>
              <div className="mt-1.5 flex items-center justify-end gap-1.5">
                <button
                  onClick={() => setISshow(false)}
                  className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-50"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded bg-neutral-50 px-3 py-1.5 text-xs text-neutral-950 transition-colors hover:bg-neutral-300"
                >
                  <span>Add</span>
                  <FiPlus />
                </button>
              </div>
            </motion.form>
          )}
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
            {filteredTarifs.map((tarif) => (
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
                className="felx min-h-16 max-h-min w-full shadow-black shadow-md bg-neutral-800 m-3 rounded-xl p-5 felx-row transition-opacity"
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
