import { Job, JobStatus } from "@/types/job";
import JobCard from "@/components/JobCard";

const columns: { status: JobStatus; label: string }[] = [
  { status: "wishlist", label: "Wishlist" },
  { status: "applied", label: "Applied" },
  { status: "interview", label: "Interview" },
  { status: "offer", label: "Offer" },
  { status: "rejected", label: "Rejected" },
];

export default function Board({ jobs, onStatusChange, onDelete }: { jobs: Job[]; onStatusChange: (id: string, status: JobStatus) => void; onDelete: (id: string) => void }) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      {columns.map((column) => (
        <section key={column.status}>
          <h2 className="mb-3 font-semibold">{column.label}</h2>
          <div className="flex flex-col gap-3">
            {jobs
              .filter((job) => job.status === column.status)
              .map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onStatusChange={onStatusChange}
                  onDelete={onDelete}
                />
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
