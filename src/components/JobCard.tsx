import { Job, JobStatus } from "@/types/job";

const statuses: JobStatus[] = ["wishlist", "applied", "interview", "offer", "rejected"];

export default function JobCard({ job, onStatusChange, onDelete }: { job: Job; onStatusChange: (id: string, status: JobStatus) => void; onDelete: (id: string) => void }) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold">{job.role}</h3>
      <p className="text-sm text-gray-500">{job.company}</p>
      <select
        value={job.status}
        onChange={(e) => onStatusChange(job.id, e.target.value as JobStatus)}
        className="mt-3 rounded border px-2 py-1 text-sm"
      >
        {statuses.map((s) => (
          <option
            key={s}
            value={s}
          >
            {s}
          </option>
        ))}
      </select>
      <button
        onClick={() => onDelete(job.id)}
        className="ml-2 text-sm text-red-600 cursor-pointer hover:bg-red-200 px-4 py-1.5 rounded-md"
      >
        Delete
      </button>
    </div>
  );
}
