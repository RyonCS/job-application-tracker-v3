interface DateCellProps {
    tempValue: string | number | undefined
    handleChange: (value:string) => void;
    finishEditing: () => void;
}

const DateCell = ({tempValue, handleChange, finishEditing}: DateCellProps) => {
  return (
    <div>
      <input
            type="date"
            value={tempValue ?? ''}
            onChange={(e) => handleChange(e.target.value)}
            onBlur={() => finishEditing()}
            autoFocus
            className="w-full h-8 px-2 border border-blue-400 focus:outline-none focus:ring-1 
            focus:ring-blue-500 rounded-sm text-sm bg-white"
          />
    </div>
  )
}

export default DateCell;