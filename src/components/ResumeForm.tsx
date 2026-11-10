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
        className="w-full rounded-lg border-2 border-white text-white p-3"
      />
      <div className="mt-3 flex items-center gap-3">
        <button
          onClick={handleSave}
          disabled={!content.trim()}
          className="rounded-lg bg-blue-600/60 px-6 py-2.5 text-white disabled:opacity-50 hover:bg-blue-600 hover:shadow-[0px_0px_12px_#1944a3] cursor-pointer transition"
        >
          Save resume
        </button>
        <span className="text-sm text-gray-500">{status}</span>
      </div>
    </div>
  );
}
