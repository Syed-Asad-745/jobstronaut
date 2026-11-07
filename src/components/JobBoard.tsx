"use client";

import { useState } from "react";
import { Job, JobStatus } from "@/types/job";
import { sampleJobs } from "@/data/sample-jobs";
import Board from "@/components/Board";
import AddJobForm from "@/components/AddJobForm";

export default function JobBoard() {
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);

  function addJob(job: Job) {
    setJobs((prev) => [...prev, job]);
  }

  function changeStatus(id: string, status: JobStatus) {
    setJobs((prev) => prev.map((job) => (job.id === id ? { ...job, status } : job)));
  }

  function deleteJob(id: string) {
    setJobs((prev) => prev.filter((job) => job.id !== id));
  }

  return (
    <>
      <AddJobForm onAdd={addJob} />
      <Board
        jobs={jobs}
        onStatusChange={changeStatus}
        onDelete={deleteJob}
      />{" "}
    </>
  );
}
