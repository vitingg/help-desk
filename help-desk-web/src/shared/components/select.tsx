import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

type OptionType = {
  value: string;
  label: string;
};

type SelectProps = {
  options: OptionType[];
  placeholder?: string;
  value: string | null;
  onChange: (value: string | null) => void;
};

export function Select({
  options,
  placeholder = "Selecione uma opção.",
  value,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOptionLabel = options.find(
    (option) => option.value === value
  )?.label;
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (optionValue: string | null) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={selectRef} className="relative w-full font-sans">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-left bg-inherit
        focus:outline-none border-b-1 border-b-gray-500 cursor-pointer"
      >
        <span className="text-gray-700">
          {selectedOptionLabel || placeholder}
        </span>
        <ChevronDown
          className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-full mt-1 bg-gray-600 rounded-md shadow-xl overflow-auto">
          <p className="text-gray-400 uppercase font-bold text-2xs px-4 py-1">
            opções
          </p>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-500 ${
                option.value === value ? "font-bold" : "text-gray-900"
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
