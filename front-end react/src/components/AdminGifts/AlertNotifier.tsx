import React from 'react'
import { Alert } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../reduxStore/hooks';
import { setShowAlert } from '../../reduxStore/slices/adminGiftsSlice';

export default function AlertNotifier() {

  const { showAlert, alertData } = useAppSelector(state => state.gifts);

  const dispatch = useAppDispatch();
  
  return (
    alertData && <Alert show={showAlert} variant={alertData.variant} onClose={() => dispatch(setShowAlert(false))} dismissible>
      <Alert.Heading>{alertData.title}</Alert.Heading>
      <p>{alertData.message}</p>
    </Alert>
  )
}
  