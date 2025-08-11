import { useState } from 'react';
import type { JobApplication } from '../../../../types/jobApplication';
import DateCell from './DateCell';
import DropDownCell from './DropDownCell';
import TextCell from './TextCell';

interface Props {
  field: keyof JobApplication;
  value: string | number | undefined;
  onUpdate: (val: string | number) => void;
}

const EditableCell = ({ field, value, onUpdate }: Props) => {
    // Local state to track whether the cell is currently in editing mode.
  const [editing, setEditing] = useState(false);

  // Temporary state to hold the input/select value while editing.
  const [tempValue, setTempValue] = useState(value);

  const beginEditing = () => {
    setTempValue(value ?? '');
    setEditing(true);
  };

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

  const renderEditingComponent = () => {
    if (field === 'applicationDate') {
      return (
        <DateCell tempValue={tempValue} handleChange={handleChange} finishEditing={finishEditing} />
      )
    } else if (field === 'workMode' || field === 'status') {
      return (
        <DropDownCell field={field} value={value} handleChange={handleChange} finishEditing={finishEditing} />
      )
    }
    return <TextCell value={tempValue} handleChange={handleChange} finishEditing={finishEditing} />
  }

  return (
    <td className="border border-gray-300 text-sm p-0.5">
      {editing ? (
        renderEditingComponent()) : 
      (
        // Non-editing mode: display the value inside a div.
        // Clicking this div enables editing mode.
        <div
          className="w-full h-8 px-2 flex items-center truncate cursor-pointer"
          onClick={beginEditing}
        >
          {/* If the company value is too long, truncate. */}
          {(field === 'company' && value && value.toString().length > 23)
            ? value.toString().slice(0, 23) + '...'
            : value || ''}
        </div>
      )}
    </td>
  );
};

export default EditableCell;
