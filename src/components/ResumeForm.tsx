"use client";

import { useState } from "react";
import { saveResume } from "@/app/actions";

export default function ResumeForm({ initialContent }: { initialContent: string }) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState("");

  async function handleSave() {
    setStatus("Saving...");
    await saveResume(content);
    setStatus("Saved");
  }

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={18}
        placeholder="Paste your resume text here"
        className="w-full rounded border p-3"
      />
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={!content.trim()}
          className="rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50 hover:scale-110 cursor-pointer transition"
        >
          Save resume
        </button>
        <span className="text-sm text-gray-500">{status}</span>
      </div>
    </div>
  );
}
