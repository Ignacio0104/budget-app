import { useField } from "formik";
import { useEffect } from "react";
import "./CustomInput.scss";

const CustomInput = ({ label, handleChange, toogleVisibility, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="custom-input-container">
      {props.type !== "textarea" ? (
        <input
          {...field}
          {...props}
          className={meta.touched && meta.error ? "input-error" : "input-ok"}
          onBlur={(e) => handleChange(props.name, e.target.value)}
        />
      ) : (
        <textarea
          {...field}
          {...props}
          className={meta.touched && meta.error ? "input-error" : "input-ok"}
          onBlur={(e) => handleChange(props.name, e.target.value)}
        ></textarea>
      )}

      <div
        className={`error`}
        style={{
          display: `${meta.touched && meta.error ? "inherit" : "none"}`,
        }}
      >
        {meta.error}
      </div>
    </div>
  );
};

export default CustomInput;
