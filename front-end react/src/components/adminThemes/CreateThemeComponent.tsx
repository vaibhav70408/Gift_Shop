import React, { useState } from "react";
import axios from "axios";
import styles from './AdminThemes.module.scss';
import { validateNumber } from "../../common/validators/ThemeValidator";
import { BsExclamationTriangle,BsCheckCircle } from 'react-icons/bs';

interface CreateThemeFormProps {
    onThemeAdded: () => void;
  }

const CreateThemeForm: React.FC<CreateThemeFormProps> = ({onThemeAdded}) => {
    const [themeName, setThemeName] = useState<string>("");
    const [themePrice, setThemePrice] = useState<string>("");
    const [themeDetails, setThemeDetails] = useState<string>("");
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const handleAddTheme = async () => {
        try {
            await axios.post("http://localhost:4000/admin/addTheme", {
                themeName,
                themePrice,
                themeDetails,
            });
        onThemeAdded();
            setSuccessMessage("Theme added successfully !");
            setTimeout(() => {
                setSuccessMessage("");
            }, 5000);
        } catch (error) {
            console.error("Error adding theme:", error);
        }
    };

    const handleChangeThemePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const isValidNumber = validateNumber(value);
        if (isValidNumber || value === "") {
            setThemePrice(value);
            setErrorMessage("");
        } else {
            setErrorMessage("Please enter a valid number !");
        }
    };

    return (
      <div className={styles.createThemeForm}>
        {successMessage ? (
          <p className={styles.successMessage}>
            <BsCheckCircle className="text-success me-2" />
            {successMessage}
          </p>
        ) : (
          <>
            <div className={styles.formGroup}>
              <label htmlFor="enterThemeName">Theme Name:</label>
              <input
                type="text"
                id="enterThemeName"
                className="form-control"
                value={themeName}
                onChange={(e) => setThemeName(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="enterThemePrice">Theme Price:</label>
              <input
                type="text"
                id="enterThemePrice"
                className="form-control"
                value={themePrice}
                onChange={handleChangeThemePrice}
              />
              {errorMessage && (
                <div className="alert alert-danger mt-2" role="alert">
                  <BsExclamationTriangle className="me-1" />
                  {errorMessage}
                </div>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="enterThemeDescription">Theme Description:</label>
              <textarea
                id="enterThemeDescription"
                className="form-control"
                value={themeDetails}
                onChange={(e) => setThemeDetails(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-success"
              onClick={handleAddTheme}
            >
              Add
            </button>
          </>
        )}
      </div>
    );
};

export default CreateThemeForm;

