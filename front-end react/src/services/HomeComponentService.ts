import axios from 'axios';
export interface Gift {
    giftName: string;
    giftImageUrl: string;
    giftPrice: number;
}

const fetchGiftsData = (): Promise<Gift[]> => {
    return axios.get<Gift[]>('http://localhost:4000/admin/getAllGifts')
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.error('Error fetching gifts:', error);
            return [];
        });
};

export default fetchGiftsData;
