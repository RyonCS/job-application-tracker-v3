import { createContext, useContext } from "react";
import type { JobApplication } from "../types/jobApplication";

export const JobsContext = createContext<{
    jobApplications: JobApplication[];
    setJobApplications: React.Dispatch<React.SetStateAction<JobApplication[]>>;
} | null>(null);

export const useJobs = () => {
  const context = useContext(JobsContext);
  if (!context) throw new Error("useJobs must be used inside JobsProvider");
  return context;
};