// NotFoundPage.js
import React from 'react';
import { Result, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  // Função para redirecionar o usuário para a página inicial
  const goToHome = () => {
    navigate('/');
  };

  return (
    <Result
      status="404"
      title="404"
      subTitle="Desculpe, a página que você está procurando não existe."
      extra={
        <Button type="primary" onClick={goToHome}>
          Voltar para a Home
        </Button>
      }
    />
  );
};

export default NotFoundPage;
