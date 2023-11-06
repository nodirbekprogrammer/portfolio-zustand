import { Fragment, useEffect } from "react";
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

import useEducation from "../../states/education";
import { longDate } from "../../utils/dateConvert";
import { PAGELIMIT } from "../../constants";

const EducationPage = () => {
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
    user,
    getData,
    handleOk,
    editData,
    deleteData,
    showModal,
    closeModal,
    handleSearch,
    setPage,
  } = useEducation();

  useEffect(() => {
    getData(search, page, user,);
  }, [getData, search, page, user]);

  const columns = [
    {
      title: "Education",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (data: string) => (
        <p
          style={{
            marginBottom: "0px",
          }}
        >
          {data.slice(0, 40)}
        </p>
      ),
    },
    {
      title: "Started",
      dataIndex: "startDate",
      key: "startDate",
      render: (data: string) => <p>{longDate(data.split("T")[0])}</p>,
    },
    {
      title: "Finished",
      dataIndex: "endDate",
      key: "endDate",
      render: (data: string) => <p>{longDate(data.split("T")[0])}</p>,
    },
    {
      title: "Action",
      dataIndex: "_id",
      key: "_id",
      render: (id: string) => (
        <Space size="middle">
          <Button type="primary" onClick={() => editData(form, id)}>
            Edit
          </Button>
          <Button type="primary" onClick={() => deleteData(id)} danger>
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
        bordered={true}
        scroll={{
          x: 1000,
        }}
        title={() => (
          <Fragment>
            <Flex align="center" justify="space-between" gap={36}>
              <h1 className="skills-title">Education ({total})</h1>
              <Input
                className="search-input"
                value={search}
                onChange={handleSearch}
                style={{ width: "auto", flexGrow: 1 }}
                placeholder="Searching..."
              />
              <Button onClick={() => showModal(form)} type="primary">
                Add education
              </Button>
            </Flex>
          </Fragment>
        )}
        pagination={false}
        loading={loading}
        dataSource={data}
        columns={columns}
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
        title="Education data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add education" : "Save education"}
        open={isModalOpen}
        onOk={() => handleOk(form)}
        onCancel={closeModal}
      >
        <Form
          name="category"
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
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please include educational institution name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Level"
            name="level"
            rules={[
              {
                required: true,
                message: "Please include your study level!",
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
                  "Please include a brief description of your education!",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>
          <Flex align="center" justify="space-between">
            <Form.Item
              label="Started"
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
              label="Finished"
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

export default EducationPage;
