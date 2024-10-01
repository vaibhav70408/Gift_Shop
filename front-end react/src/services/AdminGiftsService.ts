import axios from 'axios';
import AddEditGift from '../common/types/addEditGift';

const getAllGifts = () => {
    const url = `http://localhost:4000/admin/getAllGifts`;
    return axios.get(url);
};

const addGift = (gift: AddEditGift) => {
    const url = `http://localhost:4000/admin/addGift`;
    return axios.post(url, gift);
};

const editGiftById = (id: string | null, gift: AddEditGift) => {
    if(!id) return Promise.reject('Gift Id cannot be null');

    const url = `http://localhost:4000/admin/editGift/${id}`;
    return axios.put(url, gift);
};

const deleteGiftById = (id: string | null) => {
    if(!id) return Promise.reject('Gift Id cannot be null');
    
    const url = `http://localhost:4000/admin/deleteGift/${id}`;
    return axios.delete(url);
};

export {
    getAllGifts,
    addGift,
    editGiftById,
    deleteGiftById
};
