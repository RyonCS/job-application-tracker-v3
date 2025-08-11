interface DropDownCellProps {
    field: string | undefined;
    value: string | number | undefined; 
    handleChange: (value:string) => void;
    finishEditing: () => void;
}

// Predefined options for dropdown menus for 'workMode' and 'status' fields.
const workModeOptions = ['REMOTE', 'INPERSON', 'HYBRID'];
const statusOptions = ['APPLIED', 'PHONESCREEN', 'INTERVIEW', 'TAKEHOMEASSESSMENT', 'OFFER', 'REJECTED', 'DECLINED'];

const DropDownCell = ({field, value, handleChange, finishEditing}: DropDownCellProps) => {

  return (
    <div>
      <select
            value={value !== undefined ? String(value) : ''}
            onChange={e => handleChange(e.target.value)}
            onBlur={finishEditing}
            autoFocus
            className="w-full h-8 px-2 border border-blue-400 focus:outline-none focus:ring-1 
            focus:ring-blue-500 rounded-sm text-sm bg-white"
          >
            {/* Build options dropdown */}
            {(field === 'workMode' ? workModeOptions : statusOptions).map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
    </div>
  )
}

export default DropDownCell;

