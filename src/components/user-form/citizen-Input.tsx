import { Flex, Input } from "antd";
import React from "react";

type CitizenInputProps = {
  value?: string;
  onChange?: (value: string) => void;
};

export const CitizenInput = ({ value = "", onChange }: CitizenInputProps) => {
  const splitValues = value.split("-");

  const handleChange = (index: number, val: string) => {
    const newSplit = [...splitValues];
    newSplit[index] = val;

    const newValue = newSplit.join("-");
    onChange?.(newValue);
  };

  return (
    <Flex gap={4} align="center">
      {Array.from({ length: 5 }).map((_, index) => (
        <React.Fragment key={index}>
          <Input
            style={{
              width: [80, 120, 120, 100, 80][index],
              textAlign: "center",
            }}
            value={splitValues[index]}
            onChange={(e) => handleChange(index, e.target.value)}
          />
          {index < 4 && <span style={{ margin: "0 4px" }}>-</span>}
        </React.Fragment>
      ))}
    </Flex>
  );
};
