import { X } from "lucide-react";
import { useEffect, useState } from "react";

const controlTime = {
  manhã: ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"],
  tarde: ["13:00", "14:00", "15:00", "16:00", "17:00", "18:00"],
  noite: ["19:00", "20:00", "21:00", "22:00", "23:00"],
};

type WorkHoursSelectorProps = {
  initialSelectedHours?: string[];
  onSelectionChange: (hours: string[]) => void;
};

export function WorkHoursSelector({
  initialSelectedHours = [],
  onSelectionChange,
}: WorkHoursSelectorProps) {
  const [selectedHours, setSelectedHours] = useState<string[]>([]);

  useEffect(() => {
    if (initialSelectedHours.length > 0) {
      setSelectedHours(initialSelectedHours);
    }
  }, [initialSelectedHours]);

  const toggleHour = (hour: string) => {
    const newSelectedHours = selectedHours.includes(hour)
      ? selectedHours.filter((h) => h !== hour)
      : [...selectedHours, hour];

    setSelectedHours(newSelectedHours);
    onSelectionChange(newSelectedHours);
  };

  return (
    <div className="border border-gray-500 p-4 rounded-lg">
      <p className="font-bold">Horários de atendimento</p>
      <p className="text-gray-300">
        Selecione os horários de disponibilidade do técnico para atendimento
      </p>
      <div>
        {Object.entries(controlTime).map(([period, hour]) => (
          <div key={period}>
            <p className="text-gray-300 text-xs font-bold pt-5 pb-2 uppercase">
              {period}
            </p>
            <div className={`flex font-bold gap-2 text-sm`}>
              {hour.map((hour) => (
                <div
                  className={`flex px-3  py-1.5 gap-1 items-center justify-center border border-gray-300 rounded-2xl cursor-pointer select-none ${
                    selectedHours.includes(hour)
                      ? "bg-blue-base text-gray-600"
                      : ""
                  }`}
                  key={hour}
                  onClick={() => toggleHour(hour)}
                >
                  <p className="w-full text-left pl-2">{hour}</p>
                  <p className="w-full text-right">
                    {selectedHours.includes(hour) && (
                      <span className="flex">
                        <X width={14} />
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
