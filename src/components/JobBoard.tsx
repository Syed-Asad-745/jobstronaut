"use client";

import { useState } from "react";
import { Job, JobStatus } from "@/types/job";
import Board from "@/components/Board";
import AddJobForm from "@/components/AddJobForm";
import { addJob } from "@/app/actions";

export default function JobBoard({ initialJobs }: { initialJobs: Job[] }) {
  const [jobs, setJobs] = useState<Job[]>(initialJobs);

  async function handleAdd(company: string, role: string) {
    const newJob = await addJob(company, role);
    setJobs((prev) => [newJob, ...prev]);
  }

  function changeStatus(id: string, status: JobStatus) {
    setJobs((prev) => prev.map((job) => (job.id === id ? { ...job, status } : job)));
  }

  function deleteJob(id: string) {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }

  return (
    <>
      <AddJobForm onAdd={handleAdd} />
      <Board
        jobs={jobs}
        onStatusChange={changeStatus}
        onDelete={deleteJob}
      />{" "}
    </>
  );
}
