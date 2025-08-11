interface TextCellProps {
    value: string | number | undefined;
    handleChange: (value:string) => void;
    finishEditing: () => void;
}

const TextCell = ({value, handleChange, finishEditing}: TextCellProps) => {
  return (
    <div>
        <input
        type="text"
        value={value ?? ''}
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
            handleChange(String(value ?? ''));
            finishEditing();
            }
        }}
        autoFocus
        className="w-full h-8 px-2 border border-blue-400 focus:outline-none 
        focus:ring-1 focus:ring-blue-500 rounded-sm text-sm"
        />
    </div>
  )
}

export default TextCell
