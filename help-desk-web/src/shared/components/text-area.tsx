import type { ComponentProps } from "react";
import circle_alert from "../../shared/assets/icons/circle-alert.svg";

type TextAreaProps = ComponentProps<"textarea"> & {
  legend: string;
  helperText?: string;
  className?: string;
  isError?: boolean;
};

export function TextArea({
  legend,
  helperText,
  className,
  isError,
  ...rest
}: TextAreaProps) {
  return (
    <fieldset className="focus-within:text-blue-600 flex flex-col text-gray-300">
      {legend && (
        <label
          htmlFor={legend}
          className={`uppercase placeholder:text-gray-900 text-2xs focus:text-inherit font-medium ${
            isError && "text-red-600"
          }`}
        >
          {legend}
        </label>
      )}

      <textarea
        id={legend}
        {...rest}
        className={`w-full pb-20 border-0 border-b-1 border-gray-500 font-normal text-gray-900  focus:border-blue-400 focus:outline-none focus:placeholder:text-transparent ${className}`}
      />

      {helperText && (
        <p
          className={`text-xs mb-4 flex ${
            isError ? "text-red-600" : "italic text-gray-400"
          }`}
        >
          {isError && <img className="mr-2" src={circle_alert} />}
          {helperText}
        </p>
      )}
    </fieldset>
  );
}
