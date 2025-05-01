"use client";

import { Col, Flex, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";

import { ArrowCard } from "@/components/arrow-card";

import styles from "./page.module.scss";

export default function LayoutAndStyle() {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={1}>{t("layoutAndStyle")}</Typography.Title>

      <div className={styles["container"]}>
        <Row gutter={[16, 16]}>
          <Col span={7}>
            <ArrowCard direction="left" label="Move shape" />
          </Col>

          <Col span={10}>
            <Flex>
              <ArrowCard direction="top-bottom" label="Move position" />
            </Flex>
          </Col>

          <Col span={7}>
            <ArrowCard direction="right" label="Move shape" />
          </Col>
        </Row>
      </div>
    </Flex>
  );
}
