import React from 'react'
import NavBar from '../component/NavBar';

export default function page() {
  return (
    <div className=" fixed h-screen w-full bg-black overflow-auto text-neutral-50">
      <div className="h-dvh w-dvw p-5">
        <div className=" relative flex  flex-col h-full w-full rounded-3xl overflow-auto bg-neutral-900">
          <NavBar />
          employees
        </div>
      </div>
    </div>
  );
}
