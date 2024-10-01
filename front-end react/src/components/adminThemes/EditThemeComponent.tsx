import React, { useState } from "react";
import axios from "axios";
import Theme from "../../common/types/themesData";
import styles from './AdminThemes.module.scss'
import { validateNumber } from "../../common/validators/ThemeValidator";
import Alert from 'react-bootstrap/Alert';
import { BsExclamationTriangle,BsCheckCircle } from 'react-icons/bs';

interface EditThemeFormProps {
  theme: Theme;
  onClose: () => void;
  onThemeUpdated: () => void; 
}

const EditThemeForm: React.FC<EditThemeFormProps> = ({ theme, onClose,onThemeUpdated}) => {
  const [themeName, setThemeName] = useState<string>(theme.themeName);
  const [themePrice, setThemePrice] = useState<number | string>(theme.themePrice);
  const [themeDescription, setThemeDescription] = useState<string>(theme.themeDetails);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleUpdateTheme = () => {
    const updatedTheme = {
      themeName: themeName,
      themePrice: typeof themePrice === 'string' ? parseFloat(themePrice) : themePrice,
      themeDetails: themeDescription
    };
    axios
      .put(`http://localhost:4000/admin/editTheme/${theme.themeId}`, updatedTheme)
      .then((res) => {
        setSuccessMessage("Theme Updated Successfully !");
        onThemeUpdated();  
        setTimeout(() => {
          setSuccessMessage("");
        }, 50000);
      })
      .catch((err) => {
        console.error("Error updating theme:", err);
      });
  };
  
  const handleChangeThemePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const isValidPrice = validateNumber(value);
    if (isValidPrice || value === "") {
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
            <label htmlFor="themeName">Theme Name:</label>
            <input
              type="text"
              id="enterThemeName"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              data-testid="enterThemeName" 
            />
          </div>

          <div className={styles.formGroup}>
          <label htmlFor="themePrice" className={styles.formLabel}>Theme Price:</label>
            <input
              type="text"
              id="enterThemePrice"
              value={typeof themePrice === 'string' ? themePrice : themePrice.toString()}
              onChange={handleChangeThemePrice}
              data-testid="enterThemePrice"
            />
            {errorMessage && (
              <Alert variant="danger" className="mt-2">
                <BsExclamationTriangle className="me-2" />
                {errorMessage}
              </Alert>
            )}
          </div>
          
          <div className={styles.formGroup}>
            <label htmlFor="themeDescription">Theme Description:</label>
            <textarea
              id="enterThemeDescription"
              value={themeDescription}
              onChange={(e) => setThemeDescription(e.target.value)}
              data-testid="enterThemeDescription"
            />
          </div>
          <button type="button" className="btn btn-success" onClick={handleUpdateTheme}>Update</button>
        </>
      )}
    </div>
  );
};

export default EditThemeForm;


