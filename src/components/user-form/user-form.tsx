import { Button, Col, DatePicker, Form, Input, Radio, Row, Select } from "antd";
import type { RuleObject } from "antd/es/form";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import {
  createUser,
  clearSelectedUser,
  selectSelectedUser,
  updateUser,
} from "@/store/slices/userSlice";
import { UserFormValues } from "@/types";

import { CitizenInput } from "./citizen-Input";
import { MobilePhoneInput } from "./mobile-phone-input";
import styles from "./user-form.module.scss";

export const UserForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<UserFormValues>();

  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(selectSelectedUser);

  const required = {
    required: true,
    message: "This field is required",
  };

  const onFinish = (values: UserFormValues) => {
    const { birthday, ...rest } = values;

    const payload = {
      ...rest,
      birthday: birthday.format("YYYY/MM/DD"),
    };

    if (selectedUser) {
      dispatch(updateUser(payload));
    } else {
      dispatch(createUser(payload));
    }

    form.resetFields();
  };

  const validateCitizenID = (_: RuleObject, value: string) => {
    if (!value) return Promise.resolve();

    const splitValues = value.split("-");
    const isValidFormat =
      splitValues.length === 5 &&
      !splitValues.some((segment) => segment.length === 0);

    return isValidFormat
      ? Promise.resolve()
      : Promise.reject("Invalid CitizenID format");
  };

  const validatePhoneNumber = (_: RuleObject, value: string) => {
    if (!value) return Promise.resolve();

    const splitValues = value.split("-");
    const isValidFormat =
      splitValues.length === 2 &&
      !splitValues.some((segment) => segment.length === 0);

    return isValidFormat
      ? Promise.resolve()
      : Promise.reject("Invalid Phone format");
  };

  const resetFields = () => {
    form.resetFields();
    dispatch(clearSelectedUser());
  };

  useEffect(() => {
    if (!selectedUser) return;

    form.setFieldsValue({
      ...selectedUser,
      birthday: dayjs(selectedUser.birthday),
    });
  }, [form, selectedUser]);

  return (
    <Form form={form} onFinish={onFinish} className={styles["form-wrapper"]}>
      <Row gutter={[12, 0]}>
        <Col span={5}>
          <Form.Item label={t("title")} name="title" rules={[required]}>
            <Select
              options={[
                { label: t("mr"), value: "mr." },
                { label: t("mrs"), value: "mrs." },
                { label: t("ms"), value: "ms." },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item label={t("firstname")} name="firstname" rules={[required]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item label={t("lastname")} name="lastname" rules={[required]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label={t("birthday")} name="birthday" rules={[required]}>
            <DatePicker placeholder={t("selectDate")} />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            label={t("nationality")}
            name="nationality"
            rules={[required]}
          >
            <Select
              options={[
                { label: t("thai"), value: "thai" },
                { label: t("france"), value: "france" },
                { label: t("american"), value: "american" },
              ]}
              placeholder={t("pleaseSelect")}
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label={t("citizenID")}
            name="citizenID"
            rules={[
              {
                validator: validateCitizenID,
                validateTrigger: "onSubmit",
              },
            ]}
          >
            <CitizenInput />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={t("gender")} name="gender" rules={[required]}>
            <Radio.Group
              options={[
                { label: t("male"), value: "male" },
                { label: t("female"), value: "female" },
                { label: t("unsex"), value: "unsex" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={14}>
          <Form.Item
            label={t("mobilePhone")}
            name="phone"
            rules={[
              required,
              {
                validator: validatePhoneNumber,
                validateTrigger: "onBlur",
              },
            ]}
          >
            <MobilePhoneInput />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label={t("passportNo")} name="passport">
            <Input style={{ maxWidth: 286 }} />
          </Form.Item>
        </Col>
        <Col span={14}>
          <Form.Item
            label={t("expectedSalary")}
            name="expectedSalary"
            rules={[required]}
          >
            <Input style={{ maxWidth: 250 }} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Button onClick={resetFields}>{t("reset")}</Button>
        </Col>
        <Col span={4}>
          <Button htmlType="submit">{t("submit")}</Button>
        </Col>
      </Row>
    </Form>
  );
};
