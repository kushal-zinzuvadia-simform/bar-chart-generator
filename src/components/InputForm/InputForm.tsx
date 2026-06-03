import { useRef } from 'react';
import type { AddItemProps } from '../../types/chart';

type InputFormProps = {
  onAdd: ({ label, value }: AddItemProps) => boolean;
};

const InputForm = ({ onAdd }: InputFormProps) => {
  const labelRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const label = labelRef.current?.value.trim() ?? '';
    const value = valueRef.current?.value ?? '';

    const added = onAdd({ label, value });

    if (added) {
      if (labelRef.current) {
        labelRef.current.value = '';
        labelRef.current.focus();
      }
      if (valueRef.current) valueRef.current.value = '';
    }
  };

  return (
    <div className="p-4">
      <form className="flex items-center gap-3" onSubmit={handleSubmit}>
        <label htmlFor="inputX" className="text-sm font-medium">
          X:
        </label>
        <input
          id="inputX"
          type="text"
          placeholder="Category (e.g., Electronics)"
          maxLength={20}
          ref={labelRef}
          className="border rounded px-3 py-2 text-sm outline-none focus:ring-1"
        />

        <label htmlFor="inputY" className="text-sm font-medium">
          Y:
        </label>
        <input
          id="inputY"
          type="number"
          placeholder="Value (e.g., 20)"
          max={10000000000}
          ref={valueRef}
          className="border rounded px-3 py-2 text-sm outline-none focus:ring-1"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded text-sm"
        >
          Add Data
        </button>
      </form>
    </div>
  );
};

export default InputForm;
