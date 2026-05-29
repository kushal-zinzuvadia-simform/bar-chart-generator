const InputForm = () => {
  return (
    <div className="p-4">
      <form className="flex items-center gap-3">
        <label htmlFor="inputX" className="text-sm font-medium">
          X:
        </label>
        <input
          id="inputX"
          type="text"
          className="border rounded px-3 py-2 text-sm outline-none focus:ring-1"
        />

        <label htmlFor="inputY" className="text-sm font-medium">
          Y:
        </label>
        <input
          id="inputY"
          type="number"
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
