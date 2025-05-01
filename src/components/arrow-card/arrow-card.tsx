import styles from "./arrow-card.module.scss";

type ArrowDirection = "left" | "right" | "top-bottom";

type ArrowCardProps = {
  direction: ArrowDirection;
  label: string;
};

export function ArrowCard({ direction, label }: ArrowCardProps) {
  const renderArrow = () => {
    if (direction === "top-bottom") {
      return (
        <>
          <div className={styles["arrow-wrapper"]}>
            <div className={styles["arrow-top"]} />
          </div>
          <div className={styles["arrow-wrapper"]}>
            <div className={styles["arrow-bottom"]} />
          </div>
        </>
      );
    }

    return <div className={styles[`arrow-${direction}`]} />;
  };

  return (
    <div className={styles["card"]}>
      <div className={styles["card-body"]}>{renderArrow()}</div>
      <div className={styles["card-info"]}>{label}</div>
    </div>
  );
}
