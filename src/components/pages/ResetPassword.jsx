import React, { useState } from "react";
import CustomInput from "../pure/CustomInput";
import { Form, Formik } from "formik";
import { Oval } from "react-loader-spinner";
import * as yup from "yup";
import "./ResetPassword.css";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const resetSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("This field is required!"),
});

const ResetPassword = () => {
  const [mailRequest, setmMailRequest] = useState({ email: "" });
  const [isLoading, setIsLoading] = useState(false);
  const auth = getAuth();

  const handleSubmit = () => {
    setIsLoading(true);
    sendPasswordResetEmail(auth, mailRequest.email).then(() => {
      setIsLoading(false);
    });
  };
  const handleChange = (field, value) => {
    setmMailRequest({ ...mailRequest, [field]: value });
  };
  return (
    <div className="main-reset-container">
      <div className="form-reset-container">
        <h3 className="reset-title">Reinicia tu clave</h3>
        <p>
          Ingresa tu dirección de correo electrónico para que podamos enviarte
          el mail de reinicio de clave
        </p>
        <Formik
          initialValues={mailRequest}
          onSubmit={handleSubmit}
          validationSchema={resetSchema}
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
              <button className="submit-btn" type="submit">
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
                  "Enviar"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPassword;
