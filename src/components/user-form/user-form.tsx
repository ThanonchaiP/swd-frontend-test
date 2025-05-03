import { Button, Col, DatePicker, Form, Input, Radio, Row, Select } from "antd";
import type { RuleObject } from "antd/es/form";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import {
  createUser,
  clearSelectedUser,
  selectSelectedUser,
  updateUser,
} from "@/store/slices/formSlice";
import { User } from "@/types";

import { CitizenInput } from "./citizen-Input";
import { MobilePhoneInput } from "./mobile-phone-input";
import styles from "./user-form.module.scss";

export const UserForm = () => {
  const [form] = Form.useForm<User>();

  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(selectSelectedUser);

  const required = {
    required: true,
    message: "This field is required",
  };

  const onFinish = (values: User) => {
    if (selectedUser) {
      dispatch(updateUser(values));
    } else {
      dispatch(createUser(values));
      form.resetFields();
    }
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
    form.setFieldsValue(selectedUser);
  }, [form, selectedUser]);

  return (
    <Form form={form} onFinish={onFinish} className={styles["form-wrapper"]}>
      <Row gutter={[12, 0]}>
        <Col span={4}>
          <Form.Item label="Title" name="title" rules={[required]}>
            <Select
              options={[
                { label: "Mr.", value: "mr." },
                { label: "Mrs.", value: "mrs." },
                { label: "Ms.", value: "ms." },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item label="Firstname" name="firstname" rules={[required]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item label="Lastname" name="lastname" rules={[required]}>
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item label="Birthday" name="birthday" rules={[required]}>
            <DatePicker />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item label="Nationality" name="nationality" rules={[required]}>
            <Select
              options={[
                { label: "Thai", value: "thai" },
                { label: "France", value: "france" },
                { label: "American", value: "american" },
              ]}
              placeholder="-- Please Select --"
            />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="CitizenID"
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
          <Form.Item label="Gender" name="gender" rules={[required]}>
            <Radio.Group
              options={[
                { label: "Male", value: "male" },
                { label: "Female", value: "Female" },
                { label: "Unsex", value: "unsex" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={14}>
          <Form.Item
            label="Mobie Phone"
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
          <Form.Item label="Passport No" name="passport">
            <Input style={{ maxWidth: 286 }} />
          </Form.Item>
        </Col>
        <Col span={14}>
          <Form.Item
            label="Expected salary"
            name="expectedSalary"
            rules={[required]}
          >
            <Input style={{ maxWidth: 250 }} />
          </Form.Item>
        </Col>
        <Col span={4}>
          <Button onClick={resetFields}>RESET</Button>
        </Col>
        <Col span={4}>
          <Button htmlType="submit">SUBMIT</Button>
        </Col>
      </Row>
    </Form>
  );
};
