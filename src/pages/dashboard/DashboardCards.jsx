import { Row, Col } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import DashCard from '../../components/card/DashCard'
import { DashboardContext } from './DashboardContext'

const DashboardCards = () => {
    const { tableData } = useContext(DashboardContext)
    const [receita, setReceita] = useState(0);
    const [despesa, setDespesa] = useState(0);
    const [saldo, setSaldo] = useState(0);

    useEffect(() => {
        function calc(type) {
            if (!tableData || tableData.length === 0) return 0;
            return tableData ? tableData
                .filter((item) => item.type === type)
                .reduce((acc, item) => acc + parseFloat(item.value), 0) : 0
        }
        const r = calc("Receita");
        const d = calc("Despesa");
        const s = r - d;

        setReceita(r);
        setDespesa(d);
        setSaldo(s);

    }, [tableData])

    return (
        <Row gutter={10} justify={"space-between"}>
            <Col>
                <DashCard title={'Receitas'} data={receita}></DashCard>
            </Col>
            <Col>
                <DashCard title={'Despesas'} data={despesa}></DashCard>
            </Col>
            <Col>
                <DashCard title={'Saldo'} data={saldo}></DashCard>
            </Col>
        </Row>
    )
}

export default DashboardCards


