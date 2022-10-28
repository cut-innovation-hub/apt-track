import { useToast } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import BlueButton from "../../components/Buttons/BlueButton";
import GeneralLayout from "../../layouts/GeneralLayout";
import OrDivider from "../../components/OrDivider/OrDivider";
import GoogleButton from "../../components/Buttons/GoogleButton";
import navigator_svg from "../../assets/svgs/navigator1.svg";
import AuthInput from "../../components/Inputs/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { firebaseApp } from "../../services/firebase";
import { getError } from "../../utils/getError";
import axios from "axios";
import { apiUrl } from "../../utils/apiUrl";
import { Store } from "../../context/Store";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(Store);
  const toast = useToast();
  const auth = getAuth(firebaseApp);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  // register with google
  const register_With_Google = async () => {
    try {
      setLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const { data } = await axios.post(`${apiUrl}/api/auth/register`, {
        email: user.email,
        agreed: agreed,
        role: "passenger",
        method: "google",
        username: user.displayName,
        googleAuthId: user.uid,
        photoURL: user.photoURL,
        phoneNumber: user.phoneNumber
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
      navigate("/map");
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

  // register with credentials
  const register_With_Credentials = async () => {
    try {
      setLoading(true);
      await axios.post(`${apiUrl}/api/auth/register`, {
        email: email,
        agreed: agreed,
        role: "passenger",
        method: "email",
        password: password,
        username: username,
      });
      navigate("/login");
      toast({
        title: "Account Created",
        status: "success",
        position: "top-right",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
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
  
  return (
    <GeneralLayout>
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-2 md:pt-24 pt-16">
          <div className="md:col-span-1 col-span-2 flex flex-col items-start md:p-8 p-2 space-y-8">
            <p className="text-3xl font-bold text-blue-900">Create Account</p>
            <AuthInput
              label={"Username"}
              type="text"
              placeholder="Username"
              value={username}
              setValue={setUsername}
            />
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
                loading={loading}
                onClick={register_With_Credentials}
                text="Sign Up"
                text_size={"text-lg"}
              />
              <Link
                to="/login"
                className="w-1/3 capitalize cursor-pointer hover:bg-gray-100 font-semibold text-blue-900 text-center rounded-lg p-3 text-lg"
              >
                Sign In
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  value={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-blue-primary focus:ring-red-400"
                />
                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-gray-900"
                >
                  I agree to the{" "}
                  <span className="text-blue-900">terms and conditions</span>
                </label>
              </div>
            </div>

            <OrDivider />
            <GoogleButton loading={loading} onClick={register_With_Google} />
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

export default Register;
