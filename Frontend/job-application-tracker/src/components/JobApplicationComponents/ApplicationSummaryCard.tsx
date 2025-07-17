import axios from 'axios';
import { useState, useEffect } from 'react';
import { useJobs } from '../../contexts/JobContext';

type Props = {
  cardHeaderText: string;
  summaryType: 'total' | 'weekly';
}

const ApplicationSummaryCard = ({cardHeaderText, summaryType}: Props) => {
  const { jobs } = useJobs();
  const [applicationSummary, setApplicationSummary] = useState();
  const [jobCount, setJobCount] = useState(jobs.length);

  useEffect(() => {
    const getApplicationSummary = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/v1/applications/summary', {
          headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });

        switch (summaryType) {
          case 'total':
            setApplicationSummary(res.data.applicationSummary.totalApplications);
            break;
          case 'weekly':
            setApplicationSummary(res.data.applicationSummary.weeklyApplications)
        }
        setJobCount(jobs.length);
      } catch (error) {
        console.error(error);
      }
    };
    getApplicationSummary()
  }, [jobCount]);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 shadow-lg rounded-2xl pt-4 pb-2 w-36 h-24 m-2 border border-blue-400">
  <h2 className="text-blue-900 text-center text-sm font-bold tracking-wide">{cardHeaderText}</h2>
  <p className="text-blue-800 text-center text-lg font-semibold mt-2 ">{applicationSummary}</p>
</div>
  )
}

export default ApplicationSummaryCard;
