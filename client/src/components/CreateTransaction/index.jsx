import { Input, Button, Modal } from 'antd';
import "./CreateTransaction.css"
import { useState } from 'react';

export default function CreateTransaction() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleClick = () => {
        showModal();
    }

    return (
        <div className="wrapper">
            <div className="inner">
                <h4>Create Transaction</h4>
                <Button type="primary" onClick={handleClick}>Transfer</Button>
            </div>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <h3>Giao dịch thành công</h3>
                <p>Your proof: ?</p>
            </Modal>
        </div>
    );

}