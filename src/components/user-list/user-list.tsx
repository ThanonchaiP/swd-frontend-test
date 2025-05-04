import type { PaginationProps } from "antd";
import { Button, Checkbox, Flex, Pagination, Table, Typography } from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { useAppDispatch, useAppSelector } from "@/store/configureStore";
import {
  getUsers,
  mockData,
  removeByIds,
  removeUser,
  selectUsers,
  setSelectedUser,
} from "@/store/slices/userSlice";
import { User } from "@/types";

import styles from "./user-list.module.scss";

const PAGE_SIZE = 10;

type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];

export const UserList = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [page, setPage] = useState(1);

  const deleteUser = (userId: string) => {
    dispatch(removeUser(userId));
  };

  const onEdit = (user: User) => {
    dispatch(setSelectedUser(user));
  };

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  const columns: ColumnsType<User> = [
    {
      title: t("name"),
      key: "name",
      sorter: (a, b) => a.firstname.localeCompare(b.firstname),
      render: (_, record) => (
        <Typography.Text>
          {record.firstname} {record.lastname}
        </Typography.Text>
      ),
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      key: "gender",
      sorter: (a, b) => a.gender.localeCompare(b.gender),
      render: (gender: string) => t(gender),
    },
    {
      title: t("mobilePhone"),
      dataIndex: "phone",
      key: "phone",
      sorter: (a, b) => a.phone.localeCompare(b.phone),
      render: (phone: string) => phone.split("-").join(""),
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      key: "nationality",
      sorter: (a, b) => a.nationality.localeCompare(b.nationality),
      render: (nationality: string) => t(nationality),
    },
    {
      title: t("manage"),
      key: "manage",
      render: (_, record) => (
        <Flex gap={8}>
          <Typography.Link
            className={styles["action-color"]}
            onClick={() => onEdit(record)}
          >
            {t("edit")}
          </Typography.Link>
          <Typography.Link
            className={styles["action-color"]}
            onClick={() => deleteUser(record.id)}
          >
            {t("delete")}
          </Typography.Link>
        </Flex>
      ),
    },
  ];

  const itemRender: PaginationProps["itemRender"] = (
    _,
    type,
    originalElement
  ) => {
    if (type === "prev") return <a>{t("prev")}</a>;
    if (type === "next") return <a>{t("next")}</a>;
    return originalElement;
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const onSelectAll = (selected: boolean) => {
    if (selected) {
      const keys = users.map((row) => row.id);
      setSelectedRowKeys(keys);
    } else {
      setSelectedRowKeys([]);
    }
  };

  const deleteSelectedUsers = () => {
    if (selectedRowKeys.length === 0) return;
    dispatch(removeByIds(selectedRowKeys as string[]));
    setSelectedRowKeys([]);
  };

  const initialMockData = () => {
    dispatch(mockData());
  };

  const rowSelection: TableRowSelection<User> = {
    selectedRowKeys,
    onChange: onSelectChange,
    preserveSelectedRowKeys: true,
  };

  useEffect(() => {
    if (users.length <= 10) setPage(1);
  }, [users]);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <div className={styles["container"]}>
      <Flex align="center" gap={8} className="mt-2">
        <Checkbox
          checked={
            users.length === 0 ? false : selectedRowKeys.length === users.length
          }
          onChange={({ target }) => onSelectAll(target.checked)}
        >
          {t("selectAll")}
        </Checkbox>
        <Button
          onClick={deleteSelectedUsers}
          disabled={selectedRowKeys.length === 0}
        >
          {t("delete")}
        </Button>
        <Button type="primary" onClick={initialMockData}>
          {t("mockData")}
        </Button>
      </Flex>

      <Flex justify="flex-end" className="mb-1">
        <Pagination
          current={page}
          total={users.length}
          itemRender={itemRender}
          onChange={handlePageChange}
        />
      </Flex>

      <Table
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={users.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)}
        pagination={false}
      />
    </div>
  );
};
