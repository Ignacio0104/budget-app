import { Formik, Form } from "formik";
import { useState, useEffect } from "react";
import * as yup from "yup";
import CustomInput from "./CustomInput";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore, setDoc } from "firebase/firestore";
import { app } from "../../firebase/fibaseConfig";
import "./RegisterForm.scss";
import { CircularProgress } from "@mui/material";

const loginSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name too short ")
    .required("This field is required!"),
  lastname: yup
    .string()
    .min(2, "Lastname too short ")
    .required("This field is required!"),
  email: yup.string().email().required(),
  password: yup
    .string()
    .min(8, "Password is too short")
    .matches(/^(?=.*[a-z])/, "Must contain one lower case letter")
    .matches(/^(?=.*[A-Z])/, "Must contain one upper case letter")
    .matches(/^(?=.*[0-9])/, "Must contain one number")
    .matches(/^(?=.*[!@#\$%\^&\*])/, "Must contain one special character")
    .required("This field is required!"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const Register = ({ handleError, confirmSubmit }) => {
  const [registerRequest, setRegisterRequest] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState({
    passwordOne: true,
    passwordTwo: true,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setRegisterRequest({ ...registerRequest, [field]: value });
  };

  const handleSubmit = async () => {
    const auth = getAuth();
    const db = getFirestore(app);

    setSubmitting(true);

    createUserWithEmailAndPassword(
      auth,
      registerRequest.email,
      registerRequest.password
    )
      .then(async (userCredential) => {
        const collectionRef = collection(db, "users");
        await addDoc(collectionRef, {
          name: registerRequest.name,
          lastname: registerRequest.lastname,
          email: registerRequest.email,
          profilPic: "",
          uid: userCredential.user.uid,
        });
        handleError({ open: false, error: "", severity: "" });
        confirmSubmit(true);
      })
      .catch((error) => {
        if (error.message.includes("already-in-use")) {
          handleError({
            open: true,
            error:
              "El email ingresado ya se encuentra registrado en nuestro sistema",
            severity: "warning",
          });
        } else {
          handleError({
            open: true,
            error: error.message,
            severity: "warning",
          });
        }
      })
      .finally(setSubmitting(false));
  };

  const togglePassword = (index) => {
    setPasswordVisible((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };
  return (
    <div className="login-container">
      <div className="manual-login-container">
        <Formik
          initialValues={registerRequest}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
        >
          {(props) => (
            <Form className="input-container">
              <CustomInput
                label="Name"
                name="name"
                type="text"
                placeholder="Name..."
                handleChange={handleChange}
              ></CustomInput>
              <CustomInput
                label="Lastname"
                name="lastname"
                type="text"
                placeholder="Lastname..."
                handleChange={handleChange}
              ></CustomInput>
              <CustomInput
                label="Email"
                name="email"
                type="text"
                placeholder="Email..."
                handleChange={handleChange}
              ></CustomInput>
              <div className="password-container">
                <CustomInput
                  label="Password"
                  name="password"
                  type={passwordVisible.passwordOne ? "password" : "text"}
                  placeholder="Password..."
                  handleChange={handleChange}
                ></CustomInput>
                <div
                  className="eye-icon-container"
                  onClick={() => togglePassword("passwordOne")}
                >
                  {passwordVisible.passwordOne ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </div>
              </div>
              <div className="password-container">
                <CustomInput
                  label="Password"
                  name="passwordConfirmation"
                  type={passwordVisible.passwordTwo ? "password" : "text"}
                  placeholder="Confirm Password..."
                  handleChange={handleChange}
                ></CustomInput>
                <div
                  className="eye-icon-container"
                  onClick={() => togglePassword("passwordTwo")}
                >
                  {passwordVisible.passwordTwo ? (
                    <VisibilityIcon />
                  ) : (
                    <VisibilityOffIcon />
                  )}
                </div>
              </div>
              <div className="register-submit-btn">
                <button className="submit-btn" type="submit">
                  {submitting ? (
                    <CircularProgress size="20px" color="info" />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
