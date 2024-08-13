"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import home from "../home/page";
import test from "./test";

export default function HomePage() {
  const [error, setError] = useState(null);
  const data = [
    { id: "1", hour: 2 },
    { id: "2", hour: 3 },
    { id: "3", hour: 1 },
    { id: "4", hour: 4 },
  ];
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/hourjob/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        console.log(responseData);
        // Handle success
      } catch (error) {
        setError(error.message);
      }
    };
    fetchData();
  }, [data]);
  return (
    <div className="h-dvh w-dvw p-5">
      <div className=" relative flex h-full w-full bg-white rounded-3xl">
        <motion.div
          className="mx-auto h-14 w-1/2 bg-black rounded-b-3xl"
          initial={{ width: 0 }}
          animate={{ width: "50%" }}
          transition={{ duration: 1 }}
        ></motion.div>
        <motion.div
          className=" absolute h-5 w-5 bg-transparent rounded-tr-3xl"
          style={{
            marginLeft: "calc( 25% - 20px )",
            boxShadow: "5.5px -5.5px black",
          }}
          initial={{ marginLeft: "calc( 50% - 20px )" }}
          animate={{ marginLeft: "calc( 25% - 20px )" }}
          transition={{ duration: 1 }}
        />
        <motion.div
          className=" absolute h-5 w-5 bg-transparent rounded-tl-3xl"
          style={{
            marginLeft: "75%",
            boxShadow: "-6px -6px black",
          }}
          initial={{ marginLeft: "calc( 50% - 20px )" }}
          animate={{ marginLeft: "calc( 75% )" }}
          transition={{ duration: 1 }}
        />
        
        {/* <div className="text-red-700 bg-black">HomePage</div>
        <h1>Home Page</h1>
        <Link href="/home">Go to Home</Link> */}
      </div>
    </div>
  );
}
