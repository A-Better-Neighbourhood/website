/** @format */

"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/components/ui/input-group";

type PhoneInputProps = Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "onChange" | "value"
> & {
  value: string;
  onChange: (value: string) => void;
};

export function PhoneInput({ value, onChange, ...props }: PhoneInputProps) {
  return (
    <InputGroup>
      <InputGroupInput
        {...props}
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        placeholder="98765 43210"
        value={value}
        onChange={(e) => onChange(e.target.value.replace(/\D/g, "").slice(0, 10))}
      />
      <InputGroupAddon align="inline-start">
        <InputGroupText>+91</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
