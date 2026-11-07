"use client";

import { useState } from "react";
import { Job } from "@/types/job";
import { sampleJobs } from "@/data/sample-jobs";
import Board from "@/components/Board";
import AddJobForm from "@/components/AddJobForm";

export default function JobBoard() {
  const [jobs, setJobs] = useState<Job[]>(sampleJobs);

  function addJob(job: Job) {
    setJobs((prev) => [...prev, job]);
  }

  return (
    <>
      <AddJobForm onAdd={addJob} />
      <Board jobs={jobs} />
    </>
  );
}
