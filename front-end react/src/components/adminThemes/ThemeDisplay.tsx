import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./ThemeDisplay.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CreateThemeForm from "./CreateThemeComponent";
import EditThemeForm from "./EditThemeComponent";
import DeleteThemeForm from "./DeleteThemeComponent";
import Theme from "../../common/types/themesData";
function ThemeDisplay() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [editTheme, setEditTheme] = useState<Theme | null>(null);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [deleteTheme, setDeleteTheme] = useState<Theme | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const fetchThemes = () => {
    axios
      .get("http://localhost:4000/admin/themes")
      .then((res) => {
        console.log(res);
        setThemes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchThemes();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchQuery(value);
  };

  const handleAddButton = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreate = () => {
    setShowCreateModal(false);
  };

  const handleEditButton = (theme: Theme) => {
    setEditTheme(theme);
    setShowEditModal(true);
  };

  const handleCloseEdit = () => {
    setEditTheme(null);
    setShowEditModal(false);
  };

  const handleDeleteButton = (theme: Theme) => {
    setDeleteTheme(theme);
    setShowDeleteModal(true);
  };

  const handleDelete = () => {
    if (deleteTheme) {
      axios
        .delete(
          `http://localhost:4000/admin/deleteTheme/${deleteTheme.themeId}`
        )
        .then((res) => {
          console.log("Theme deleted:", deleteTheme.themeName);
          const updatedThemes = themes.filter(
            (theme) => theme.themeId !== deleteTheme.themeId
          );
          setThemes(updatedThemes);
          setShowDeleteModal(false);
        })
        .catch((error) => {
          console.error("Error deleting theme:", error);
        });
    }
  };
  const filteredThemes = themes.filter((theme) =>
    theme.themeName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          className={`form-control ${styles.searchInput}`}
          type="search"
          placeholder="&#128269;Search Theme ..."
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button
          className={`btn btn-primary ${styles.addThemeButton}`}
          onClick={handleAddButton}
        >
          Add Theme
        </button>
      </div>
      <div className={styles.themeContainer}>
        <div className="row">
          {filteredThemes.map((theme) => (
            <div
              className={`col-md-4 mb-4 ${styles.themeCard}`}
              key={theme.themeId}
            >
              <div className={styles.card}>
                <div className={styles.cardBody}>
                  <h5 className={styles.cardTitle}>{theme.themeName}</h5>
                  <p className={styles.cardText}>Price: {theme.themePrice}</p>
                  <p className={styles.cardText}>
                    Description: {theme.themeDetails}
                  </p>
                  <div className={styles.buttons}>
                    <div className={styles.buttonContainer}>
                      <IconButton
                        aria-label="delete"
                        style={{ margin: "0 5px" }}
                        onClick={() => handleDeleteButton(theme)}
                        className={styles.deleteButton}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditButton(theme)}
                        className={styles.editButton}
                      >
                        <EditIcon />
                      </IconButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Modal show={showEditModal} onHide={handleCloseEdit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Theme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editTheme && (
            <EditThemeForm
              theme={editTheme}
              onThemeUpdated={fetchThemes}
              onClose={handleCloseEdit}
            />
          )}
        </Modal.Body>
      </Modal>

      {/* Add Theme Modal */}
      <Modal show={showCreateModal} onHide={handleCloseCreate}>
        <Modal.Header closeButton>
          <Modal.Title>Add Theme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateThemeForm onThemeAdded={fetchThemes} />
        </Modal.Body>
      </Modal>

      {/* Delete Theme Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Theme</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {deleteTheme && (
            <DeleteThemeForm
              theme={deleteTheme}
              onCancel={() => setShowDeleteModal(false)}
              onThemeDeleted={fetchThemes}
              onDelete={handleDelete}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default ThemeDisplay;
