import { ShapeType } from "@/types";

import styles from "./shape-card.module.scss";

type ShapeCardProps = {
  label?: string;
  type: ShapeType;
  onClick?: () => void;
};

export function ShapeCard({ type, label, onClick }: ShapeCardProps) {
  const renderArrow = () => {
    if (type === "top-bottom") {
      return (
        <>
          <div className={styles["shape-wrapper"]}>
            <div className={styles["shape-top"]} />
          </div>
          <div className={styles["shape-wrapper"]}>
            <div className={styles["shape-bottom"]} />
          </div>
        </>
      );
    }

    return <div className={styles[`shape-${type}`]} />;
  };

  return (
    <div className={styles["card"]} onClick={onClick}>
      <div className={styles["card-body"]}>{renderArrow()}</div>
      {label && <div className={styles["card-info"]}>{label}</div>}
    </div>
  );
}
