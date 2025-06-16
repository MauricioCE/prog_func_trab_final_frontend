import { Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react';
import { DashboardContext } from '../../pages/dashboard/DashboardContext';

import api from "../../api/api";

const DashboardHeader = () => {


    const navigate = useNavigate();

    const logout = () => {
        const id = localStorage.getItem('id')
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        api.post(`/api/transactions/logout/${id}`)
        navigate('/login');
    }

    return (
        <Row justify={"space-between"} style={{ marginBottom: '10px' }}>
            <h1>Finanças</h1>
            <button onClick={logout}>Logout</button>
        </Row>
    )
}

export default DashboardHeader