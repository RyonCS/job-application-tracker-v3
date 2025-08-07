import { createContext, useContext } from 'react';

export const EditableCellContext = createContext<{
    editing: Boolean;
    setEditing: React.Dispatch<React.SetStateAction<Boolean>>;
    tempValue: string | number | undefined;
    setTempValue: React.Dispatch<React.SetStateAction<any>>;
}|null>(null);


export const useEditableCell = () => {
    const context = useContext(EditableCellContext);
    if (!context) throw new Error("useEditableCell must be used inside EditableCellProvider");
    return context;
}