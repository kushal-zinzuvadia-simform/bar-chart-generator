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
    const value = valueRef.current?.value.trim() ?? '';

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
    <div className="border rounded-2xl p-6 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
        Add Data Point
      </h3>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="inputX" className="text-xs font-semibold uppercase tracking-wider">
            X-Axis Label (Category)
          </label>
          <input
            id="inputX"
            type="text"
            placeholder="e.g. July or Q3"
            maxLength={20}
            ref={labelRef}
            className="w-full border rounded-xl px-4 py-2.5 text-sm"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="inputY" className="text-xs font-semibold uppercase tracking-wider">
            Y-Axis Value (Numeric)
          </label>
          <input
            id="inputY"
            type="number"
            placeholder="e.g. 150"
            max={10000000000}
            ref={valueRef}
            className="w-full border rounded-xl px-4 py-2.5 text-sm"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white font-medium py-3 px-4 rounded-xl text-sm transition-all duration-300 transform hover:-translate-y-[1px] active:translate-y-0 hover:cursor-pointer flex items-center justify-center gap-2"
        >
          + Add to Chart
        </button>
      </form>
    </div>
  );
};

export default InputForm;
