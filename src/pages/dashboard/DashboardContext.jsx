import { createContext, useState } from "react";
import api from "../../api/api";
import dayjs from 'dayjs';

export const DashboardContext = createContext();

// eslint-disable-next-line react/prop-types
export const DashboardProvider = ({ children }) => {
    // Array com todos os itens da tabela
    // Array com todos os itens da tabela
    const [tableData, setTableData] = useState([]);
    // Item que será editado na modal. Setar no botão de edit de cada item da tabela
    const [itemToEdit, setItemToEdit] = useState(null);
    // Item que será deletado da tabela. Setar no botão de delete de cada item da tabela
    const [itemToDelete, setItemToDelete] = useState(null);
    // Boleano que diz se a item modal deve ser ativada
    const [itemModalVisible, setItemModalVisible] = useState(false);
    // Boleano que diz se a modal de confirmação deve ser ativada
    const [confirmModalVisible, setConfirmModalVisible] = useState(false);
    // Boleano que diz se a modal de confirmação deve ser ativada
    const [tagModalVisible, setTagModalVisible] = useState(false);
    // Tags
    const [tags, setTags] = useState([]);

    const showItemModal = () => setItemModalVisible(true);
    const closeItemModal = () => setItemModalVisible(false);
    const showConfirmationModal = () => setConfirmModalVisible(true);
    const closeConfirmationModal = () => setConfirmModalVisible(false);
    const showTagModal = () => setTagModalVisible(true);
    const closeTagModal = () => setTagModalVisible(false);


    function clear() {
        setTableData([])
        setTags([])
    }


    const fetchTableData = async () => {
        try {
            const token = localStorage.getItem('token');
            const data = { user_id: localStorage.getItem('id') };

            const response = await api.post('/api/transactions/list', data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            const transactions = response.data.transactions.map(tx => ({ ...tx, key: tx.id }));
            const tags = response.data.tags;

            setTableData(transactions);
            setTags(tags);
        } catch (error) {
            alert("Erro ao buscar dados");
            console.error("Erro ao buscar dados:", error);
        }
    };

    const addTableItem = async (data) => {
        console.log("data.date recebido:", data.date);
        try {
            const token = localStorage.getItem('token');
            const newItem = {
                transaction: {
                    user_id: localStorage.getItem('id'),
                    type: data.type === 'receita' ? 'Receita' : 'Despesa',
                    value: data.value,
                    description: data.description,
                    date: dayjs(data.date).startOf('day').toISOString(),
                    tags: data.tags,
                }
            };
            const response = await api.post("http://localhost:4000/api/transactions", newItem,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            const id = response.data.data.id;
            const addItem = { ...newItem.transaction, id };
            setTableData(prev => [...prev, addItem]);
            setItemModalVisible(false);
        } catch (error) {
            alert("Erro ao adicionar o item. Tente outra vez.")
            console.error("Erro ao adicionar item:", error);
        }
    };

    const deleteTableItem = async () => {
        if (!itemToDelete) return;
        try {
            const token = localStorage.getItem('token');
            const id = itemToDelete.id;

            await api.delete(`http://localhost:4000/api/transactions/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // const newData = tableData.filter((item) => item.key !== itemToDelete.key);
            // setTableData(newData);
            fetchTableData();
            setItemToDelete(null);
        } catch (error) {
            alert("Erro ao deletar item.");
            console.error("Erro ao deletar item:", error);
        }
    };

    const editItem = async (data) => {
        if (!itemToEdit || !data) return;
        try {
            const key = itemToEdit.key;
            const date = dayjs(data.date);
            const updatedItem = {
                transaction: {
                    id: itemToEdit.id,
                    type: data.type === 'receita' ? 'Receita' : 'Despesa',
                    value: data.value,
                    tags: data.tags,
                    description: data.description,
                    category: data.category,
                    date: date.isValid() ? date.startOf('day').toISOString() : null,
                    user_id: localStorage.getItem('id'),
                }
            };
            const token = localStorage.getItem('token');
            const response = await api.put(`http://localhost:4000/api/transactions/${key}`,
                updatedItem,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

            const updatedData = response.data.data;
            const newData = tableData.map((item) => {
                if (item.id === updatedData.id) {
                    return { ...item, ...updatedData };
                }
                return item;
            });

            setTableData(newData);
            setItemToEdit(null);
            setItemModalVisible(false);
        } catch (error) {
            alert("Erro ao editar item");
            console.error("Erro ao editar item:", error);
        }
    };

    return (
        <DashboardContext.Provider
            value={{
                itemModalVisible,
                addTableItem,
                closeItemModal,
                closeConfirmationModal,
                confirmModalVisible,
                tagModalVisible,
                deleteTableItem,
                editItem,
                itemToDelete,
                itemToEdit,
                setItemToDelete,
                setItemToEdit,
                setTableData,
                showItemModal,
                showConfirmationModal,
                setTagModalVisible,
                tableData,
                showTagModal,
                closeTagModal,
                tags,
                setTags,
                fetchTableData,
                clear
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};
