import React from 'react';
import { Button, Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../reduxStore/hooks";
import { setAlertData, setDeleteGiftId, setGifts, setShowAlert, setShowDeleteGiftConfirmation } from "../../reduxStore/slices/adminGiftsSlice";
import { deleteGiftById, getAllGifts } from "../../services/AdminGiftsService";
import { Alert } from '../../common/types/giftState';

export default function GiftDeleteConfirmation() {

  const dispatch = useAppDispatch();

  const { deleteGiftId, showDeleteGiftConfirmation } = useAppSelector(state => state.gifts);

  const handleOnYesClick = () => {
    if(!deleteGiftId) return;

    deleteGiftById(deleteGiftId)
      .then(() => getAllGifts())
      .then(response => {
        const alertData: Alert = {
          title: 'Success',
          message: 'Gift deleted successfully!',
          variant: 'success'
        };

        dispatch(setGifts(response.data));
        dispatch(setShowDeleteGiftConfirmation(false));
        dispatch(setAlertData(alertData));
        dispatch(setShowAlert(true));
      })
      .catch(err => {
        console.error(err);
        const alertData: Alert = {
          title: 'Error',
          message: 'Action could not be performed',
          variant: 'danger'
        };
        dispatch(setAlertData(alertData));
        dispatch(setShowAlert(true));
      });
  };

  const handleOnNoClick = () => {
    dispatch(setDeleteGiftId(null));
    dispatch(setShowDeleteGiftConfirmation(false));
  };

  return (
    <Modal
      show={showDeleteGiftConfirmation}
      onHide={handleOnNoClick}
    >
      <Modal.Header closeButton>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="danger" onClick={handleOnYesClick}>Yes</Button>
        <Button variant="light" onClick={handleOnNoClick}>No</Button>
      </Modal.Footer>
    </Modal>
  )
}
