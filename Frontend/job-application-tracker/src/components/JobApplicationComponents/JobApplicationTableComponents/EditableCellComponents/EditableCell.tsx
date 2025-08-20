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
  const [editing, setEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value ?? '');

  const beginEditing = () => {
    setTempValue(value ?? '');
    setEditing(true);
  };

  const finishEditing = (next?: string | number) => {
    setEditing(false);
    const toCommit = next !== undefined ? next : tempValue;
    if (toCommit !== value) {
      onUpdate(toCommit);
    }
  };

  const handleChange = (newVal: string) => {
    setTempValue(newVal);
  };

  if (value === undefined || value === null) {
    return <td className="border p-2 text-red-500">Invalid</td>;
  }

  const renderEditingComponent = () => {
    if (field === 'applicationDate') {
      return (
        <DateCell
          tempValue={tempValue}
          handleChange={handleChange}
          finishEditing={finishEditing}
        />
      );
    } else if (field === 'workMode' || field === 'status') {
      return (
        <DropDownCell
          field={field}
          value={tempValue}
          handleChange={handleChange}
          finishEditing={finishEditing}
        />
      );
    } else if (field === "linkToJobPosting" && tempValue) {
      return (
        <a
          href={String(tempValue)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          {String(tempValue)}
        </a>
      );
    }

    return (
      <TextCell
        value={tempValue}
        handleChange={handleChange}
        finishEditing={finishEditing}
      />
    );
  };

  return (
    <td className="border border-gray-300 text-sm p-0.5">
      {editing ? (
        renderEditingComponent()
      ) : (
        <div
          className="w-full h-8 px-2 flex items-center truncate cursor-pointer"
          onClick={beginEditing}
        >
          {(field === 'company' && value.toString().length > 23)
            ? value.toString().slice(0, 23) + '...'
            : value.toString()}
        </div>
      )}
    </td>
  );
};


export default EditableCell;
