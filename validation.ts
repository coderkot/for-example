import * as yup from "yup";
import {numberRegExp, passwordRegExp, phoneRegExp, phoneUnmaskTransform} from "../../../utils/utils";

export const EntityPhoneValidationSchema = yup.object({
    name: yup
        .string()
        .min(2, 'Короткое поле Полное наименование*')
        .max(500, 'Длинное поле Полное наименование*')
        .required('Заполните поле Полное наименование*'),
    inn: yup
        .string()
        .matches(numberRegExp, "Необходимо вводить цифры")
        .min(10, 'ИНН должен быть от 10 до 12 цифр')
        .max(12, 'ИНН должен быть от 10 до 12 цифр')
        .required('Заполните поле ИНН'),
    phone: yup
        .string()
        .transform(phoneUnmaskTransform)
        .min(2, 'Короткий номер')
        .max(20, 'Длинный номер')
        .matches(phoneRegExp, 'Некорректный номер телефона')
        .required('Заполните поле телефон'),
    password: yup
        .string()
        .min(8, 'Пароль должен быть больше 8 символов')
        .max(50, 'Слишком длинный пароль')
        .oneOf([yup.ref('passwordConfirm'), null], 'Пароли не совпадают')
        .matches(passwordRegExp, 'Пароль должен содержать как минимум: заглавную букву, цифру, прописную букву')
        .required('Поле пароль должно быть заполнено'),
    passwordConfirm: yup
        .string()
        .min(8, 'Пароль должен быть больше 8 символов')
        .max(50, 'Слишком длинный пароль')
        .matches(passwordRegExp, 'Пароль должен содержать как минимум: заглавную букву, цифру, прописную букву')
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
        .required('Поле подтверждение пароля должно быть заполнено'),
});

export const EntityEmailValidationSchema = yup.object({
    name: yup
        .string()
        .min(2, 'Короткое поле Полное наименование*')
        .max(500, 'Длинное поле Полное наименование*')
        .required('Заполните поле Полное наименование*'),
    inn: yup
        .string()
        .matches(numberRegExp, "Необходимо вводить цифры")
        .max(12, 'Длинное поле ИНН')
        .required('Заполните поле ИНН'),
    password: yup
        .string()
        .min(8, 'Пароль должен быть больше 8 символов')
        .max(50, 'Слишком длинный пароль')
        .oneOf([yup.ref('passwordConfirm'), null], 'Пароли не совпадают')
        .matches(passwordRegExp, 'Пароль должен содержать как минимум: заглавную букву, цифру, прописную букву')
        .required('Поле пароль должно быть заполнено'),
    passwordConfirm: yup
        .string()
        .min(8, 'Пароль должен быть больше 8 символов')
        .max(50, 'Слишком длинный пароль')
        .matches(passwordRegExp, 'Пароль должен содержать как минимум: заглавную букву, цифру, прописную букву')
        .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
        .required('Поле подтверждение пароля должно быть заполнено'),
    email: yup
        .string()
        .email('Введите валидный email')
        .required('Необходимо ввести email'),
});
