"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [employee, setEmployee] = useState([]);
  const [hoursWorked, setHoursWorked] = useState([]); // store hours worked for each employee

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

  const handleHoursChange = (event, employeeId) => {
    const hours = event.target.value;
    setHoursWorked((prevHours) => ({
      ...prevHours,
      [employeeId]: {
        date: new Date().toISOString().slice(0, 10),
        employee: employeeId,
        hours: hours === "" ? null : hours,
        notes: prevHours[employeeId] ? prevHours[employeeId].notes : "",
      },
    }));
  };

  const handleNotesChange = (event, employeeId) => {
    const notes = event.target.value;
    setHoursWorked((prevHours) => ({
      ...prevHours,
      [employeeId]: {
        date: new Date().toISOString().slice(0, 10),
        employee: employeeId,
        hours: prevHours[employeeId] ? prevHours[employeeId].hours : null,
        notes,
      },
    }));
  };

  const handleResetHours = (employeeId) => {
    setHoursWorked((prevHours) => ({
      ...prevHours,
      [employeeId]: {
        date: new Date().toISOString().slice(0, 10),
        employee: employeeId,
        hours: 0,
        notes: prevHours[employeeId] ? prevHours[employeeId].notes : "",
      },
    }));
  };

  const handleSubmit = () => {
    // submit the hours worked for each employee
    console.log(hoursWorked);
    fetch("http://127.0.0.1:8000/api/hourjob/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hoursWorked),
    });
    setHoursWorked([])
    // you can make an API call to submit the hours worked here
  };

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={handleSearch}
        placeholder="Search Employee"
        className="sticky top-0 h-12 w-full sm:w-2/5 rounded-xl bg-black p-2"
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
            <div className="flex h-12 w-full px-5 items-center">
              <input
                type="number"
                value={
                  hoursWorked[mployee.id] ? hoursWorked[mployee.id].hours : ""
                }
                onChange={(event) => handleHoursChange(event, mployee.id)}
                placeholder="Enter hours worked"
                className="bg-black h-full w-1/4 rounded-xl px-3 mr-5"
              />
              <input
                type="text"
                value={
                  hoursWorked[mployee.id] ? hoursWorked[mployee.id].notes : ""
                }
                onChange={(event) => handleNotesChange(event, mployee.id)}
                placeholder="Enter notes"
                className="bg-black h-full w-1/4 rounded-xl px-3 mr-5"
              />
              <button
                onClick={() => handleResetHours(mployee.id)}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-1 rounded playwrite-pe-f1"
              >
                Reset Hours
              </button>
              <button
                onClick={() => handleResetHours(mployee.id)}
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 mx-1 rounded playwrite-pe-f1"
              >
                more
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button
        onClick={handleSubmit}
        className="flex ml-auto bg-green-900 hover:bg-green-800 justify-center items-center h-12 w-full md:w-1/6 rounded-xl playwrite-pe-f1"
      >
        Submit Hours Worked
      </button>
    </div>
  );
}