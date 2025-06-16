import { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import api from '../../api/api';
import Credential from '../../helpers/credencial';

const { Title } = Typography;

const RegisterForm = () => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        if (!Credential.isValidEmail(values.email)) {
            message.error('Por favor, insira um e-mail válido.');
            return;
        }

        if (values.password !== values.passwordConfirm) {
            message.error('As senhas não batem.');
            return;
        }

        if (!Credential.isValidPassword(values.password)) {
            message.error('A senha deve ter entre 6 e 12 caracteres.');
            return;
        }

        setLoading(true);
        try {
            await api.post('/api/users/register', values);
            message.success('Usuário registrado com sucesso!');
            form.resetFields(); // Limpa os campos do formulário
        } catch (error) {
            if (error.response) {
                message.error(error.response.data.message || 'Erro ao registrar usuário.');
            } else {
                message.error('Ocorreu um erro. Tente novamente.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Title level={3}>Registrar</Title>
            <Form layout="vertical" onFinish={onFinish} form={form}>
                <Form.Item
                    label="Nome"
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira seu nome.',
                        },
                    ]}
                >
                    <Input placeholder="Digite seu nome" />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: 'email',
                            message: 'Por favor, insira um e-mail válido.',
                        },
                    ]}
                >
                    <Input placeholder="Digite seu e-mail" />
                </Form.Item>

                <Form.Item
                    label="Senha"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira uma senha.',
                        },
                        {
                            min: 6,
                            message: 'A senha deve ter pelo menos 6 caracteres.',
                        },
                    ]}
                >
                    <Input.Password placeholder="Digite sua senha" autoComplete="on" />
                </Form.Item>

                <Form.Item
                    label="Confirme a senha"
                    name="passwordConfirm"
                    rules={[
                        {
                            required: true,
                            message: 'Por favor, insira uma senha.',
                        },
                        {
                            min: 6,
                            message: 'A senha deve ter pelo menos 6 caracteres.',
                        },
                    ]}
                >
                    <Input.Password placeholder="Confirme sua senha" autoComplete="on" />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        disabled={loading}
                    >
                        Registrar
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterForm;
