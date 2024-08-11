"use client";
import { useEffect, useState } from "react";

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
    <>
      <div className="text-red-700 bg-black h-full w-screen">HomePage</div>
      <details
        className=" border-2 border-black bg-black text-white rounded-xl h-48 w-60"
        open
      >
        <summary>about1</summary>i want to help u
      </details>
    </>
  );
}
