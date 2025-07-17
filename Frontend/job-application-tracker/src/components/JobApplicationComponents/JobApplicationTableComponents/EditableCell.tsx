import { useState } from 'react';

interface Props {
  field: string;
  value: string | number | undefined;
  onUpdate: (val: string | number) => void;
}

// Predefined options for dropdown menus for 'workMode' and 'status' fields.
const workModeOptions = ['REMOTE', 'INPERSON', 'HYBRID'];
const statusOptions = ['APPLIED', 'PHONESCREEN', 'INTERVIEW', 'TAKEHOMEASSESSMENT', 'OFFER', 'REJECTED', 'DECLINED'];

const EditableCell = ({ field, value, onUpdate }: Props) => {
    // Local state to track whether the cell is currently in editing mode.
  const [editing, setEditing] = useState(false);

  // Temporary state to hold the input/select value while editing.
  const [tempValue, setTempValue] = useState(value);

  // Called when editing finishes (on blur or enter key).
  // If the value changed, calls onUpdate callback with new value.
  const finishEditing = () => {
    setEditing(false);
    if (tempValue !== value) {
      onUpdate(tempValue ?? '');
    }
  };

  // Update the temporary value while typing/selecting new option.
  const handleChange = (newVal: string) => {
    setTempValue(newVal);
  };

  return (
    <td className="border border-gray-300 text-sm p-0.5">
      {editing ? (
        // Render different input types depending on the field.

        // If field is 'date', show a date input with calendar dropdown.
        field === 'date' ? (
          <input
            type="date"
            value={tempValue ?? ''}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={finishEditing} // Finish editing when focus leaves input.
            autoFocus
            className="w-full h-8 px-2 border border-blue-400 focus:outline-none focus:ring-1 
            focus:ring-blue-500 rounded-sm text-sm bg-white"
          />
        ) : 
        // If field is 'workMode' or 'status', show a select dropdown with predefined options.
        (field === 'workMode' || field === 'status') ? (
          <select
            value={tempValue ?? ''}
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
        ) : 
        // For all other fields, show a standard text input.
        (      
          <input
            type="text"
            value={tempValue ?? ''}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={finishEditing}
            onKeyDown={(e) => {
              // Propagate changes.
              if (e.key === 'Enter') {
                e.preventDefault();
                finishEditing();
              }
              // Revert to initial value.
              if (e.key === 'Escape') {
                e.preventDefault();
                setEditing(false);
                setTempValue(value);
              }
            }}
            autoFocus
            className="w-full h-8 px-2 border border-blue-400 focus:outline-none 
            focus:ring-1 focus:ring-blue-500 rounded-sm text-sm"
          />
        )
      ) : (
        // Non-editing mode: display the value inside a div.
        // Clicking this div enables editing mode.
        <div
          className="w-full h-8 px-2 flex items-center truncate cursor-pointer"
          onClick={() => setEditing(true)}
        >
          {/* If the company value is too long, truncate. */}
          {((field === 'company' && value && value.toString().length > 23) 
          ? value.toString().slice(0, 23) + '...'
          : value || '')}
        </div>
      )}
    </td>
  );
};

export default EditableCell;
