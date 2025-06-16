import { Row, Col } from 'antd';

import AddButton from "../../components/buttons/AddButton";
import ItemModal from "../../components/modal/ItemModal";
import DataTable from "../../components/table/DataTable";
import DashboardHeader from "./DashboardHeader";
import ConfirmationModal from '../../components/modal/ConfirmationModal';
import { useContext } from 'react';
import { DashboardContext } from '../../pages/dashboard/DashboardContext';
import TagModal from '../../components/modal/TagModal';

const Dashboard = () => {

    const { showItemModal, showTagModal, fetchTableData } = useContext(DashboardContext);

    fetchTableData()

    const user_id = localStorage.getItem('id')

    return (
        <Col style={{ padding: '20px' }}>
            {/* Header */}
            <DashboardHeader />
            <Row gutter={10} justify={"space-between"}>
                {/* Left side */}
                <Col flex={1} style={{ width: '70%' }}>
                    <Row gutter={15} wrap={false} style={{ marginBottom: '10px' }}>
                        <AddButton text={"Transação"} onClick={showItemModal} />
                        <AddButton text={"Tags"} onClick={showTagModal} />
                        {/* <DashboardCards /> */}
                        <ItemModal />
                        <TagModal />
                        <ConfirmationModal></ConfirmationModal>
                    </Row>
                    <DataTable key={user_id} />
                </Col>
            </Row>
        </Col>
    );
};

export default Dashboard;
