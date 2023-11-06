import React from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { request } from "../server/request";
import { FormInstance } from "antd";
import ApiData from "../types/api";
import { ROLE, USERID } from "../constants";
import Cookies from "js-cookie";

const CRUD = <T>(url: string) => {

  interface DataStateTypes {
    search: string;
    total: number;
    page: number;
    loading: boolean;
    data: T[];
    selected: null | string;
    isModalLoading: boolean;
    isModalOpen: boolean;
    role?: string | null;
    user?: string;
    getData: (search: string, page: number, user: string | undefined) => void;
    // getSingleData: (id: string, form: FormInstance<object>) => void;
    handleOk: (form: FormInstance) => void;
    editData: (form: FormInstance, id: string) => void;
    deleteData: (id: string) => void;
    showModal: (form: FormInstance) => void;
    closeModal: () => void;
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
    setPage: (page: number) => void;
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
        role: Cookies.get(ROLE),
        user: Cookies.get(USERID),
        imgLoading: false,
        image: {
          _id: "",
          name: "",
        },
        page: 1,
        selected: null,
        isModalLoading: false,
        isModalOpen: false,
        getData: async (search, page, user) => {
          try {
            const params = { search, page, user };
            setState({ loading: true });
            const {
              data: { pagination, data },
            } = await request.get<ApiData>(url, {
              params,
            });
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
        handleOk: async (form) => {
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
            const { page, search, user, getData } = get();
            setState({
              isModalOpen: false,
            });
            getData(search, page, user);
            form.resetFields();
          } finally {
            set({ isModalLoading: false });
          }
        },
        editData: async (form, id) => {
          try {
            setState({
              selected: id,
              loading: true,
              isModalOpen: true,
            });
            const { data } = await request.get(`${url}/${id}`);
            form.setFieldsValue(data);
          } finally {
            setState({ selected: id, loading: false });
          }
        },
        deleteData: async (id) => {
          try {
            setState({
              loading: true,
            });
            await request.delete(`${url}/${id}`);
            const { page, search, user, getData } = get();
            getData(search, page, user);
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
