import { useState, useEffect, useContext } from 'react';
import { Modal, Button, Input, List, Popconfirm, message, Space } from 'antd';
import { DashboardContext } from '../../pages/dashboard/DashboardContext';

const TagModal = () => {
    const { tagModalVisible, closeTagModal, tags, setTags } = useContext(DashboardContext);
    const [newTagName, setNewTagName] = useState('');
    const [loading, setLoading] = useState(false);

    // Carregar tags do usuário
    useEffect(() => {
        if (tagModalVisible) {
            fetchTags();
        }
    }, [tagModalVisible]);

    const fetchTags = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const user_Id = localStorage.getItem('id');

            const res = await fetch(`http://localhost:4000/api/tags?user_id=${user_Id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await res.json();
            setTags(data.data || []);
        } catch {
            message.error('Erro ao carregar tags');
        }
        setLoading(false);
    };

    // Adicionar tag
    const addTag = async () => {
        if (!newTagName.trim()) return;
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const user_Id = localStorage.getItem('id');
            console.log("aaaa: " + user_Id)
            const res = await fetch('http://localhost:4000/api/tags', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ tag: { name: newTagName, user_id: user_Id } }),
            });
            if (res.ok) {
                setNewTagName('');
                fetchTags();
                message.success('Tag adicionada');
            } else {
                message.error('Erro ao adicionar tag');
            }
        } catch {
            message.error('Erro ao adicionar tag');
        }
        setLoading(false);
    };

    // Deletar tag
    const deleteTag = async (tagId) => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');

            const res = await fetch(`http://localhost:4000/api/tags/${tagId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (res.ok) {
                fetchTags();
                message.success('Tag deletada');
            } else {
                message.error('Erro ao deletar tag');
            }
        } catch {
            message.error('Erro ao deletar tag');
        }
        setLoading(false);
    };
    return (
        <Modal
            title="Gerenciar Tags"
            open={tagModalVisible}
            onCancel={closeTagModal}
            footer={null}
            centered
            width={500}
        >
            <Space style={{ marginBottom: 16, width: '100%' }}>
                <Input
                    placeholder="Nova tag"
                    value={newTagName}
                    onChange={e => setNewTagName(e.target.value)}
                    onPressEnter={addTag}
                    disabled={loading}
                />
                <Button type="primary" onClick={addTag} loading={loading} disabled={!newTagName.trim()}>
                    Adicionar
                </Button>
            </Space>

            <List
                style={{ minHeight: "200px" }}
                bordered
                loading={loading}
                dataSource={tags}
                renderItem={(tag, index) => (
                    <List.Item
                        actions={[
                            <Popconfirm
                                key={index}
                                title="Confirma excluir?"
                                onConfirm={() => deleteTag(tag.id)}
                                okText="Sim"
                                cancelText="Não"
                            >
                                <Button danger size="small">Excluir</Button>
                            </Popconfirm>,
                        ]}
                    >
                        {tag.name}
                    </List.Item>
                )}
            />
        </Modal>
    );
};

export default TagModal;
