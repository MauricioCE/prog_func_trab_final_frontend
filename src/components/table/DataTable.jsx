import { useContext } from 'react';
import { Table, Space, Tooltip } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import classes from './DataTable.module.css';
import './Table.css';
import { DashboardContext } from '../../pages/dashboard/DashboardContext';

dayjs.extend(isBetween);

const DataTable = () => {

  const { tableData, showConfirmationModal, setItemToDelete, showItemModal, setItemToEdit } = useContext(DashboardContext);

  const dataSource = tableData.map(item => ({ key: item.id, ...item }));

  const columns = [

    {
      title: 'Tipo',
      dataIndex: 'type',
      key: 'type',
      width: 90,
      // sorter: (a, b) => a.type.localeCompare(b.type),
    },
    {
      title: 'Valor',
      dataIndex: 'value',
      key: 'value',
      width: 150,
      render: (value) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'decimal',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        }).format(value);
      },
      // sorter: (a, b) => b.value - a.value,
    },
    {
      title: 'Descrição',
      dataIndex: 'description',
      key: 'description',
      width: 200,
    },
    {
      title: 'Tags',
      dataIndex: 'tags',
      key: 'tags',
      width: 150,
      sorter: (a, b) => {
        const aTags = a.tags ? a.tags.map(tag => tag.name).join(', ') : '';
        const bTags = b.tags ? b.tags.map(tag => tag.name).join(', ') : '';
        return aTags.localeCompare(bTags);
      },
      render: (tags) => tags ? tags.map(tag => tag.name).join(', ') : '—',
    },
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
      width: 120,
      render: (date) => date ? dayjs(date).format('DD/MM/YYYY') : 'N/A'
    },
    {
      title: 'Ações',
      key: 'acoes',
      width: 100,
      render: (record) => (
        // Botão editar
        <Space size="middle">
          <Tooltip title="Editar">
            <EditOutlined
              style={{ color: '#1890ff', cursor: 'pointer' }}
              onClick={() => {
                setItemToEdit(record);
                showItemModal();
              }}
            />
          </Tooltip>

          {/* Botão deletar */}
          <Tooltip title="Deletar">
            <DeleteOutlined
              style={{ color: '#ff4d4f', cursor: 'pointer' }}
              onClick={() => {
                setItemToDelete(record);
                showConfirmationModal();
              }}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <Table
      className={classes.tabela}
      size="small"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      rowClassName={(record, index) => (index % 2 === 0 ? classes.row_white : classes.row_blue)}
      scroll={{ y: 460 }}
      style={{ boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.222)', borderRadius: '8px 8px 0px 0px', height: '520px', backgroundColor: 'white' }}
    />
  );
};

export default DataTable;
