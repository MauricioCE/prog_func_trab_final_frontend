import { useState, useEffect, useContext } from 'react';
import { Modal, Button, Input, Select, DatePicker, Row, Col, Space, Radio } from 'antd';
import dayjs from 'dayjs';
import { DashboardContext } from '../../pages/dashboard/DashboardContext';

const { Option } = Select;

const ItemModal = () => {
    const [type, setType] = useState('receita');
    const [value, setValue] = useState('');
    const [description, setDescription] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [date, setDate] = useState(null);
    const [status, setStatus] = useState(false);
    const { itemModalVisible, closeItemModal, addTableItem, itemToEdit, setItemToEdit, editItem, tags } = useContext(DashboardContext);

    const manageAddItem = () => {
        const item = { status, type, value, description, tags: selectedTags, date };
        itemToEdit ? editItem(item) : addTableItem(item);
        clearForms();
    }

    useEffect(() => {
        if (itemToEdit) {
            setType(itemToEdit.type == "Receita" ? "receita" : "despesa");
            setValue(itemToEdit.value || '');
            setDescription(itemToEdit.description || '');
            setSelectedTags(itemToEdit.tags || []);
            setDate(itemToEdit.date);
            setStatus(itemToEdit.status == "Paga" ? true : false);
        } else {
            clearForms();
        }
    }, [itemToEdit]);

    const clearForms = () => {
        setValue('');
        setDescription('');
        setSelectedTags([]);
        setDate(null);
        setStatus(false);
    };

    const handleBtnType = (e) => {
        const type = e.target.value;
        setType(type === 'receita' ? 'receita' : 'despesa');
    }

    const isFormValid = value && description && selectedTags && date;


    return (

        <Modal
            title={itemToEdit ? 'Editar Item' : 'Adicionar Novo Item'}
            open={itemModalVisible}
            onCancel={() => {
                closeItemModal();
                setItemToEdit(null);
            }}
            footer={null}
            centered
            width={600}
        >

            {/* Tipo de transação - Receita ou Despesa */}
            <Space style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
                <Radio.Group value={type} onChange={handleBtnType}>
                    <Radio.Button value="receita" style={
                        {
                            width: '200px',
                            textAlign: 'center',
                            backgroundColor: type === 'receita' ? '#5983e4' : 'transparent',
                            color: type === 'receita' ? 'white' : 'black',
                            fontWeight: type === 'receita' ? '500' : '400',
                        }
                    }>Receita</Radio.Button>
                    <Radio.Button value="despesa" style={{
                        width: '200px',
                        textAlign: 'center',
                        backgroundColor: type === 'despesa' ? '#5983e4' : 'transparent',
                        color: type === 'despesa' ? 'white' : 'black',
                        fontWeight: type === 'despesa' ? '500' : '400',
                    }} >Despesa</Radio.Button>
                </Radio.Group>
            </Space>

            {/* Valor e Switch pago */}
            <Row gutter={16} style={{ marginBottom: '20px' }}>

                {/* Input valor */}
                <Col span={24}>
                    <Input
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        placeholder="Valor"
                        prefix="R$"
                        type="number"
                    />
                </Col>
            </Row>

            {/* Descrição */}
            <Row gutter={16} style={{ marginBottom: '20px' }}>
                <Col span={24}>
                    <Input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descrição"
                        maxLength={30}
                    />
                </Col>
            </Row>

            {/* Categoria */}
            <Row gutter={16} style={{ marginBottom: '20px' }}>
                <Col span={24}>
                    <Select
                        mode="multiple"
                        value={selectedTags.map(tag => tag.id)}
                        onChange={(ids) => {
                            const selected = tags.filter(tag => ids.includes(tag.id))
                            setSelectedTags(selected)
                        }}
                        placeholder="Selecione as tags"
                        style={{ width: '100%' }}
                    >
                        {tags?.map(tag => (
                            <Option key={tag.id} value={tag.id}>
                                {tag.name}
                            </Option>
                        ))}
                    </Select>
                </Col>
            </Row>

            {/* Data */}
            <Row gutter={16} style={{ marginBottom: '50px' }}>
                <Col span={24}>
                    <DatePicker
                        value={date ? dayjs(date).startOf('day') : null}
                        onChange={(date) => setDate(date ? date.format("YYYY-MM-DD") : null)}
                        format="DD/MM/YYYY"
                        style={{ width: '100%' }}
                        placeholder="Selecione uma data"
                        presets={[
                            { label: 'Hoje', value: dayjs() },
                            { label: 'Ontem', value: dayjs().subtract(1, 'day') }
                        ]}
                    />
                </Col>
            </Row>

            {/* Botões */}
            <Row style={{ marginTop: '50px' }}>
                <Col span={12} style={{ display: 'flex', justifyContent: 'center' }}>
                    {/* Salvar */}
                    <Button
                        type="primary"
                        onClick={manageAddItem}
                        style={{ width: '200px', height: '40px' }}
                        disabled={!isFormValid}
                    >
                        {itemToEdit ? 'Atualizar' : 'Salvar'}
                    </Button>
                </Col>
                <Col span={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {/* Limpar */}
                    <Button
                        type="default"
                        onClick={clearForms}
                        style={{ width: '200px', height: '40px', backgroundColor: '#887c7c', color: 'white' }}
                    >
                        Limpar
                    </Button>
                </Col>
            </Row>
        </Modal>
    );
};

export default ItemModal;
