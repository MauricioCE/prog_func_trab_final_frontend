import { useEffect, useState } from 'react';
import Currency from '../../helpers/Currency';

const DashCard = ({ title = "Sem título", data = '0' }) => {

    return (
        <div style={{
            width:'250px',
            height: '80px',
            boxShadow: '0px 0px 3px rgba(0, 0, 0, 0.222)',
            borderRadius: '10px',
            backgroundColor:'white'

        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '5px',
                padding: '10px',
                height: '100%',
                color: '#3e3e3e'
            }} >
                <p style={{
                    fontSize: '16px',
                    fontWeight: '600',
                }}>{title}</p>
                <p style={{
                    fontSize: '26px',
                    fontWeight: '600',
                    marginBottom: '20px',
                }}>R$ {Currency.formatValue(data)}</p>
            </div>
        </div>
    )
}

export default DashCard