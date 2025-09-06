import type { WheelPickerOption } from "@/components/wheel-picker";
import { WheelPicker, WheelPickerWrapper } from "@/components/wheel-picker";
import { useEffect, useState } from "react";

const createArray = (length: number, add = 0): WheelPickerOption[] =>
  Array.from({ length }, (_, i) => {
    const value = i + add;
    return {
      label: value.toString().padStart(2, "0"),
      value: value.toString().padStart(2, "0"),
    };
  });

const hourOptions = createArray(24, 1);
const minuteOptions = createArray(60);

type TimePickerWeelProps = {
  onChange: (...event: unknown[]) => void;
  defaultHours: string;
  defaultMinutes: string;
};

export function TimePickerWeel({
  onChange,
  defaultHours,
  defaultMinutes,
}: TimePickerWeelProps) {
  const [hours, setHours] = useState(defaultHours);
  const [minutes, setMinutes] = useState(defaultMinutes);

  useEffect(() => {
    onChange(`${hours}:${minutes}`);
  }, [onChange, hours, minutes]);

  return (
    <div className="">
      <WheelPickerWrapper>
        <WheelPicker
          visibleCount={12}
          options={hourOptions}
          infinite
          defaultValue={hours}
          onValueChange={setHours}
        />
        <WheelPicker
          visibleCount={12}
          infinite
          options={minuteOptions}
          defaultValue={minutes}
          onValueChange={setMinutes}
        />
      </WheelPickerWrapper>
    </div>
  );
}
