"use client";

import { SubmitEvent, useState } from "react";

export default function AddJobForm({ onAdd }: { onAdd: (company: string, role: string) => void }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd(company, role);
    setCompany("");
    setRole("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-wrap gap-2 justify-self-center bg-[#162938]/60 px-10 py-4 rounded-lg"
    >
      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company"
        required
        className="rounded-lg px-4 text-white outline-none border-2 border-gray-200 mr-4"
      />
      <input
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role"
        required
        className="rounded-lg px-4 text-white outline-none border-2 border-gray-200 mr-4"
      />
      <button
        type="submit"
        className="rounded-md bg-white/60 backdrop-blur-xs px-6 py-2 text-[#162938] font-extralight cursor-pointer hover:shadow-[0px_0px_12px_white] hover:bg-white transition"
      >
        Add job
      </button>
    </form>
  );
}
