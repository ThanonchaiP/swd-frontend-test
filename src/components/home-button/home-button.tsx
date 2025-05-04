import { Button } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export const HomeButton = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const pathname = usePathname();

  const handleClick = () => {
    router.push("/");
  };

  if (pathname === "/") {
    return null;
  }

  return (
    <Button
      onClick={handleClick}
      style={{ position: "fixed", top: 60, right: 10 }}
    >
      {t("home")}
    </Button>
  );
};
