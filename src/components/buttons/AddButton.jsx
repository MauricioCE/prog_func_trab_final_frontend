import { Button, Col } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


// eslint-disable-next-line react/prop-types
const AddButton = ({ text, onClick }) => {

    return (
        <Col style={{ display: 'flex', alignItems: 'end', width: '200px' }}>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={onClick}
                style={{
                    backgroundColor: '#424242',
                    width: '100%',
                    maxWidth: '150px',
                    fontWeight: '600'
                }}
            >
                {text}
            </Button>
        </Col>

    );
};

export default AddButton;