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
          <Employee />
        </div>
      </div>
    </div>
  );
}

const Employee = () => {
  const [query, setQuery] = useState("");
  const [employee, setEmployee] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [showClientInfo, setShowClientInfo] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState({});

  const handleButtonClick = (mployee) => {
    setShowClientInfo(true);
    setSelectedEmployee(mployee);
  };

  const handleCloseClientInfo = () => {
    setShowClientInfo(false);
  };

  const fetchEmployee = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/Employee/?q=${query}`
      );
      setEmployee(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [query]);

  const handleDeleteEmployee = (id) => {
    setDeletingId(id);
    console.log(deletingId)
    fetch(`http://localhost:8000/api/employee/${id}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Update the employee state
        setEmployee((prevEmployee) =>
          prevEmployee.filter((emp) => emp.id !== id)
        );
        setDeletingId(null);
        console.log(employee)
      })
      .catch((error) => console.error(error));
    console.log(id);
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div className="h-full w-full p-5 overflow-scroll">
      <div className="h-full w-full rounded-2xl border-2 border-black overflow-scroll p-6">
        <div>
          <input
            type="search"
            value={query}
            onChange={handleSearch}
            placeholder="Search Employee"
            className="sticky top-0 h-12 w-full sm:w-2/5 rounded-xl bg-black p-2"
          />
          <div className="text-white text-3xl my-12">Employees:</div>
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
            {employee.map((mployee) => (
              <motion.li
                key={employee.id}
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
                <span className="flex w-100% sm:w-2/6 md:text-2xl">
                  {mployee.name}&nbsp;{mployee.prename}
                </span>
                &nbsp;
                <div className="flex h-12 w-full px-5 items-center">
                  <button
                    onClick={() => handleDeleteEmployee(mployee.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-1 rounded playwrite-pe-f1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleButtonClick(mployee)}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 mx-1 rounded playwrite-pe-f1"
                  >
                    more
                  </button>
                </div>
              </motion.li>
            ))}
          </motion.ul>
          <button
            onClick={() => console.log("Button clicked")}
            className="flex ml-auto bg-green-900 hover:bg-green-800 justify-center items-center h-12 w-full md:w-1/6 rounded-xl playwrite-pe-f1"
          >
            Submit Hours Worked
          </button>
        </div>
      </div>
      {showClientInfo && (
        <Info
          employee={selectedEmployee}
          handleCloseClientInfo={handleCloseClientInfo}
        />
      )}
    </div>
  );
};

const Info = ({employee, handleCloseClientInfo}) => {
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gradient-to-bkt text-black z-50 flex justify-center items-center"
      onClick={handleCloseClientInfo}
    >
      <motion.div className=" relative h-[90vh] w-[90vw] bg-neutral-900 rounded-3xl p-5">
        <div className="h-full w-full rounded-2xl border-2 border-black p-5 overflow-scroll">
          <div className="text-white text-3xl h-full w-full">
            <span className=" sticky top-0 playwrite-pe-f1">
              {employee.prename} {employee.name}:
            </span>
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
              initial="hidden"
              animate="show"
              className="h-full w-full min-h-min container grid md:grid-cols-2 gap-4 p-3 justify-center items-center"
            >
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
                class="flex relative item p-4 border-2 border-black rounded-2xl items-center"
              >
                0{employee.phone}
                <div className=" absolute max-h-min max-w-min bg-neutral-900 -top-4 text-lg">
                  N°phon
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
                class="flex relative item p-4 border-2 border-black rounded-2xl items-center"
              >
                {employee.hour}H
                <div className=" absolute max-h-min max-w-min bg-neutral-900 -top-4 text-lg">
                  hour
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
                class="flex relative item p-4 border-2 border-black rounded-2xl items-center"
              >
                {employee.salary}DA
                <div className=" absolute max-h-min max-w-min bg-neutral-900 -top-4 text-lg">
                  salary
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
                class="flex relative item p-4 border-2 border-black rounded-2xl items-center"
              >
                {employee.hourjob}H
                <div className=" absolute max-h-min max-w-min bg-neutral-900 -top-4 text-lg">
                  hour&nbsp;job
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
                class="flex relative item p-4 border-2 border-black rounded-2xl items-center"
              >
                {employee.salary_per_hour}DA/H
                <div className=" absolute max-h-min max-w-min bg-neutral-900 -top-4 text-lg">
                  salary&nbsp;per&nbsp;hour
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
                class="flex relative item p-4 border-2 border-black rounded-2xl items-center"
              >
                {employee.card}
                <div className=" absolute max-h-min max-w-min bg-neutral-900 -top-4 text-lg">
                  N°card
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};