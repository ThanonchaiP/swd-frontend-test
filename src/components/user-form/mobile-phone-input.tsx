import { Flex, Input, Select } from "antd";

import { FranceFlag } from "@/icons/france-flag";
import { ThaiFlag } from "@/icons/thai-flag";
import { UsFlag } from "@/icons/us-flag";

interface MobilePhoneInputProps {
  value?: string;
  onChange?: (value: string) => void;
}

export const MobilePhoneInput: React.FC<MobilePhoneInputProps> = ({
  value = "",
  onChange,
}) => {
  const [countryCode = "", phoneNumber = ""] = value.split("-");

  const countryData = [
    { code: "+66", country: "Thailand", FlagComponent: ThaiFlag },
    { code: "+1", country: "USA", FlagComponent: UsFlag },
    { code: "+33", country: "France", FlagComponent: FranceFlag },
  ];

  const handleCountryCodeChange = (newCode: string) => {
    onChange?.(newCode + (phoneNumber ? `-${phoneNumber}` : ""));
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newNumber = e.target.value;
    onChange?.(countryCode + (newNumber ? `-${newNumber}` : ""));
  };

  return (
    <Flex align="center" gap={12}>
      <Select
        value={countryCode || undefined}
        onChange={handleCountryCodeChange}
        options={countryData.map(({ code, FlagComponent }) => ({
          value: code,
          label: (
            <Flex align="center" gap={4}>
              <FlagComponent />
              {code}
            </Flex>
          ),
        }))}
        placeholder="Country"
        style={{ width: 120 }}
      />
      <span>-</span>
      <Input
        value={phoneNumber}
        onChange={handlePhoneNumberChange}
        placeholder="Phone Number"
      />
    </Flex>
  );
};
