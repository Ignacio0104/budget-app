import { Formik, Form } from "formik";
import { useState } from "react";
import "./LoginForm.scss";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import CustomInput from "../pure/CustomInput";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { FcGoogle } from "react-icons/fc";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { app } from "../../firebase/fibaseConfig";
import { Oval } from "react-loader-spinner";
import useFirebase from "../../hooks/useFirebase";

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("This field is required!"),
  password: yup.string().required("This field is required!"),
});

const LoginForm = ({ toogleLogin, setError }) => {
  const [loginRequest, setLoginRequest] = useState({ email: "", password: "" });
  const [passwordVisible, setPasswordVisible] = useState("password");
  const [isLoading, setisLoading] = useState(false);
  const handleChange = (field, value) => {
    setLoginRequest({ ...loginRequest, [field]: value });
  };
  const { db, auth } = useFirebase();
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    provider.setCustomParameters({ prompt: "select_account" });
    console.log("Here");
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const email = result.user.email;
        const docRef = collection(db, "users");
        const userQuery = query(docRef, where("email", "==", email));

        const querySnapshot = await getDocs(userQuery);
        if (querySnapshot.docs.length > 0) {
          toogleLogin();

          navigate("/home");
        } else {
          const userCollectionRef = collection(db, "users");
          const nameArray = result?.user?.displayName?.split(/\s+/);
          nameArray &&
            (await addDoc(userCollectionRef, {
              name: nameArray[0],
              lastname: nameArray[1],
              email: result.user.email,
              profilPic: "",
              uid: result.user.uid,
            }));
        }
      })
      .catch((error) => {
        console.log(error);
        setError({ open: true, error: error.message, severity: "warning" });
      });
  };

  const handleSubmit = () => {
    const auth = getAuth();
    setisLoading(true);
    signInWithEmailAndPassword(auth, loginRequest.email, loginRequest.password)
      .then((userCredential) => {
        toogleLogin();
        navigate("/home");
      })
      .catch((error) => {
        setError({ open: true, error: error, severity: "warning" });
      })
      .finally(setisLoading(false));
  };

  const tooglePassword = () => {
    setPasswordVisible(passwordVisible === "password" ? "text" : "password");
  };
  return (
    <div className="login-container">
      <div className="manual-login-container">
        <Formik
          initialValues={loginRequest}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
        >
          {(props) => (
            <Form className="input-container">
              <div className="email-container">
                <CustomInput
                  label="Email"
                  name="email"
                  type="text"
                  placeholder="Email..."
                  handleChange={handleChange}
                ></CustomInput>
              </div>
              <div className="password-container">
                <CustomInput
                  label="Password"
                  name="password"
                  type={passwordVisible}
                  placeholder="Password..."
                  handleChange={handleChange}
                ></CustomInput>
                <div className="eye-icon-container" onClick={tooglePassword}>
                  {passwordVisible === "password" ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </div>
              </div>
              <div className="login-btn-container">
                <button className="login-btn" type="submit">
                  {isLoading ? (
                    <Oval
                      height={20}
                      width={20}
                      color="#f5f5f5"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      ariaLabel="oval-loading"
                      secondaryColor="#4fa94d"
                      strokeWidth={4}
                      strokeWidthSecondary={2}
                    />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <div className="division-google">
          <div className="line-google-one"></div>
          <h3>O</h3>
          <div className="line-google-one"></div>
        </div>
        <div className="login-google-container">
          <button className="google-login" onClick={handleGoogleLogin}>
            <h3 className="google-login-title">Login con Google</h3>
            <FcGoogle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
