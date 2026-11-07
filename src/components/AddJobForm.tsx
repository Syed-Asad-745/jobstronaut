"use client";

import { SubmitEvent, useState } from "react";
import { Job } from "@/types/job";

export default function AddJobForm({ onAdd }: { onAdd: (job: Job) => void }) {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onAdd({
      id: crypto.randomUUID(),
      company,
      role,
      status: "wishlist",
    });
    setCompany("");
    setRole("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 flex flex-wrap gap-2"
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
        className="rounded bg-black px-4 py-2 text-white"
      >
        Add job
      </button>
    </form>
  );
}
