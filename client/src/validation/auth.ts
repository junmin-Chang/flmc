import * as yup from 'yup';
export const RegisterSchema = yup.object().shape({
  userId: yup
    .string()
    .min(7, '너무 짧습니다. (7자 이상 12자 이하)')
    .max(12, '너무 깁니다. (7자 이상 12자 이하)')
    .required('필수 항목입니다.'),
  username: yup
    .string()
    .min(3, '너무 짧습니다. (3자 이상 8자 이하)')
    .max(8, '너무 깁니다. (3자 8자 이하)')
    .required('필수 항목입니다.'),
  password: yup
    .string()
    .min(8, '너무 짧습니다. (8자 이상 15자 이하)')
    .max(15, '너무 깁니다. (8자 이상 15자 이하)')
    .required('필수 항목입니다.'),
});

export const LoginSchema = yup.object().shape({
  userId: yup.string().required('아이디를 입력해주세요'),
  password: yup.string().required('패스워드를 입력해주세요'),
});
