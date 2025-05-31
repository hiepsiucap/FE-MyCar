/** @format */

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axios";

const backendURL = import.meta.env.VITE_API_BACKEND;

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ firstName, lastName, email, phoneNumber, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/register', {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      });
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Đăng ký không thành công. Vui lòng thử lại.");
      }
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async (body, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/login', body.data);
      return response.data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue("Đăng nhập không thành công. Vui lòng thử lại.");
      }
    }
  }
);
