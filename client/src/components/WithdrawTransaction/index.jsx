import { Input, Button, Modal } from "antd";
import { useState } from "react";

export default function WithdrawTransaction() {
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
                <h4>Withdraw Transaction</h4>
                <Input placeholder="Your proof:" />
                <Input placeholder="Receive:" />
                <Button type="primary" onClick={handleClick}>Transfer</Button>
                <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <h3>Giao dịch thành công</h3>
                </Modal>
            </div>
        </div>
    )
}