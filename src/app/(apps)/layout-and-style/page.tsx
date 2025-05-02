"use client";

import { Col, Flex, Row, Typography } from "antd";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ShapeCard } from "@/components/shape-card";
import { ShapeType } from "@/types";

import styles from "./page.module.scss";

const SHAPE_LIST = [
  "square",
  "circle",
  "ellipse",
  "trapezoid",
  "rectangle",
  "parallelogram",
] as ShapeType[];

export default function LayoutAndStyle() {
  const { t } = useTranslation();

  const [data, setData] = useState<ShapeType[]>(SHAPE_LIST);
  const [toggle, setToggle] = useState(false);

  const moveShape = (direction: "left" | "right") => {
    setData((prev) => {
      if (direction === "left") {
        const [first, ...rest] = prev;
        return [...rest, first];
      } else {
        const last = prev[prev.length - 1];
        return [last, ...prev.slice(0, -1)];
      }
    });
  };

  const randomShape = () => {
    const newData = [...data];
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newData[i], newData[j]] = [newData[j], newData[i]];
    }
    setData(newData);
  };

  const movePosition = () => {
    setToggle((prev) => !prev);
  };

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
            <Flex>
              <ShapeCard
                type="top-bottom"
                label="Move position"
                onClick={movePosition}
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

        <Row gutter={[16, 16]} justify="end" className="mt-1">
          {data.slice(0, 3).map((shape) => (
            <Col span={6} key={shape}>
              <ShapeCard type={shape} onClick={randomShape} />
            </Col>
          ))}
          {toggle && <Col span={3} />}
        </Row>

        <Row gutter={[16, 16]} justify="end" className="mt-1">
          {data.slice(3, data.length).map((shape) => (
            <Col span={6} key={shape}>
              <ShapeCard type={shape} onClick={randomShape} />
            </Col>
          ))}
          {!toggle && <Col span={3} />}
        </Row>
      </div>
    </Flex>
  );
}
