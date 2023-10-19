import { createContext, useContext, useEffect, useReducer, useRef, useState } from "react";
import PropTypes from "prop-types";
import React from "react";
import axiosClient from "../configs/axios-client";
import { IShippingOffice } from "@/@types/shipping-office";
import { UserType } from "@/@types/auth-user";
import { User, userZodScheme } from "@/@types/user";
import { z } from "zod";
import { Box, Typography } from "@mui/material";
import { objectToFormData, safeApiCall } from "@/utils";

type ActionType = { type: string; payload: any };

const HANDLERS = {
  INITIALIZE: "INITIALIZE",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  CHANGE_INFO: "CHANGE_INFO",
};

type initialValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: any;
  signIn: (email: string, password: string) => Promise<boolean>;
  signOut: () => Promise<void>;
  uploadImg: (file: any) => void;
  uploadLogo: (file: any) => void;
  updateInfo: (body: any) => Promise<boolean>;
  updateOfficeInfo: (body: any) => Promise<boolean>;
  updateEmail: (formData: any) => Promise<boolean>;
  changePassword: (old_password: string, new_password: string) => Promise<boolean>;
};

const initialState = {
  isAuthenticated: false,
  isLoading: true,
  user: null,
};

const handlers = {
  [HANDLERS.INITIALIZE]: (state: any, action: { payload: any }) => {
    const user = action.payload;

    return {
      ...state,
      ...// if payload (user) is provided, then is authenticated
      (user
        ? {
          isAuthenticated: true,
          isLoading: false,
          user,
        }
        : {
          isLoading: false,
        }),
    };
  },
  [HANDLERS.CHANGE_INFO]: (state: any, action: { payload: any }) => {
    const user = action.payload;
    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_IN]: (state: any, action: { payload: any }) => {
    const user = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user,
    };
  },
  [HANDLERS.SIGN_OUT]: (state: any) => {
    return {
      ...state,
      isAuthenticated: false,
      user: null,
    };
  },
};

const reducer = (state: any, action: ActionType) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

// The role of this context is to propagate authentication state through the App tree.

// export const AuthContext = createContext({ undefined });
export const AuthContext = createContext<initialValue | undefined>(undefined);

