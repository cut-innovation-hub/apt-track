import { useToast } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import BlueButton from "../../components/Buttons/BlueButton";
import GeneralLayout from "../../layouts/GeneralLayout";
import OrDivider from "../../components/OrDivider/OrDivider";
import GoogleButton from "../../components/Buttons/GoogleButton";
import navigator_svg from "../../assets/svgs/navigator1.svg";
import AuthInput from "../../components/Inputs/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { getError } from "../../utils/getError";
import { Store } from "../../context/Store";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../../services/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(Store);
  const toast = useToast();

  const auth = getAuth(firebaseApp);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate()

  const login_with_Credentials = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`${apiUrl}/api/auth/login`, {
        email: email,
        password: password,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      setLoading(false);
      toast({
        title: "Account Created",
        status: "success",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
      navigate('/map')
    } catch (error) {
      setLoading(false);
      toast({
        title: getError(error),
        status: "error",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  const login_with_Google = async () => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const { data } = await axios.post(`${apiUrl}/api/auth/login`, {
        email: user.email,
        googleAuthId: user.uid,
      });
      dispatch({ type: "USER_LOGIN", payload: data });
      setLoading(false);
      toast({
        title: "Account Created",
        status: "success",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {}
  };

  return (
    <GeneralLayout>
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:pt-24 pt-16">
          <div className="md:col-span-1 col-span-2 flex flex-col items-start md:p-8 p-2 space-y-8">
            <p className="text-3xl font-bold text-blue-900">Welcome Back</p>
            <AuthInput
              label={"Email"}
              type="email"
              placeholder="Email"
              value={email}
              setValue={setEmail}
            />
            <AuthInput
              label={"Password"}
              placeholder="*******"
              type="password"
              value={password}
              setValue={setPassword}
            />
            <div className="w-full flex flex-row space-x-2 items-center">
              <BlueButton
                onClick={login_with_Credentials}
                loading={loading}
                text="Sign In"
                text_size={"text-lg"}
              />
              <Link
                to="/register"
                className="w-1/3 capitalize cursor-pointer hover:bg-gray-100 font-semibold text-blue-900 text-center rounded-lg p-3 text-lg"
              >
                Sign Up
              </Link>
            </div>
            <OrDivider />
            <GoogleButton onClick={login_with_Google} loading={loading} />
          </div>
          <div className="col-span-1 md:grid hidden items-center content-center justify-center lg:p-16 md:p-12">
            <img
              src={navigator_svg}
              alt="right side navigator svg"
              className="object-cover w-auto max-w-full"
            />
          </div>
        </div>
      </div>
    </GeneralLayout>
  );
}

export default Login;
