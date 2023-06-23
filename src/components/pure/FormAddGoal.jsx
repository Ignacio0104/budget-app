import { Form, Formik } from "formik";
import * as yup from "yup";
import React, { useRef, useState } from "react";
import CustomInput from "./CustomInput";
import { CircularProgress } from "@mui/material";
import "./FormAddGoal.css";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import uploadIcon from "../../assets/images/upload-icon.png";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../../firebase/fibaseConfig";
import { doc, getFirestore, setDoc } from "firebase/firestore";

const goalSchema = yup.object().shape({
  description: yup
    .string()
    .required("This field is required!")
    .min(2, "Description too short!"),
  total: yup
    .number()
    .required("This field is required!")
    .min(1, "Amount must be greater than 0!"),
});

const FormAddGoal = () => {
  const [goalToSubmit, setGoalToSubmit] = useState({
    description: "",
    total: 0,
    currency: "pesos",
    image: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState({ url: "", file: "" });
  const location = useLocation();
  const inputRef = useRef(null);
  const storage = getStorage(app);
  const db = getFirestore(app);
  const userUID = location.state.userUID;

  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);

  const handleClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const imageRegex = /\.(jpe?g|png|gif|bmp|ico|svg)$/i;
    const fileObj = event.target.files && event.target.files[0];

    if (!fileObj || !imageRegex.test(fileObj.name)) {
      return;
    } else {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage({
          ...selectedImage,
          file: reader.result,
          url: event.target.files[0],
        });
      };
      reader.readAsDataURL(fileObj);
    }
  };

  const handleChange = (field, value) => {
    setGoalToSubmit({ ...goalToSubmit, [field]: value });
  };

  const updloadFile = async () => {
    const storageRef = ref(storage, `${userUID}/${goalToSubmit.description}`);
    const snapshot = await uploadBytes(storageRef, selectedImage.url);
    const data = await getDownloadURL(storageRef);
    setGoalToSubmit({ ...goalToSubmit, image: data });
    return data;
  };

  const handleGoalSubmit = async (values, { resetForm }) => {
    if (!isSubmitting) {
      setIsSubmitting(true);
      const imageURL = await updloadFile();
      let goal = {
        [goalToSubmit.description]: {
          total: goalToSubmit.total,
          currency: goalToSubmit.currency,
          image: imageURL,
        },
      };
      await setDoc(doc(db, "goals", userUID), goal, {
        merge: true,
      });
      setGoalToSubmit({
        ...goalToSubmit,
        description: "",
        total: 0,
        currency: "pesos",
        image: "",
      });
      setSelectedImage({ ...selectedImage, url: "", file: "" });
      setIsSubmitting(false);
      resetForm();
    }
  };
  return (
    <div className="main-goal-add-container">
      <Formik
        initialValues={goalToSubmit}
        onSubmit={handleGoalSubmit}
        validationSchema={goalSchema}
      >
        {(props) => (
          <Form className="input-container">
            <div className="goal-title-container">
              <label>Titulo: </label>
              <CustomInput
                label="Description"
                name="description"
                handleChange={handleChange}
              ></CustomInput>
            </div>
            <div className="goal-total-container">
              <label>Monto: </label>
              <CustomInput
                label="Total"
                type="number"
                name="total"
                min={0}
                handleChange={handleChange}
              ></CustomInput>
            </div>
            <div className="goal-currency-container">
              <label>Moneda: </label>
              <select
                onChange={(e) => handleChange("currency", e.target.value)}
              >
                <option value={"Pesos"}>Pesos</option>
                <option value={"Euros"}>Euros</option>
                <option value={"Dolares"}>Dolares</option>
              </select>
            </div>
            <div className="goal-image-container">
              <label>
                {selectedImage.file === "" ? (
                  "Sin imagen"
                ) : (
                  <div className="image-selected-container">
                    <img src={selectedImage.file} alt="Selected" />
                  </div>
                )}
              </label>
              <input
                style={{ display: "none" }}
                ref={inputRef}
                type="file"
                onChange={handleFileChange}
                accept="image/*"
              />
              <button className="upload-button" onClick={(e) => handleClick(e)}>
                Subir imagen
                <img
                  className="upload-icon"
                  src={uploadIcon}
                  alt="upload"
                  name="image"
                ></img>
              </button>
            </div>
            <button className="submit-btn" type="submit">
              {isSubmitting ? (
                <CircularProgress size={20}></CircularProgress>
              ) : (
                "Submit"
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormAddGoal;
