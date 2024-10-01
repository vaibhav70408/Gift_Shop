import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import GiftState, { Alert } from "../../common/types/giftState";
import GiftsData from "../../common/types/adminGiftsData";
import AddEditGift from "../../common/types/addEditGift";
import resetAlertData from "../../common/constants/resetAlertData";

const initialState: GiftState = {
  gifts: [],
  showAddGiftForm: false,
  formType: 'ADD',
  editGiftId: null,
  editGiftData: {
    giftName: '',
    giftPrice: '',
    giftImageUrl: '',
    giftDetails: '',
  },
  showDeleteGiftConfirmation: false,
  deleteGiftId: null,
  showAlert: false,
  alertData: resetAlertData
};

export const giftSlice = createSlice({
  name: 'gifts',
  initialState,
  reducers: {
    setGifts: (state, action: PayloadAction<GiftsData[]>) => {
      state.gifts = action.payload;
    },
    setShowAddGiftForm: (state, action: PayloadAction<boolean>) => {
      state.showAddGiftForm = action.payload;
    },
    setFormType: (state, action: PayloadAction<'ADD' | 'EDIT'>) => {
      state.formType = action.payload;
    },
    setEditGiftId: (state, action: PayloadAction<string | null>) => {
      state.editGiftId = action.payload;
    },
    setEditGiftData: (state, action: PayloadAction<AddEditGift>) => {
      state.editGiftData = action.payload;
    },
    setShowDeleteGiftConfirmation: (state, action: PayloadAction<boolean>) => {
      state.showDeleteGiftConfirmation = action.payload;
    },
    setDeleteGiftId: (state, action: PayloadAction<string | null>) => {
      state.deleteGiftId = action.payload;
    },
    setShowAlert: (state, action: PayloadAction<boolean>) => {
      state.showAlert = action.payload;
    },
    setAlertData: (state, action: PayloadAction<Alert>) => {
      state.alertData = action.payload;
    }
  },
});

export const { 
  setGifts, 
  setShowAddGiftForm, 
  setFormType,
  setEditGiftId,
  setEditGiftData,
  setShowDeleteGiftConfirmation,
  setDeleteGiftId,
  setShowAlert,
  setAlertData
} = giftSlice.actions;

export default giftSlice;
