import React from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import AddEditGift from '../../common/types/addEditGift';
import { addGift, editGiftById, getAllGifts } from '../../services/AdminGiftsService';
import { useAppDispatch, useAppSelector } from '../../reduxStore/hooks';
import { setAlertData, setEditGiftData, setEditGiftId, setGifts, setShowAddGiftForm, setShowAlert } from '../../reduxStore/slices/adminGiftsSlice';
import resetGiftData from '../../common/constants/resetEditGiftData';
import { Alert } from '../../common/types/giftState';

const validationSchema = yup.object({
  giftName: yup.string().required('Name is required').max(255, 'Name cannot exceed 255 characters'),
  giftPrice: yup.number().required('Price is required').positive(),
  giftImageUrl: yup.string().url('Must be a valid URL').required('Image URL is required').max(255, 'Image URL cannot exceed 255 characters'),
  giftDetails: yup.string().required('Description is required').max(255, 'Description cannot exceed 255 characters'),
});

export default function GiftsForm() {
  const dispatch = useAppDispatch();

  const { formType, editGiftId, editGiftData } = useAppSelector(state => state.gifts);

  const makeAPICall = (formType: string, values: AddEditGift, giftId: string | null) => {
    return (formType === 'ADD') ? addGift(values) : editGiftById(giftId, values);
  };

  const formik = useFormik<AddEditGift>({
    initialValues: {
      giftName: editGiftData?.giftName ?? '',
      giftPrice: editGiftData?.giftPrice ?? '',
      giftImageUrl: editGiftData?.giftImageUrl ?? '',
      giftDetails: editGiftData?.giftDetails ?? '',
    },
    validationSchema,
    onSubmit: values => {
      dispatch(setEditGiftId(null));
      dispatch(setEditGiftData(resetGiftData));

      makeAPICall(formType, values, editGiftId)
        .then(() => getAllGifts())
        .then(response => {
          const alertData: Alert = {
            title: 'Success',
            message: formType === 'ADD' ? 'Gift Added successfully!' : 'Gift Updated successfully!',
            variant: 'success'
          };

          dispatch(setGifts(response.data));
          dispatch(setShowAddGiftForm(false));
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
    }
  });

  return (
    <div className='container d-flex flex-column justify-content-center align-items-center'>
      <div className="formWrapper p-3 rounded-4 w-100" style={{ maxWidth: '40rem' }}>
        <Form onSubmit={formik.handleSubmit}>
          <FloatingLabel
            controlId="enterGiftName"
            label="Enter the Name"
            className="mb-3"
          >
            <Form.Control type="text" {...formik.getFieldProps('giftName')} placeholder='Enter the gift name' />
            {formik.touched.giftName && formik.errors.giftName ? <div className='text-danger'>{formik.errors.giftName}</div> : null}
          </FloatingLabel>
          <FloatingLabel
            controlId="enterGiftPrice"
            label="Enter the Price"
            className="mb-3"
          >
            <Form.Control type="number" {...formik.getFieldProps('giftPrice')} placeholder="Enter the gift price" />
            {formik.touched.giftPrice && formik.errors.giftPrice ? <div className='text-danger'>{formik.errors.giftPrice}</div> : null}
          </FloatingLabel>
          <FloatingLabel
            controlId="enterGiftImageUrl"
            label="Enter the Image URL"
            className="mb-3"
          >
            <Form.Control type="text" {...formik.getFieldProps('giftImageUrl')} placeholder="Enter the gift image url" />
            {formik.touched.giftImageUrl && formik.errors.giftImageUrl ? <div className='text-danger'>{formik.errors.giftImageUrl}</div> : null}
          </FloatingLabel>
          <FloatingLabel
            controlId="enterGiftDetails"
            label="Enter the Description"
            className="mb-3"
          >
            <Form.Control as="textarea" style={{height: '8rem'}} {...formik.getFieldProps('giftDetails')} placeholder="Enter the gift details" />
            {formik.touched.giftDetails && formik.errors.giftDetails ? <div className='text-danger'>{formik.errors.giftDetails}</div> : null}
          </FloatingLabel>
          <Button variant="success" type="submit" className='fw-semibold'>{formType === 'ADD' ? 'Add' : 'Update'}</Button>
        </Form>
      </div>
    </div>
  )
}
