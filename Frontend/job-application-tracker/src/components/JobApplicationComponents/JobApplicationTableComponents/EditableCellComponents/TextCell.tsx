interface TextCellProps {
  value: string | number | undefined;
  handleChange: (value: string) => void;
  finishEditing: () => void;
}

const TextCell = ({
  value,
  handleChange,
  finishEditing,
}: TextCellProps) => {
  // Ensure the input value is always a string
  const safeValue = value !== undefined && value !== null ? String(value) : '';

  return (
    <div>
      <input
        type="text"
        value={safeValue}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={finishEditing}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            finishEditing();
          }
          if (e.key === 'Escape') {
            e.preventDefault();
            handleChange(safeValue); // revert to initial safe value
            finishEditing();
          }
        }}
        autoFocus
        className="w-full h-8 px-2 border border-blue-400 focus:outline-none 
        focus:ring-1 focus:ring-blue-500 rounded-sm text-sm"
      />
    </div>
  );
};

export default TextCell;