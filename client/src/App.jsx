import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/index";
import Chat from "./pages/chat/index";
import Profile from "./pages/profile";
import { useAppStore } from "./store";
import { useReducer, useState, useEffect } from "react";
import { apiClient } from "./lib/api-client";
import {GET_USER_INFO} from "./utils/constants.js"
import Loading from "./components/Loading";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children : <Navigate to="/auth" />;
};

const AuthRoute = ({ children }) => {
  const { userInfo } = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to="/chat" /> : children;
};



function App() {

  const {userInfo, setUserInfo} = useAppStore()
  const [loading, setLoading] = useState(true)

  
  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await apiClient.get(GET_USER_INFO, { withCredentials: true });
        if (response.status === 200 && response.data.id) {
          setUserInfo(response.data);
        } else {
          setUserInfo(undefined);
        }
      } catch (error) {
        console.log({ error });
        setUserInfo(undefined);
      } finally {
        setLoading(false); // Stop loading when data is fetched or an error occurs
      }
    };

    if (!userInfo) {
      setLoading(true); // Show loading component on refresh
      getUserData();     // Fetch user data
    } else {
      setLoading(false); // If userInfo is already available, no need to load
    }
  }, [userInfo, setUserInfo]);

  
  
  if(loading){
    return ( <Loading />)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth"
          element={
            <AuthRoute>
              <Auth />
            </AuthRoute>
          }
        />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/auth" />} /> //wild card route
      </Routes>
    </BrowserRouter>
  );
}

export default App;
