import React from 'react';
import { useCallback, useEffect } from "react";
import GiftsTable from "./GiftsTable";
import { getAllGifts } from "../../services/AdminGiftsService";
import { Button } from "react-bootstrap";
import GiftsFormModal from "./GiftsFormModal";
import { useAppDispatch } from "../../reduxStore/hooks";
import { setFormType, setGifts, setShowAddGiftForm } from "../../reduxStore/slices/adminGiftsSlice";
import GiftDeleteConfirmation from "./GiftDeleteConfirmation";
import styles from "./styles/AdminGifts.module.scss";
import AlertNotifier from './AlertNotifier';

export default function AdminGifts() {
  
  const dispatch = useAppDispatch();

  useEffect(() => {
    getAllGifts()
      .then(response => dispatch(setGifts(response.data)))
      .catch(err => console.error(err));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const onAddGiftClick = useCallback(() => {
    dispatch(setFormType('ADD'));
    dispatch(setShowAddGiftForm(true));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  } ,[]);

  return (
    <div className="p-3 container">
      <div className="giftsHeader d-flex justify-content-end">
        <Button variant="primary" onClick={onAddGiftClick} >Add Gift</Button>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className={`w-100 ${styles.tableContainer}`}>
          <GiftsTable />
        </div>
      </div>
      <GiftsFormModal />
      <GiftDeleteConfirmation />
      <div className='position-fixed start-50 translate-middle' style={{top: '4rem'}}>
        <AlertNotifier />
      </div>
    </div>
  )
}
