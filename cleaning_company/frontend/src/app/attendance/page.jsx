"use client";
import React from "react";
import NavBar from "../component/NavBar";
import SearchBar from "../component/searchBar";

export default function page() {
  return (
    <div className=" fixed h-screen w-full bg-black overflow-auto text-neutral-50">
      <div className="h-dvh w-dvw p-5">
        <div className=" relative flex  flex-col h-full w-full rounded-3xl overflow-auto bg-neutral-900">
          <NavBar />
          <Attendance />
        </div>
      </div>
    </div>
  );
}

const Attendance = () => {
  return (
    <>
      <div className="h-full w-full p-5 overflow-scroll">
        <div className="h-full w-full rounded-2xl border-2 border-black overflow-scroll p-6">
          <SearchBar />
        </div>
      </div>
    </>
  );
};
