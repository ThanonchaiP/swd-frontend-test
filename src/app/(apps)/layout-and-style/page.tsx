"use client";

import { Col, Flex, Row, RowProps, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ShapeCard } from "@/components/shape-card";
import { ShapeType } from "@/types";

import styles from "./page.module.scss";

const SHAPE_LIST: ShapeType[] = [
  "square",
  "circle",
  "ellipse",
  "trapezoid",
  "rectangle",
  "parallelogram",
];

export default function LayoutAndStyle() {
  const { t } = useTranslation();

  const [toggle, setToggle] = useState(false);
  const [data, setData] = useState<ShapeType[]>(SHAPE_LIST);

  const rowProps: RowProps = {
    gutter: [16, 16],
    justify: "end",
    className: "mt-1",
  };

  const moveShape = (direction: "left" | "right") => {
    setData((prev) =>
      direction === "left"
        ? [...prev.slice(1), prev[0]]
        : [prev[prev.length - 1], ...prev.slice(0, -1)]
    );
  };

  const shuffleShapes = () => {
    const shuffled = [...data];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setData(shuffled);
  };

  const renderShapeCards = (shapes: ShapeType[]) =>
    shapes.map((shape) => (
      <Col span={6} key={shape}>
        <ShapeCard type={shape} onClick={shuffleShapes} />
      </Col>
    ));

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={1}>{t("layoutAndStyle")}</Typography.Title>

      <div className={styles["container"]}>
        <Row gutter={[16, 16]} className="mb-4">
          <Col span={6}>
            <ShapeCard
              type="left"
              label="Move shape"
              onClick={() => moveShape("left")}
            />
          </Col>

          <Col span={12}>
            <Flex justify="center">
              <ShapeCard
                type="top-bottom"
                label="Move position"
                onClick={() => setToggle((prev) => !prev)}
              />
            </Flex>
          </Col>

          <Col span={6}>
            <ShapeCard
              type="right"
              label="Move shape"
              onClick={() => moveShape("right")}
            />
          </Col>
        </Row>

        <Row {...rowProps}>
          {renderShapeCards(data.slice(0, 3))}
          {toggle && <Col span={3} />}
        </Row>

        <Row {...rowProps}>
          {renderShapeCards(data.slice(3))}
          {!toggle && <Col span={3} />}
        </Row>
      </div>
    </Flex>
  );
}
