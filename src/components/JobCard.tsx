import { useState } from "react";
import { Job, JobStatus } from "@/types/job";

const statuses: JobStatus[] = ["wishlist", "applied", "interview", "offer", "rejected"];

export default function JobCard({
  job,
  onStatusChange,
  onDelete,
  onAnalyze,
}: {
  job: Job;
  onStatusChange: (id: string, status: JobStatus) => void;
  onDelete: (id: string) => void;
  onAnalyze: (id: string, description: string) => Promise<void>;
}) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState(job.jobDescription ?? "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze() {
    setLoading(true);
    setError("");
    try {
      await onAnalyze(job.id, description);
    } catch {
      setError("Analysis failed. Save your resume first, or you may have reached the daily limit of 5.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-lg border-2 border-[#162938] bg-black/30 backdrop-blur-xs p-4 shadow-xl text-white">
      <h3 className="font-semibold ">{job.role}</h3>
      <p className="text-sm">{job.company}</p>
      {job.matchScore !== null && <p className="mt-2 text-sm font-medium">Match: {job.matchScore}%</p>}
      <select
        value={job.status}
        onChange={(e) => onStatusChange(job.id, e.target.value as JobStatus)}
        className="mt-3 rounded border px-2 py-1 text-sm"
      >
        {statuses.map((s) => (
          <option
            key={s}
            value={s}
            className="bg-[#162938]"
          >
            {s}
          </option>
        ))}
      </select>
      <button
        onClick={() => onDelete(job.id)}
        className="ml-4 text-sm text-red-600 bg-transparent font-extralight px-4 py-1.5 rounded-md cursor-pointer hover:bg-red-600 hover:text-white hover:-translate-y-1 hover:shadow-[0px_0px_12px_#e7000b] transition"
      >
        Delete
      </button>
      <button
        onClick={() => setOpen(!open)}
        className="mt-3 block text-sm underline cursor-pointer text-blue-500"
      >
        {open ? "Hide AI" : "AI analysis"}
      </button>
      {open && (
        <div className="mt-3">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            placeholder="Paste the job description"
            className="w-full rounded-lg border outline-none p-4 text-sm"
          />
          <button
            onClick={handleAnalyze}
            disabled={loading || !description.trim()}
            className="mt-2 rounded-md bg-blue-600/60 px-6 py-2 text-white font-extralight cursor-pointer disabled:opacity-20 hover:bg-blue-600 hover:shadow-[0px_0px_12px_#1944a3]"
          >
            {loading ? "Analyzing..." : "Analyze"}
          </button>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

          {job.analysis && (
            <div className="mt-3 text-sm">
              <p className="font-medium">Missing skills</p>
              <ul className="mb-2 list-disc pl-5">
                {job.analysis.missingSkills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
              <p className="font-medium">Suggestions</p>
              <ul className="list-disc pl-5">
                {job.analysis.suggestions.map((tip) => (
                  <li key={tip}>{tip}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
