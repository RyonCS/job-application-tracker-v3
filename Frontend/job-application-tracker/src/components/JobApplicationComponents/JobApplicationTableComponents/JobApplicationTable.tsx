import JobApplicationRow from "./JobApplicationRow";
import type { JobApplicationProps } from "../../../types/jobApplication";
import SortButton from "./SortButton";
import AddJobButton from "./AddJobButton";

// JobApplicationTable component receives an array of jobs and an onUpdate callback function via props
const JobApplicationTable = ({jobApplications, onUpdate}: JobApplicationProps) => {
  return (
    <div className="mx-20">
        <AddJobButton />
        {/* No auto resizing columns. Shared borders will combine. */}
        <table className="table-fixed w-full border border-collapse border-gray-300 mb-6">
            <thead className="bg-gray-100 border-2" >
                <tr>
                    <th className="w-20 px-2 py-1 border">
                        <div className="flex justify-between items-center">
                            <span>Date</span>
                            <SortButton sortField="applicationDate" />
                        </div>
                    </th>
    
                    <th className="w-36 px-2 py-1 border">
                        <div className="flex justify-between items-center">
                            <span>Company</span>
                            <SortButton sortField="company" />
                        </div>
                    </th>
                    <th className="w-56 px-2 py-1 border">
                        <div className="flex justify-between items-center">
                            <span>Position</span>
                            <SortButton sortField="position" />
                        </div>
                    </th>
                    <th className="w-30 px-2 py-1 border">
                        <div className="flex justify-between items-center">
                            <span>Location</span>
                            <SortButton sortField="location" />
                        </div>
                    </th>
                    <th className="w-26 px-2 py-1 border">
                        <div className="flex justify-between items-center">
                            <span>Work Mode</span>
                            <SortButton sortField="workMode" />
                        </div>
                    </th>
                    <th className="w-40 px-2 py-1 border">
                        <div className="flex justify-between items-center">
                            <span>Status</span>
                            <SortButton sortField="status" />
                        </div>
                    </th>
                    <th className="w-20 px-2 py-1 border">Link</th>
                    <th className="w-16 px-2 py-1 border">Delete</th>
                </tr>
            </thead>
            <tbody>
                {/* For each job, return a JobApplicationRow */}
                {jobApplications.map((job) => (
                    <JobApplicationRow key={job.id} job={job} onUpdate={onUpdate} />
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default JobApplicationTable;