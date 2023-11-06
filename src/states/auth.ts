import { create } from "zustand";
import { ROLE, TOKEN, USERID } from "../constants";
import Cookies from "js-cookie";
import { request } from "../server/request";
import { NavigateFunction } from "react-router-dom";
import { Login, Register } from "../types/auth";
import { message } from "antd";

type AuthTypes = {
  isAuthenticated: boolean;
  userId: string;
  role: null | string;
  login: (data: Login, navigate: NavigateFunction) => void;
  register: (data: Register, navigate: NavigateFunction) => void;
  logOut: (navigate: NavigateFunction) => void;
};

export const useAuth = create<AuthTypes>((set) => ({
  isAuthenticated: Cookies.get(TOKEN) ? true : false,
  userId: Cookies.get(USERID) || "",
  role: Cookies.get(ROLE) || "",
  login: async (data, navigate) => {
    try {
      const res = await request.post("auth/login", data);
      const role = res.data.user.role;

      if (role === "user") {
        navigate("/user-account");
        message.success("You are not yet a client, please wait");
      } else {
        Cookies.set(TOKEN, res.data.token);
        Cookies.set(USERID, res.data.user._id);
        Cookies.set(ROLE, res.data.user.role);
        request.defaults.headers.Authorization = `Bearer ${res.data.token}`;
        set({ isAuthenticated: true, userId: res.data.user._id, role: role });
        navigate("/dashboard");
        message.success("You have successfully logged in!")
      }
    } catch (err) {
      message.error("Error")
    }
  },
  register: async (data, navigate) => {
    try {
      const res = await request.post("auth/register", data);
      if (res.data.user.role === "user") navigate("/register-succes");
      else {
        Cookies.set(TOKEN, res.data.token);
        Cookies.set(USERID, res.data.user._id);
        request.defaults.headers.Authorization = `Bearer ${res.data.token}`;
        set({ isAuthenticated: true });
        set({ userId: res.data.user._id });
        navigate("/user-experiences");
      }
    } catch (err) {
      console.log(err);
    }
  },
  logOut: async (navigate) => {
    Cookies.remove(TOKEN);
    Cookies.remove(USERID);
    Cookies.remove(ROLE);
    set({ isAuthenticated: false, userId: "", role: "" });
    navigate("/");
  },
}));
