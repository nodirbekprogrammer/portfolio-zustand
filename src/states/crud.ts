import React from "react";
import { FormInstance } from "antd";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { request } from "../server/request";
import ApiData from "../types/api";
import PhotoData from "../types/photo";

const CRUD = <T>(url: string) => {
  interface DataStateTypes {
    search: string;
    total: number;
    page: number;
    loading: boolean;
    photoLoad: boolean;
    photo: PhotoData | null;
    data: T[];
    selected: null | string;
    isModalLoading: boolean;
    isModalOpen: boolean;

    getData: (search: string, page: number, userId: string) => void;
    handleOk: (form: FormInstance, userId: string) => void;
    editData: (form: FormInstance, id: string, userId: string) => void;
    deleteData: (id: string, userId: string) => void;
    showModal: (form: FormInstance) => void;
    closeModal: () => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setPage: (page: number) => void;
    uploadPhoto: (file: FormData) => void;
  }

  return create<DataStateTypes>()(
    devtools((set, get) => {
      const setState = (obj: object) => {
        set((state) => ({ ...state, ...obj }));
      };

      return {
        search: "",
        total: 0,
        loading: false,
        data: [],
        imgLoading: false,
        image: {
          _id: "",
          name: "",
        },
        page: 1,
        selected: null,
        isModalLoading: false,
        isModalOpen: false,
        getData: async (search, page, userId) => {
          try {
            const params = { search, page };
            setState({ loading: true });
            const {
              data: { pagination, data },
            } = await request.get<ApiData>(
              `${url}?${userId ? `user=${userId}` : ""}`,
              {
                params,
              }
            );
            const newData = data.map((el: object, i: number) => ({
              ...el,
              key: i,
            }));
            setState({ data: newData, total: pagination?.total });
          } finally {
            setState({ loading: false });
          }
        },
        showModal: (form) => {
          setState({ isModalOpen: true, selected: null });
          form.resetFields();
        },
        closeModal: () => {
          setState({ isModalOpen: false, photo: null });
        },
        handleOk: async (form, userId) => {
          try {
            const selected = get();
            const values = await form.validateFields();

            setState({
              isModalLoading: true,
            });

            if (selected === null) {
              await request.post(url, values);
            } else {
              await request.put(`${url}/${selected}`, values);
            }
            const { page, search, getData } = get();
            setState({
              isModalOpen: false,
            });
            getData(search, page, userId);
            form.resetFields();
          } finally {
            set({ isModalLoading: false });
          }
        },
        editData: async (form, id, userId) => {
          try {
            setState({
              selected: id,
              loading: true,
              isModalOpen: true,
            });
            const { data } = await request.get(`${url}/${id}`);
            const { page, search, getData } = get();
            setState({ isModalOpen: false });
            getData(search, page, userId);
            form.setFieldsValue(data);
          } finally {
            setState({ selected: id, loading: false });
          }
        },
        uploadPhoto: async (file) => {
          try {
            setState({ photoLoad: true });
            const { data } = await request.post(`upload`, file);
            setState({ photo: data });
          } finally {
            setState({ photoLoad: false });
          }
        },
        deleteData: async (id, userId) => {
          try {
            setState({
              loading: true,
            });
            await request.delete(`${url}/${id}`);
            const { page, search, getData } = get();
            getData(search, page, userId);
          } finally {
            setState({
              loading: false,
            });
          }
        },
        handleSearch: (e) => setState({ search: e.target.value, page: 1 }),
        setPage: (page) => setState({ page }),
      };
    })
  );
};

export default CRUD;
