import { useRef } from 'react';
import toast from 'react-hot-toast';

type InputFormProps = {
  onAdd: (label: string, value: string) => boolean;
};

const InputForm = ({ onAdd }: InputFormProps) => {
  const labelRef = useRef<HTMLInputElement>(null);
  const valueRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const label = labelRef.current?.value.trim() ?? '';
    const value = valueRef.current?.value ?? '';

    const added = onAdd(label, value);

    if (added) {
      if (labelRef.current) labelRef.current.value = '';
      if (valueRef.current) valueRef.current.value = '';
      toast.success(`Added data "${label}: ${value}"`);
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
          ref={labelRef}
          className="border rounded px-3 py-2 text-sm outline-none focus:ring-1"
        />

        <label htmlFor="inputY" className="text-sm font-medium">
          Y:
        </label>
        <input
          id="inputY"
          type="number"
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
