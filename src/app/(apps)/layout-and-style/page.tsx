"use client";

import { Col, Flex, Row, Typography } from "antd";
import { useTranslation } from "react-i18next";

export default function LayoutAndStyle() {
  const { t } = useTranslation();

  return (
    <Flex vertical gap={16}>
      <Typography.Title level={1}>{t("layoutAndStyle")}</Typography.Title>

      <Row gutter={[16, 16]}>
        <Col span={24}>col</Col>
        <Col span={24}>col</Col>
        <Col span={24}>col</Col>
        <Col span={24}>col</Col>
        <Col span={24}>col</Col>
      </Row>
    </Flex>
  );
}
