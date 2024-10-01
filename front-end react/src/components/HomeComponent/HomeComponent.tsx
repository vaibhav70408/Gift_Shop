import React, { useState } from 'react';
import styles from './HomeComponent.module.scss';
import "bootstrap/dist/css/bootstrap.min.css";
import DisplayComponent from './DisplayHome/DisplayHome';
import { Form, FormControl, InputGroup } from 'react-bootstrap'

const AdminHomePage: React.FC = () => {
    const [giftSearchQuery, setGiftSearchQuery] = useState<string>("");

    const handleGiftSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGiftSearchQuery(e.target.value);
    };

    return (
        <div className='BodyComponent'>
            <Form>
                <InputGroup id='search-box' className={styles.searchBox}>
                    <FormControl
                        type="text"
                        placeholder="&#128269; Search Gifts"
                        value={giftSearchQuery}
                        onChange={handleGiftSearchChange}
                    />
                </InputGroup>
            </Form>
            <DisplayComponent giftSearchQuery={giftSearchQuery} />
        </div>
    );
}

export default AdminHomePage;
