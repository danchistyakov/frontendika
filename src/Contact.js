import React from 'react';
import { Helmet } from 'react-helmet-async';
import style from './CSS/Contact.module.sass';
import emailjs from 'emailjs-com';

const Contact = () => {
    const Submit = async (e) => {
        e.preventDefault();
        console.log(e.target)
        emailjs.sendForm('service_slshpho', 'template_u7fcjsa', e.target, 'user_AM1vMC2IrayZgWJHi7c3N')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };
    return (
        <section>
            <Helmet>
                <title>Frontendika — связаться с нами</title>
            </Helmet>
            <h1 className="section_title">Связаться со мной</h1>
            <form className={style.contact_form} onSubmit={Submit} noValidate>
                <div className={style.form_field}>
                    <input type='text' name='name' className={style.form_field_input} placeholder='Имя' required></input>
                </div>
                <div className={style.form_field}>
                    <input type='email' name='email' className={style.form_field_input} placeholder='Почта' required></input>
                </div>

                <div className={style.form_field}>
                    <input type='text' name='subject' className={style.form_field_input} placeholder='Тема' required></input>
                </div>

                <div className={style.form_field}>
                    <input type='text' name='message' className={style.form_field_input} placeholder='Сообщение' required></input>
                </div>
                <button className='submit-btn' type='submit'>Отправить</button>
            </form>
        </section>
    )
}

export default Contact
