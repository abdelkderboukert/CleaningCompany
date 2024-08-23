import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function MoreInfo({ employee, handleCloseClientInfo }) {
  const [attendances, setAttendance] = useState([])
  console.log(`http://127.0.0.1:8000/api/attendance/list/${employee.id}/`);
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/attendance/?q=${employee.id}`
        );
        setAttendance(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEmployee();
  }, [employee.id]);
  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-gradient-to-bkt text-black z-50 flex justify-center items-center"
      onClick={handleCloseClientInfo}
    >
      <motion.div className=" relative h-[90vh] w-[90vw] bg-neutral-900 rounded-3xl p-5">
        <div className="h-full w-full rounded-2xl border-2 border-black p-5 overflow-scroll">
          <div className="text-white text-3xl mb-12">
            <span className=" sticky top-0 playwrite-pe-f1">
              {employee.prename} {employee.name}:
            </span>
            <ul>
              {attendances.map((attendance) => (
                <li
                  key={attendance.id}
                  className=" flex min-h-16 max-h-min w-full bg-neutral-800 m-3 rounded-xl p-5 flex-row overflow-auto"
                >
                  <div className="flex max-h-min min-h-16 w-1/3 justify-center items-center flex-col p-2">
                    date
                    <span className="text-5xl my-2">{attendance.date}</span>
                  </div>
                  <div className="flex max-h-min min-h-16 w-1/3 justify-center items-center flex-col p-2">
                    Hours
                    <span className="text-5xl my-2">{attendance.hours}H</span>
                  </div>
                  <div className="flex max-h-min min-h-16 w-1/3 justify-center items-center flex-col p-2">
                    <span className="text-2xl my-2">{attendance.notes}H</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
