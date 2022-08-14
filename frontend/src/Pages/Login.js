import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "react-google-login";
import Meta from "../Components/Meta";
import styled from "styled-components";
import axios from "axios";
import AuthContext from '../Context/auth'

const GGLogin = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`;

const Login = () => {
  const { setUser } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleFailure = (result) => {
    alert(result);
  };
  const handleLogin = async (googleData) => {
    const config = { "Content-type": "application/json" };

    const res = await axios.post(
      "/google-login",
      { token: googleData.tokenId },
      config
    );

    const data = res.data;
    localStorage.setItem("loginData", data);
    setUser(data)
    navigate("/", { replace: true });
  };

  return (
    <GGLogin>
      <Meta title='Đăng nhập vào Cinema App' />
      <h3>Login with your Google Account</h3>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={handleLogin}
        onFailure={handleFailure}
        cookiePolicy={"single_host_origin"}
      />
    </GGLogin>
  );
};

export default Login;
