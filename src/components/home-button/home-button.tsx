import { Button } from "antd";
import { usePathname, useRouter } from "next/navigation";

export const HomeButton = () => {
  const router = useRouter();
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
      Home
    </Button>
  );
};
