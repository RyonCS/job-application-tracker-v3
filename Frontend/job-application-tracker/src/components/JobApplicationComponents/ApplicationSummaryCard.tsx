import axios from 'axios';
import { useState, useEffect } from 'react';
import { useJobs } from '../../contexts/JobContext';
import { BACKEND_URL } from '../../config';

type Props = {
  cardHeaderText: string;
  summaryType: 'total' | 'weekly' | 'conversion';
}

const ApplicationSummaryCard = ({cardHeaderText, summaryType}: Props) => {
  const { jobApplications } = useJobs();
  const [applicationSummary, setApplicationSummary] = useState('');

  useEffect(() => {
    const getApplicationSummary = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/applications/summary`, {
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`, // Attach token for auth.
          },
        });

        switch (summaryType) {
          case 'total':
            setApplicationSummary(res.data.applicationSummary.totalApplications);
            break;
          case 'weekly':
            setApplicationSummary(res.data.applicationSummary.weeklyApplications)
            break;
          case 'conversion':
            setApplicationSummary(res.data.applicationSummary.conversionPercent);
            console.log(res.data.applicationSummary.conversionPercent ?? "0.0");
        }
      } catch (error) {
        console.error(error);
      }
    };
    getApplicationSummary()
    console.log(applicationSummary);
  }, [jobApplications.length]);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 border-blue-400 shadow-lg rounded-2xl pt-2 pb-6 w-36 h-18 mx-2 mt-6 border ">
      <h2 className="text-blue-900 text-center text-sm font-bold tracking-wide">{cardHeaderText}</h2>
      <p className="text-blue-800 text-center text-lg font-semibold mt-2 mb-4">{
      summaryType === 'conversion' ? `${applicationSummary} %` : applicationSummary}</p>
    </div>
  )
}

export default ApplicationSummaryCard;
