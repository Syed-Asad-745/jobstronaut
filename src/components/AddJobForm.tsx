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
      className="mb-6 flex flex-wrap gap-2 justify-self-center"
    >
      <input
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        placeholder="Company"
        required
        className="rounded border px-3 py-2"
      />
      <input
        value={role}
        onChange={(e) => setRole(e.target.value)}
        placeholder="Role"
        required
        className="rounded border px-3 py-2"
      />
      <button
        type="submit"
        className="rounded-md bg-emerald-900 px-4 py-2 text-white font-semibold cursor-pointer hover:scale-110 transition"
      >
        Add job
      </button>
    </form>
  );
}
