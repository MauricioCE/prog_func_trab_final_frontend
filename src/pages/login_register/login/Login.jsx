import { useState } from 'react';
import { Row, Col, Tabs } from 'antd';
import LoginForm from '../../../components/login-register/LoginForm';
import RegisterForm from '../../../components/login-register/RegisterForm';

const { TabPane } = Tabs;

const LoginPage = () => {
    const [activeKey, setActiveKey] = useState("1");

    const onTabChange = (key) => {
        setActiveKey(key);
    };

    return (
        <Row style={{ height: '100vh', backgroundColor: 'white' }} align={'top'} justify={'center'}>
            <Col span={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '130px' }}>
                <div style={{ width: '80%', maxWidth: 400, backgroundColor: "white" }}>
                    <Tabs animated={true} activeKey={activeKey} onChange={onTabChange} centered>
                        <TabPane tab="Login" key="1">
                            <LoginForm />
                        </TabPane>
                        <TabPane tab="Registrar" key="2">
                            <RegisterForm />
                        </TabPane>
                    </Tabs>
                </div>
            </Col>
        </Row>
    );
};

export default LoginPage;
