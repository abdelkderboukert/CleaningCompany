"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
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
    fetchEmployee();
  }, [query]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={handleSearch}
        placeholder="Search Employee"
        className=" sticky top-0 h-12 w-full sm:w-2/5 rounded-xl bg-black p-2"
      />
      <div className="text-white text-3xl my-12">Employees:</div>
      <ul>
        {employee.map((mployee) => (
          <li
            key={mployee.id}
            className="felx min-h-16 max-h-min w-full bg-neutral-800 m-3 rounded-xl p-5 felx-row"
          >
            <span className="flex w-100% sm:w-2/6 md:text-2xl">
              {mployee.name}&nbsp;{mployee.prename}
            </span>
            &nbsp;
            <div className="flex h-12 w-full bg-slate-600">
              gfgnsd
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
