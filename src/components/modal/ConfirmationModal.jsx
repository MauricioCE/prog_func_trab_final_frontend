import { Modal, Button } from 'antd';
import { DashboardContext } from '../../pages/dashboard/DashboardContext';
import { useContext } from 'react';

const ConfirmationModal = () => {

    const { confirmModalVisible, closeConfirmationModal, deleteTableItem } = useContext(DashboardContext);

    return (
        <Modal
            open={confirmModalVisible}
            title="Confirmar Exclusão"
            onCancel={closeConfirmationModal}
            footer={[
                <Button key="cancel" onClick={closeConfirmationModal}>
                    Cancelar
                </Button>,
                <Button
                    key="confirm"
                    type="primary"
                    danger
                    onClick={()=>{
                        deleteTableItem();
                        closeConfirmationModal();
                    }}
                >
                    Deletar
                </Button>,
            ]}
        >
            <p>Você tem certeza que deseja excluir o item?</p>
        </Modal>
    );
};

export default ConfirmationModal;
