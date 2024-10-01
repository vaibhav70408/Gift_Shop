import React from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import customStyles from '../../common/constants/dataTableCustomStyles';
import GiftsData from '../../common/types/adminGiftsData';
import EditIcon from './icons/EditIcon';
import TrashIcon from './icons/TrashIcon';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../reduxStore/hooks';
import { setDeleteGiftId, setEditGiftData, setEditGiftId, setFormType, setShowAddGiftForm, setShowDeleteGiftConfirmation } from '../../reduxStore/slices/adminGiftsSlice';
import AddEditGift from '../../common/types/addEditGift';

export default function GiftsTable() {
  const gifts = useAppSelector(state => state.gifts.gifts);
  
  const dispatch = useAppDispatch();
  
  const handleEditClick = useCallback((giftData: GiftsData) => {
    const giftId = giftData.giftId;
    const editGiftData: AddEditGift = {
      giftName: giftData.giftName,
      giftPrice: giftData.giftPrice,
      giftImageUrl: giftData.giftImageUrl,
      giftDetails: giftData.giftDetails,
    };

    dispatch(setEditGiftId(giftId));
    dispatch(setEditGiftData(editGiftData));
    dispatch(setFormType('EDIT'));
    dispatch(setShowAddGiftForm(true));

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteClick = useCallback((giftId: string) => {
    dispatch(setDeleteGiftId(giftId));
    dispatch(setShowDeleteGiftConfirmation(true));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const giftsTableColumns: TableColumn<GiftsData>[] = useMemo(() => [
    {
      name: 'Image', cell: (row: GiftsData) => (
        <img
          className="object-fit-cover rounded"
          src={row.giftImageUrl}
          alt={row.giftName}
          style={{ width: '8rem', height: '8rem' }}
        />
      )
    },
    { name: 'Name', selector: (row: GiftsData) => row.giftName, sortable: true },
    { name: 'Price', selector: (row: GiftsData) => `₹${row.giftPrice}`, sortable: true },
    { name: 'Description',  cell: (row: GiftsData) => (
        <div style={{
          maxWidth: '12rem', 
          whiteSpace: 'wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          maxHeight: '10rem',
          overflowY: 'auto'
        }}>
          {row.giftDetails}
        </div>
      ), 
    },
    { 
      name: '', cell: (row: GiftsData) => (
        <div className='w-100 d-flex align-items-center' style={{gap: '50%'}}>
          <div onClick={() => handleEditClick(row)}><EditIcon /></div>
          <div onClick={() => handleDeleteClick(row.giftId)}><TrashIcon /></div>
        </div>
      ) 
    }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  ], []);

  return (
    <DataTable
      columns={giftsTableColumns}
      data={gifts}
      customStyles={customStyles}
      pagination
    />
  )
}