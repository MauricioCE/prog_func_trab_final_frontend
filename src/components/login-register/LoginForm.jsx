// LoginForm.js
import { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import Credential from '../../helpers/credencial';

const { Title } = Typography;

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async () => {
        if (!Credential.isValidEmail(email)) {
            message.error('Por favor, insira um e-mail válido.');
            return;
        }

        if (!Credential.isValidPassword(password)) {
            message.error('A senha deve ter entre 6 e 12 caracteres.');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('http://localhost:4000/api/users/login', { email, password });
            const { token, user_id } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('id', user_id);
            message.success('Login realizado com sucesso!');
            form.resetFields(); // Limpa os campos do formulário
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                // Erro da API
                message.error(error.response.data.message || 'Erro ao fazer login.');
            } else {
                // Outros erros
                console.log(error)
                message.error('Ocorreu um erro. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Title level={3}>Login</Title>
            <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira seu e-mail.',
                        },
                    ]}
                >
                    <Input
                        placeholder="Digite seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira sua senha.',
                        },
                    ]}
                >
                    <Input.Password
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="on"
                    />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        disabled={loading}
                    >
                        {loading ? 'Entrando...' : 'Entrar'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default LoginForm;
