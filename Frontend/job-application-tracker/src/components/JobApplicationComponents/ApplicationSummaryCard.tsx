import axios from 'axios';
import { useState, useEffect } from 'react';
import { useJobs } from '../../contexts/JobContext';
import { BACKEND_URL } from '../../config';

type Props = {
  cardHeaderText: string;
  summaryType: 'total' | 'weekly' | 'conversion';
}

type Summary = {
  totalApplications: number;
  weeklyApplications: number;
  conversionPercent: number; // 0–100
};

const ApplicationSummaryCard = ({cardHeaderText, summaryType}: Props) => {
  const { jobApplications } = useJobs();
  const [summary, setSummary] = useState<Summary>({
    totalApplications: 0,
    weeklyApplications: 0,
    conversionPercent: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchSummary = async () => {
        try {
          const res = await axios.get(`${BACKEND_URL}/api/v1/applications/summary`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          const s = res.data.applicationSummary ?? {};
          setSummary({
            totalApplications: Number(s.totalApplications ?? 0),
            weeklyApplications: Number(s.weeklyApplications ?? 0),
            conversionPercent: Number(s.conversionPercent ?? 0)
          });
    
        } catch (error) {
          console.error(error);
        }
      };
      fetchSummary();
    }, 250);
    
    return () => clearTimeout(timer);
  }, [jobApplications]);

  const display =
    summaryType === "total"
      ? summary.totalApplications
      : summaryType === "weekly"
      ? summary.weeklyApplications
      : `${summary.conversionPercent.toFixed(1)} %`;

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 border-blue-400 shadow-lg rounded-2xl pt-2 pb-6 w-36 h-18 mx-2 mt-6 border">
      <h2 className="text-blue-900 text-center text-sm font-bold tracking-wide">
        {cardHeaderText}
      </h2>
      <p className="text-blue-800 text-center text-lg font-semibold mt-2 mb-4">
        {display}
      </p>
    </div>
  );
}

export default ApplicationSummaryCard;
