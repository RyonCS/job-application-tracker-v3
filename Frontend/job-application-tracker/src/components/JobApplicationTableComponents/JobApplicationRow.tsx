import EditableCell from "./EditableCell";
import DeleteJobButton from "./DeleteJobButton";
import { useState } from 'react';
import type { Job } from "../../types/job";

interface Props {
  job: Job;
  onUpdate: (job: Job) => void;
}

// A row representing a job in our array of job applications.
const JobApplicationRow = ({ job, onUpdate }: Props) => {
  // Store and update the current and edited job.
  const [localJob, setLocalJob] = useState(job);

  // When there's a change to the value...
  // update the local job and send a put request to update the job in the DB.
  const handleChange = (field: keyof Job, value: any) => {
    const updatedValue = field === 'applicationDate' && value ? new Date(value) : value;
    const updatedJob = { ...localJob, [field]: updatedValue };
    setLocalJob(updatedJob);
    onUpdate(updatedJob);
  };

  return (
    <tr className="border-2">
      {/* This cell converts the date from an object to MM-DD-YYY for display. */}
      <EditableCell field="date"
        value={new Date(localJob.applicationDate!).toISOString().substring(0, 10)}
        onUpdate={(val) => handleChange('applicationDate', val)}
      />
      {/* Each cell has a field, value, and onUpdate function. Field is mainly used for workMode and status
          for knowing when to display a dropdown menu */}
      <EditableCell field="company" value={localJob.company} onUpdate={val => handleChange('company', val)} />
      <EditableCell field="position" value={localJob.position} onUpdate={val => handleChange('position', val)} />
      <EditableCell field="location" value={localJob.location} onUpdate={val => handleChange('location', val)} />
      <EditableCell field="workMode" value={localJob.workMode} onUpdate={val => handleChange('workMode', val)} />
      <EditableCell field="status" value={localJob.status} onUpdate={val => handleChange('status', val)} />
      <EditableCell field="link" value={localJob.link} onUpdate={val => handleChange('link', val)} />

      {/* Not editable cell, just a delete button in each row. */}
      <td className="px-2 py-1 flex justify-center items-center">
        <DeleteJobButton job={localJob} />
      </td>
    </tr>
  );
};

export default JobApplicationRow;
