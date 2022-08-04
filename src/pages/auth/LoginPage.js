import React, {useState} from 'react';
import {translate, route} from "utils/helpers";
import {Button, FormGroup} from "components/ui";
import {FormInput, FormPassword} from "components/ui/form";
import {Col, Row} from "antd";
import {NavLink} from "react-router-dom";
import {serviceDispatchLoginAuth} from "services/auth.service";

function LoginPage(props) {

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await serviceDispatchLoginAuth(form);
    }

    return (
        <>
            <h2 className="text-mute">{translate('login.Text.Title')}</h2>
            <p className="text-mute">{translate('login.Text.SubTitle')}</p>
            <div className="mt-10">
                <form onSubmit={handleSubmit}>
                    <Row gutter={[16, 16]}>
                        <Col span={24}>
                            <FormGroup
                                label={translate('login.Label.Email')}
                                error={'email'}
                            >
                                <FormInput
                                    value={form.email}
                                    onChange={e => setForm(f => ({...f, email: e.target.value}))}
                                />
                            </FormGroup>
                        </Col>
                        <Col span={24}>
                            <FormGroup
                                label={translate('login.Label.Password')}
                                labelRight={
                                    <NavLink className="text-mute text-xs" to={route('auth.forgetPassword')}>{translate('button.ForgetPassword')}</NavLink>
                                }
                                error={'password'}
                            >
                                <FormPassword
                                    value={form.password}
                                    onChange={e => setForm(f => ({...f, password: e.target.value}))}
                                />
                            </FormGroup>
                        </Col>
                        <Col span={24}>
                            <Button block={true} type={'submit'}>
                                {translate('button.Login')}
                            </Button>
                        </Col>
                    </Row>
                </form>
                <div className="mt-10 flex justify-center">
                    <p>{translate('login.Text.FootTitle')} <NavLink to={route('auth.register')}>{translate('button.Register')}</NavLink></p>
                </div>
            </div>
        </>
    );
}

export default LoginPage;