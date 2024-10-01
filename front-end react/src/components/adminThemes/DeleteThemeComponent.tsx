import React, { useState } from "react";
import axios from "axios";
import Theme from "../../common/types/themesData";
import styles from './AdminThemes.module.scss';
import {BsCheckCircle } from 'react-icons/bs';

interface DeleteThemeProps {
  theme: Theme;
  onDelete: () => void; 
  onCancel: () => void;
  onThemeDeleted: () => void;
}

const DeleteThemeForm: React.FC<DeleteThemeProps> = ({ theme, onDelete, onCancel, onThemeDeleted }) => {
  const [isDeleted, setIsDeleted] = useState<boolean>(false);
  const [isDeletedSuccessfully, setIsDeletedSuccessfully] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const handleDelete = () => {
    axios
      .delete(`http://localhost:4000/admin/deleteTheme/${theme.themeId}`)
      .then(() => {
        console.log("Theme deleted:", theme.themeName);
        setIsDeleted(true); 
        onThemeDeleted(); 
        setIsDeletedSuccessfully(true); 
      })
      .catch((error) => {
        console.error("Error deleting theme:", error);
      });
  };
  const handleCancelDelete = () => {
    onThemeDeleted();
    onCancel();
  };

  return (
    <div className={styles.deleteConfirmation}>
    {!isDeleted && !isDeletedSuccessfully && ( 
      <>
        <p>Are you sure you want to delete the theme "{theme.themeName}"?</p>
        <div className={styles.confirmationButtons}>
          <button type="button" className={`btn btn-success ${styles.confirmationButton}`} onClick={handleDelete}>Yes</button>
          <button type="button" className="btn btn-danger" onClick={handleCancelDelete}>No</button>
        </div>
      </>
    )}
    {isDeletedSuccessfully && ( 
    <p className={styles.successMessage}>
    <BsCheckCircle className="text-success me-2" /> 
    Theme "{theme.themeName}" Deleted Successfully !
  </p>
    )}
  </div>  
  );
};

export default DeleteThemeForm;
