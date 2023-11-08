import { Fragment, memo, useEffect } from "react";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  Modal,
  Pagination,
  Space,
  Table,
} from "antd";

import { Link } from "react-router-dom";
import { PAGELIMIT } from "../../constants";

import usePortfolio from "../../states/portfolio";
import { useAuth } from "../../states/auth";
import { getPhoto } from "../../utils/getPhoto";
import PhotoData from "../../types/photo";
import { UserInfo } from "../../types/userInfo";

const PortfoliosPage = () => {
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
    uploadPhoto,
    showModal,
    closeModal,
    handleSearch,
    setPage,
  } = usePortfolio();
  const { userId } = useAuth();

  useEffect(() => {
    getData(search, page, userId);
  }, [getData, search, page, userId]);

  const choosePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = new FormData();
    file.append(
      "file",
      e.target.files instanceof FileList ? e.target.files[0] : ""
    );
    uploadPhoto(file);
  };

  const columns = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo: PhotoData) => (
        <Image
          height={50}
          width={50}
          style={{
            objectFit: "cover",
            borderRadius: "50%",
          }}
          src={getPhoto(photo)}
        />
      ),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Portfolio url",
      dataIndex: "url",
      key: "url",
      render: (data: string) => (
        <Link to={data} rel="noreferrer" target="_blank">
          {data}
        </Link>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Posted by",
      key: "posted-by",
      dataIndex: "user",
      render: (user: UserInfo) =>
        `${user?.firstName ?? "Not"} ${user?.lastName ?? "Found"}`,
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
                title: "Do you want to delete this portfolio ?",
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
              <h1 className="skills-title">Portfolios ({total})</h1>
              <Input
                className="search-input"
                value={search}
                onChange={handleSearch}
                style={{ width: "auto", flexGrow: 1 }}
                placeholder="Searching..."
              />
              <Button onClick={() => showModal(form)} type="primary">
                Add portfolio
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
        title="Portfolio data"
        maskClosable={false}
        confirmLoading={isModalLoading}
        okText={selected === null ? "Add portfolio" : "Save portfolio"}
        open={isModalOpen}
        onOk={() => handleOk(form, userId)}
        onCancel={closeModal}
      >
        <Form
          name="portfolio"
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
                message: "Please include project name!",
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
                message: "Please enter a brief description of your project !",
              },
            ]}
          >
            <Input.TextArea showCount maxLength={100} />
          </Form.Item>

          <Form.Item
            label="External link"
            name="url"
            rules={[
              {
                required: true,
                message: "Please enter a valid url !",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <div>
            <input
              className="upload-btn"
              type="file"
              onChange={(e) => choosePhoto(e)}
            />
            {/* {photo ? <Image src={getPhoto(photo)} /> : null} */}
          </div>
        </Form>
      </Modal>
    </Fragment>
  );
};

const MemoPortfoliosPage = memo(PortfoliosPage);

export default MemoPortfoliosPage;
