import JobApplicationRow from "./JobApplicationRow";
import type { JobProps } from "../../../types/job";
import AddJobButton from "./AddJobButton";

// JobApplicationTable component receives an array of jobs and an onUpdate callback function via props
const JobApplicationTable = ({ jobs, onUpdate, fetchJobs}: JobProps) => {
  return (
    <div className="mx-20">
        <AddJobButton />
        {/* No auto resizing columns. Shared borders will combine. */}
        <table className="table-fixed w-full border border-gray-300">
            <thead className="bg-gray-100">
                <tr>
                    <th className="w-20 px-2 py-1 border">Date</th>
                    <th className="w-36 px-2 py-1 border">Company</th>
                    <th className="w-56 px-2 py-1 border">Position</th>
                    <th className="w-30 px-2 py-1 border">Location</th>
                    <th className="w-26 px-2 py-1 border">Work Mode</th>
                    <th className="w-40 px-2 py-1 border">Status</th>
                    <th className="w-20 px-2 py-1 border">Link</th>
                    <th className="w-16 px-2 py-1 border">Delete</th>
                </tr>
            </thead>
            <tbody>
                {/* For each job, return a JobApplicationRow */}
                {jobs.map((job) => (
                    <JobApplicationRow key={job.id} job={job} onUpdate={onUpdate} />
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default JobApplicationTable;