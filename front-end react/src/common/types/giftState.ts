import AddEditGift from "./addEditGift";
import GiftsData from "./adminGiftsData";

export type Alert = {
    title: string;
    message: string;
    variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'dark' | 'light' | '';
}

interface GiftState {
    gifts: GiftsData[];
    showAddGiftForm: boolean;
    formType: 'ADD' | 'EDIT';
    editGiftData: AddEditGift;
    editGiftId: string | null;
    showDeleteGiftConfirmation: boolean;
    deleteGiftId: string | null;
    showAlert: boolean;
    alertData: Alert;
}

export default GiftState;
