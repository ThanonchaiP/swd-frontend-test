import { Select } from "antd";
import { useTranslation } from "react-i18next";

import styles from "./language-switcher.module.scss";

export const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  return (
    <Select
      defaultValue={i18n.language}
      onChange={handleChange}
      className={styles["language-select"]}
      labelRender={({ value }) => t(value.toString())}
      optionRender={({ value }) => t(value?.toString() ?? "en")}
      options={[
        { value: "th", label: "TH" },
        { value: "en", label: "EN" },
      ]}
    />
  );
};
