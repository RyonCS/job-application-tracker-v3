import { useJobs } from '../../../contexts/JobContext';

const FilterByRejectedButton = () => {
    const {filterRejected, setFilterRejected} = useJobs();

    const handleFilter = () => {
        setFilterRejected(!filterRejected);
    }

  return (

    <div >
      <button className="w-48 h-8 mb-2 mt-2 flex items-center justify-center rounded-2xl shadow-sm
      bg-red-100 text-red-600 hover:bg-red-600 hover:text-red-100 transition">
        <label className=" flex items-center justify-center">
            Filter Out Rejected?
            <input
                type="checkbox"
                checked={filterRejected}
                onChange={handleFilter} 
                className="ml-2"/>
                            
        </label>
      </button>
    </div>
  )
}

export default FilterByRejectedButton;
