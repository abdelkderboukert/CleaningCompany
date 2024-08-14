"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import home from "../home/page";
import test from "./test";
import ButtonRM from "./ButtonRM";

export default function HomePage() {
  // const [error, setError] = useState(null);
  // const data = [
  //   { id: "1", hour: 2 },
  //   { id: "2", hour: 3 },
  //   { id: "3", hour: 1 },
  //   { id: "4", hour: 4 },
  // ];
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("http://127.0.0.1:8000/api/hourjob/", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       });
  //       const responseData = await response.json();
  //       console.log(responseData);
  //       // Handle success
  //     } catch (error) {
  //       setError(error.message);
  //     }
  //   };
  //   fetchData();
  // }, [data]);
  return (
    <div className="h-dvh w-dvw p-5">
      <div className=" relative flex  flex-col h-full w-full bg-p1 rounded-3xl">
        <div className=" w-full max-h-14">
          <motion.div
            className="mx-auto h-14 w-1/2 bg-black rounded-b-3xl"
            initial={{ width: 0 }}
            animate={{ width: "50%" }}
            transition={{ duration: 1 }}
          ></motion.div>
          <motion.div
            className=" absolute h-5 w-5 top-0 bg-transparent rounded-tr-3xl"
            style={{
              marginLeft: "calc( 25% - 20px )",
              boxShadow: "5.5px -5.5px black",
            }}
            initial={{ marginLeft: "calc( 50% - 20px )" }}
            animate={{ marginLeft: "calc( 25% - 20px )" }}
            transition={{ duration: 1 }}
          />
          <motion.div
            className=" absolute h-5 w-5 top-0 bg-transparent rounded-tl-3xl"
            style={{
              marginLeft: "75%",
              boxShadow: "-6px -6px black",
            }}
            initial={{ marginLeft: "calc( 50% - 20px )" }}
            animate={{ marginLeft: "calc( 75% )" }}
            transition={{ duration: 1 }}
          />
        </div>
        <div className="flex flex-col h-full w-full p-10">
          <div className="flex w-max h-max mt-6 justify-center items-center mx-auto playwrite-pe-f1 text-2xl sm:text-5xl lg:text-7xl text-white">
            company name
          </div>
          <div className="flex w-3/5 h-max mt-5 justify-center items-center mx-auto text-zinc-600 text-center">
            just some bla bla bla about the company and how is the contene or
            the service that he giv , i just try some word to check if i can do
            it{" "}
          </div>
          <ButtonRM>
            <Link href="/home">Go to Home</Link>
          </ButtonRM>
          {/* <div className="flex h-14 justify-center items-center mx-auto sm:mx-0 sm:mt-auto sm:ml-auto w-44 bg-black rounded-xl bottom-0 playwrite-pe-f1 ">
            <Link href="/home">Go to Home</Link>
          </div> */}
        </div>
        {/* <div className="text-red-700 bg-black">HomePage</div>
        <h1>Home Page</h1>
        <Link href="/home">Go to Home</Link> */}
      </div>
    </div>
  );
}
