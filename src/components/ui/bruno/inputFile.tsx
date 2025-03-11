// components/CustomFileInput.tsx
import React, { useState } from 'react';

const CustomFileInput: React.FC = () => {
  const [fileName, setFileName] = useState('No se ha seleccionado ningún archivo');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('No se ha seleccionado ningún archivo');
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <label className="cursor-pointer bg-[#4e82f2] shadow-lg shadow-indigo-500/20  text-black py-2 px-4 rounded-md  hover:bg-[#4e82f2b9]">
        Agregar CV
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
      <span className="text-gray-700">{fileName}</span>
    </div>
  );
};

export default CustomFileInput;
