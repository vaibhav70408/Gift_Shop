import React from 'react';
import GiftsForm from './GiftsForm';
import { Modal } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../reduxStore/hooks';
import { setEditGiftData, setEditGiftId, setShowAddGiftForm } from '../../reduxStore/slices/adminGiftsSlice';
import resetGiftData from '../../common/constants/resetEditGiftData';

export default function GiftsFormModal() {

  const dispatch = useAppDispatch();
  
  const { showAddGiftForm, formType } = useAppSelector(state => state.gifts);

  const handleOnHide = () => {
    dispatch(setEditGiftId(null));
    dispatch(setEditGiftData(resetGiftData));
    dispatch(setShowAddGiftForm(false));
  };

  return (
    <Modal
      show={showAddGiftForm}
      backdrop="static"
    >
      <Modal.Header>
        <h2 className='text-center'>{formType === 'ADD' ? 'Add Gift' : 'Edit Gift'}</h2>
        <button type="button" className="btn-close" aria-label="Close" data-testid="modal-close-button" onClick={handleOnHide}></button>
      </Modal.Header>
      <GiftsForm />
      <Modal.Footer />
    </Modal>
  )
}
