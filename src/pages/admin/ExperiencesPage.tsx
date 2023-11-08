import { Fragment, memo, useEffect } from "react";
import {
  Button,
  Flex,
  Form,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";

import { PAGELIMIT } from "../../constants";
import { longDate } from "../../utils/dateConvert";
import { UserInfo } from "../../types/userInfo";
import { useAuth } from "../../states/auth";
import useExperinence from "../../states/experince";

const ExperiencePage = () => {
  const [form] = Form.useForm();

  const {
    search,
    total,
    loading,
    data,
    selected,
    page,
    isModalLoading,
    isModalOpen,
    getData,
    handleOk,
    editData,
    deleteData,
    showModal,
    closeModal,
    handleSearch,
    setPage,
  } = useExperinence();

  const { userId } = useAuth();

  useEffect(() => {
    getData(search, page, userId);
  }, [getData, search, page, userId]);

  const columns = [
    {
      title: "Full name",
      dataIndex: "user",
      key: "user",
      render: (user: UserInfo) =>
        `${user?.firstName ?? "Not Found"} ${user?.lastName ?? ""}`,
    },
    {
      title: "Position",
      dataIndex: "workName",
      key: "workName",
    },
    {
      title: "Company",
      dataIndex: "companyName",
      key: "workName",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (data: string) => (
        <p style={{ marginBottom: "0px" }}>{data.slice(0, 40)}...</p>
      ),
    },
    {
      title: "Started",
      dataIndex: "startDate",
      key: "startDate",
      render: (date: string) => <p>{longDate(date)}</p>,
    },
    {
      title: "Finished",
      dataIndex: "endDate",
      key: "endDate",
      render: (date: string) => <p>{longDate(date)}</p>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editData(form, id, userId)}>
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() =>
              Modal.confirm({
                title: "Do you want to delete this experience?",
                onOk: () => deleteData(id, userId),
              })
            }
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <Fragment>
      <Table
        className="skills-table"
        scroll={{
          x: 1000,
        }}
        pagination={false}
        loading={loading}
        dataSource={data}
        columns={columns}
        bordered={true}
        title={() => (
          <Fragment>
            <Flex align="center" justify="space-between" gap={36}>
              <h1 className="skills-title">Experience ({total})</h1>
              <Input
                className="search-input"
                value={search}
                onChange={handleSearch}
                style={{ width: "auto", flexGrow: 1 }}
                placeholder="Searching..."
              />
              <Button onClick={() => showModal(form)} type="primary">
                Add experience
              </Button>
            </Flex>
          </Fragment>
        )}
      />
      {total > PAGELIMIT ? (
        <Pagination
          className="pagination"
          total={total}
          pageSize={PAGELIMIT}
          current={page}
          onChange={(page) => setPage(page)}
        />
      ) : null}
      <Modal
        title="Experience data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add experience" : "Save experience"}
        open={isModalOpen}
        onOk={() => handleOk(form, userId)}
        onCancel={closeModal}
      >
        <Form
          name="experience"
          autoComplete="off"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
        >
          <Form.Item
            label="Position"
            name="workName"
            rules={[
              {
                required: true,
                message: "Please include your role or position!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Company"
            name="companyName"
            rules={[
              {
                required: true,
                message: "Please include company you work for!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message:
                  "Please enter a brief description about your experience !",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Flex align="center" justify="space-between">
            <Form.Item
              label="Start date"
              name="startDate"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <input className="date-picker" type="date" />
            </Form.Item>

            <Form.Item
              label="End date"
              name="endDate"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <input className="date-picker" type="date" />
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </Fragment>
  );
};

const MemoExperiencePage = memo(ExperiencePage);

export default MemoExperiencePage;
