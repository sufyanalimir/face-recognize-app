import React from "react";
const InputForm = ({ onInputChange, onBtnSubmit }) => {
  return (
    <>
      <p className="f3 center">
        {"This magic brain will detect faces in your pictures."}
      </p>
      <div className="center">
        <div className="form center">
          <input
            type="text"
            className="f4 pa2 w-70 center"
            onChange={onInputChange}
            placeholder="Enter image url"
          />
          <button
            className="w-30 ml2 grow f4 link ph3 pv2 dib white bg-dark-gray"
            onClick={onBtnSubmit}
          >
            Detect
          </button>
        </div>
      </div>
    </>
  );
};

export default InputForm;
