import {useState} from 'react';
import { useJobs } from '../../../contexts/JobContext';
import type { JobApplication } from '../../../types/jobApplication';

type SortField = keyof JobApplication;

type SortButtonProps = {
  sortField: SortField;
};

const SortButton = ({sortField}: SortButtonProps) => {
  const [sortOption, setSortOption] = useState('desc');
  const {jobApplications, setJobApplications} = useJobs();

  const handleSort = (field: SortField) => {
    sortOption === 'desc' ? setSortOption('asc') : setSortOption('desc');
    const sorted = [...jobApplications].sort((a, b) => {
      if (field === 'applicationDate') {
        // Sort dates descending or ascending based on sortOption.
        const dateA = new Date(a.applicationDate!);
        const dateB = new Date(b.applicationDate!);
        return sortOption === 'desc'
          ? dateB.getTime() - dateA.getTime()
          : dateA.getTime() - dateB.getTime();
      } else {
        const valA = a[field] as unknown as string;
        const valB = b[field] as unknown as string;

        // localeCompare for strings, with ascending/descending handling.
        return sortOption === 'desc'
          ? valB.localeCompare(valA)
          : valA.localeCompare(valB);
      }
    })
    setJobApplications(sorted);
}

  return (
    <div>
      <button className="text-sm" onClick={() => handleSort(sortField)}>▲▼</button>
    </div>
  )
}

export default SortButton;
