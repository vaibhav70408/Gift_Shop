import React from 'react';
import { useLocation } from 'react-router-dom';
import styles from './PaymentInfo.module.scss';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { CiStar } from "react-icons/ci";

const PaymentInfo: React.FC = () => {
    const location = useLocation();
    const { giftName, giftImageUrl, giftPrice} = location.state  || {};
    const [paymentMethod, setPaymentMethod] = React.useState('credit');
    const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setPaymentMethod(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/app/paymentsuccess');
  };

  const handleBackClick = () => {
    navigate('/app/home');
  }
  return (
     <div className={styles.paymentInfoContainer}>
        <div className={styles.giftInfo}>
          <img id='giftImage' className={styles.giftImage} src={giftImageUrl} alt={giftName} />
          <h2 id='giftname' className={styles.giftName}>{giftName}</h2>
          <p id='giftdescription' className={styles.giftDescription}> Customizable photos available upon request: Tailor your visuals to perfection. </p>
          <p id='giftPrice' className={styles.giftPrice}>Price: ₹ {giftPrice}</p>
          <p id='giftrating' className ={styles.giftRating}>Rating: <CiStar /></p>
    </div>

    <div className={styles.paymentMethods}>

    <Form onSubmit={handleSubmit}>
      <h4 id='Payment-Method' className={styles.paymentMethod}>Payment Methods</h4>
      <Form.Check 
        type="radio"
        value="credit"
        checked={paymentMethod === 'credit'}
        onChange={handleInputChange}
        label="Credit Card"
        name="paymentMethod"
        id="credit"
        className={styles.formCheck}
      />
       <Form.Check 
        type="radio"
        value="debit"
        checked={paymentMethod === 'debit'}
        onChange={handleInputChange}
        label="Debit Card"
        name="paymentMethod"
        id="debit"
        className={styles.formCheck}
      />
      <Form.Check 
        type="radio"
        value="netbanking"
        checked={paymentMethod === 'netbanking'}
        onChange={handleInputChange}
        label="Net Banking"
        name="paymentMethod"
        id="netbanking"
        className={styles.formCheck}
      />
      <Form.Check 
        type="radio"
        value="wallet"
        checked={paymentMethod === 'wallet'}
        onChange={handleInputChange}
        label="Wallet"
        name="paymentMethod"
        id="wallet"
        className={styles.formCheck}
      />
     <Form.Check 
        type="radio"
        value="upi"
        checked={paymentMethod === 'upi'}
        onChange={handleInputChange}
        label="UPI"
        name="paymentMethod"
        id="cash"
        className={styles.formCheck}
      />
      <div id='button-wrap' className={styles.buttonWrap}>
      <Button id='back-button' className={styles.backButton} variant="primary" onClick = {handleBackClick} >
         Back 
      </Button>
      <Button id='pay-button' className={styles.payButton} variant="primary" type="submit">
        Pay
      </Button>
      </div>     
    </Form>
        </div>
     </div>
  )
}
export default PaymentInfo;