export const AuthProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [authUser, setAuthUser] = useState<User | null>(null);
  const initialized = useRef(false);

  const initialize = async () => {
    // Prevent from calling twice in development mode with React.StrictMode enabled
    if (initialized.current) {
      return;
    }

    initialized.current = true;

    let isAuthenticated = false;

    try {
      isAuthenticated = window.sessionStorage.getItem("authenticated") === "true";
    } catch (err) {
      console.error(err);
    }

    if (isAuthenticated) {
      //todo get user from session
      const storageItem = sessionStorage.getItem("user");
      if (storageItem) {
        const user = JSON.parse(storageItem)
        setAuthUser(user);
        dispatch({
          type: HANDLERS.INITIALIZE,
          payload: user,
        });
      }
    }
    dispatch({
      type: HANDLERS.INITIALIZE,
      payload: null,
    });
  };

  useEffect(() => {
    initialize();
  }, []);
  // const hasRoles = (roles: string[] | undefined): boolean => {
  //   //todo check roles in backend
  //   // return authUser == null? false : authUser.roles.includes(role);
  //   if (!authUser) return false;
  //   if (!roles) return false;
  //   if (authUser.role == undefined) return false;
  //   let hasRole = false;
  //   authUser.role.forEach((role) => {
  //     if (roles.includes(role)) {
  //       hasRole = true;
  //     }
  //   });
  //   return hasRole;
  // };

  const changePassword = async (old_password: string, new_password: string) => {
    try {
      const res = await axiosClient.post("/auth/change-password", { old_password, new_password });
      window.sessionStorage.setItem("user", JSON.stringify(res.data.data));
      setAuthUser(res.data.data);
      dispatch({
        type: HANDLERS.CHANGE_INFO,
        payload: res.data.data,
      });
      return true;

    } catch (error: any) {
      return error.response;
    }
  };

  const updateInfo = async (body: any) => {
    try {
      const res = await axiosClient.put("/auth/change-info", body);
      console.log(res)
      if (res.status == 201 || res.status == 200) {
        window.sessionStorage.setItem("user", JSON.stringify(res.data.data));
        setAuthUser(res.data.data);
        dispatch({
          type: HANDLERS.CHANGE_INFO,
          payload: res.data.data,
        });
        return true;
      }
    } catch (error: any) {
      return error.response;
    }
  };
  // const updateOfficeInfo = async (body: any) => {
  //   try {
  //     const res = await axiosClient.put("/profile/update-info", body);
  //     console.log(res);
  //     if (res.status == 201 || res.status == 200) {
  //       if (authUser) {
  //         authUser.shipping_office.name = body.name
  //         authUser.shipping_office.phone = body.phone
  //         window.sessionStorage.setItem("user", JSON.stringify(authUser));
  //         setAuthUser(authUser);
  //       }
  //       dispatch({
  //         type: HANDLERS.CHANGE_INFO,
  //         payload: authUser,
  //       });
  //       return true;
  //     }
  //   } catch (error: any) {
  //     return error.response;
  //   }
  // };
  const updateEmail = async (user: UserType) => {
    try {
      const res = await axiosClient.put("/profile/update-email", {
        email: user.email,
      });
      if (res.status == 201 || res.status == 200) {
        window.sessionStorage.setItem("user", JSON.stringify(res.data.data));
        setAuthUser(res.data.data);
        dispatch({
          type: HANDLERS.CHANGE_INFO,
          payload: res.data.data,
        });
        return true;
      }
    } catch (error: any) {
      return error.response;
    }
  };

  const uploadImg = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append('avatarFile', file, file.name);
      const res = await axiosClient.post('/profile/update-avatar', formData);
      if (res.status == 201 || res.status == 200) {
        window.sessionStorage.setItem("user", JSON.stringify(res.data.data));
        setAuthUser(res.data.data);
        dispatch({
          type: HANDLERS.CHANGE_INFO,
          payload: res.data.data,
        });
        return res.data.data;
      } else {
        // Avatar upload failed
        console.error('Avatar upload failed');
      }
    } catch (error) {
      console.error('An error occurred during avatar upload', error);
    }
  }
  const uploadLogo = async (file: any) => {
    try {
      const formData = new FormData();
      formData.append('avatarFile', file, file.name);
      const res = await axiosClient.post('/profile/update-logo', formData);
      if (res.status == 201 || res.status == 200) {
        window.sessionStorage.setItem("user", JSON.stringify(res.data.data));
        setAuthUser(res.data.data);
        dispatch({
          type: HANDLERS.CHANGE_INFO,
          payload: res.data.data,
        });
        return res.data.data;
      } else {
        // Avatar upload failed
        console.error('Avatar upload failed');
      }
    } catch (error) {
      console.error('An error occurred during avatar upload', error);
    }
  }

  const AuthLoginApiResponseZodSchema = z.object({
    data: z.object({
      access_token: z.string(),
      expires_in: z.number(),
      token_type: z.string(),
      user: userZodScheme,
    }),
    message: z.string(),
    status: z.boolean(),
  });

  type AuthLoginApiResponse = z.infer<typeof AuthLoginApiResponseZodSchema>;

  const signIn = async (email: string, password: string) => {
    const res = await safeApiCall({
      axiosFn: () => axiosClient.post("/auth/login", objectToFormData({ email, password })),
      // validationSchema: AuthLoginApiResponseZodSchema,
    })

    const data: AuthLoginApiResponse["data"] = res.data;
    const user = data.user;

    if (data.access_token == undefined) {
      throw new Error("Email or password is incorrect");
    }

    window.sessionStorage.setItem("authenticated", "true");
    window.sessionStorage.setItem("token", data.access_token);
    window.sessionStorage.setItem("user", JSON.stringify(user));
    axiosClient.defaults.headers.common["Authorization"] = `Bearer ` + data.access_token;
    setAuthUser(user);
    dispatch({
      type: HANDLERS.SIGN_IN,
      payload: user,
    });
    return true;
  };

  const signOut = () => {
    window.sessionStorage.setItem("authenticated", "false");
    window.sessionStorage.removeItem("token");
    window.sessionStorage.removeItem("user");
    setAuthUser(null);
    axiosClient.defaults.headers.common["Authorization"] = `Bearer `;
    dispatch({
      type: HANDLERS.SIGN_OUT,
      payload: null,
    });
  };

  const signUp = async (username: any, name: any, password: any) => {
    throw new Error("Sign up is not implemented");
  };


  return (
    <AuthContext.Provider
      value={{
        ...state,
        signIn,
        signUp,
        signOut,
        uploadImg,
        uploadLogo,
        updateInfo,
        // updateOfficeInfo,
        updateEmail,
        changePassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export const AuthConsumer = AuthContext.Consumer;

export const useAuthContext = () => useContext(AuthContext);