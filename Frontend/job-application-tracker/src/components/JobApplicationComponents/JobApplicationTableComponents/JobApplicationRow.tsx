import EditableCell from "./EditableCellComponents/EditableCell";
import DeleteJobButton from "./DeleteJobButton";
import { useState } from 'react';
import type { JobApplication } from "../../../types/jobApplication";
import { EditableCellContext } from "../../../contexts/EditableCellContext";

interface Props {
  jobApplication: JobApplication;
  onUpdate: (job: JobApplication) => void;
}

// A row representing a job in our array of job applications.
const JobApplicationRow = ({ jobApplication, onUpdate }: Props) => {
  // Store and update the current and edited job.
  const [localJobApplication, setLocalJobApplication] = useState(jobApplication);
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState<string | number | undefined>('');

  // When there's a change to the value...
  // update the local job and send a put request to update the job in the DB.
  const handleChange = (field: keyof JobApplication, value: any) => {
    const updatedValue = field === 'applicationDate' && value ? new Date(value) : value;
    const updatedJobApplication = { ...localJobApplication, [field]: updatedValue };
    setLocalJobApplication(updatedJobApplication);
    onUpdate(updatedJobApplication);
  };

  return (

        <tr className="border-2">
          {/* This cell converts the date from an object to MM-DD-YYY for display. */}
          <EditableCell field="applicationDate"
            value={new Date(localJobApplication.applicationDate!).toISOString().substring(0, 10)}
            onUpdate={(val) => handleChange('applicationDate', val)}
          />
          {/* Each cell has a field, value, and onUpdate function. Field is mainly used for workMode and status
              for knowing when to display a dropdown menu */}
          <EditableCell field="company" value={localJobApplication.company} onUpdate={val => handleChange('company', val)} />
          <EditableCell field="position" value={localJobApplication.position} onUpdate={val => handleChange('position', val)} />
          <EditableCell field="location" value={localJobApplication.location} onUpdate={val => handleChange('location', val)} />
          <EditableCell field="workMode" value={localJobApplication.workMode} onUpdate={val => handleChange('workMode', val)} />
          <EditableCell field="status" value={localJobApplication.status} onUpdate={val => handleChange('status', val)} />
          <EditableCell field="link" value={localJobApplication.link} onUpdate={val => handleChange('link', val)} />

          {/* Not editable cell, just a delete button in each row. */}
          <td className="px-2 py-1 flex justify-center items-center">
            <DeleteJobButton jobApplication={localJobApplication} />
          </td>
        </tr>
  );
};

export default JobApplicationRow;
