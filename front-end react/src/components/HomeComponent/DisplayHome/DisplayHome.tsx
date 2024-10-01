import React, { useEffect, useState } from 'react';
import fetchGiftsData, { Gift } from '../../../services/HomeComponentService';
import GiftCard from '../Cards/Card';
import styles from './DisplayHome.module.scss'

const DisplayComponent: React.FC<{ giftSearchQuery: string }> = ({ giftSearchQuery }) => { 

    const [gifts, setGifts] = useState<Gift[]>([]);

    useEffect(() => {
        fetchGiftsData()
            .then(fetchedGifts => {
                setGifts(fetchedGifts);
            })
            .catch(error => {
                console.error('Error fetching gifts:', error);
            });
    }, []);

    const filteredGifts = gifts.filter(gift => {
        return gift.giftName.toLowerCase().includes(giftSearchQuery.toLowerCase()); 
    });

    return (
        <div>
            <div  className={styles.cardContainer}>
                {filteredGifts.length > 0 ? (
                    filteredGifts.map((gift, index) => (
                        <React.Fragment key={index}>
                            <GiftCard
                                giftName={gift.giftName}
                                giftImageUrl={gift.giftImageUrl}
                                giftPrice={gift.giftPrice}
                            />
                        </React.Fragment>
                    ))
                ) : (
                    <p id ="notAvailable" className={styles.notAvailable}>Gift not Available</p>
                )}
            </div>
        </div>
    );
};

export default DisplayComponent;