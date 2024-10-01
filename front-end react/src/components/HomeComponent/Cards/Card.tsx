import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';
import  styles from './Card.module.scss';

interface GiftCardProps {
  giftName: string;
  giftImageUrl: string;
  giftPrice: number;
}

const GiftCard: React.FC<GiftCardProps> = ({ giftName, giftImageUrl, giftPrice }: GiftCardProps) => {

  const navigate = useNavigate();

  const handleBuyClick = () => {
    navigate('/app/payment', { state: { giftName, giftImageUrl, giftPrice } });
  };

  return (
    <div className={styles.cardWrap}>
    <Card id='cardContainer' className={styles.cardContainer}>
      <Card.Img variant="top" className={styles.cardImgTop} src={giftImageUrl} />
      <Card.Body className={styles.cardBody}>
        <Card.Title id='gift-name' className = {styles.giftName}>{giftName}</Card.Title>
        <div className = {styles.textButtonWrap}>
          <Card.Text className={styles.cardPrice}>₹{giftPrice}</Card.Text>
          <Button className= {styles.buyButton} variant="primary" onClick={handleBuyClick} >Buy</Button>
        </div>
      </Card.Body>
    </Card>
    </div>
  );
};

export default GiftCard;