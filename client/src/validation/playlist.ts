import * as yup from 'yup';
export const PlaylistSchema = yup.object().shape({
  name: yup.string().min(1, '최소 1글자').max(6, '최대 6글자').required('필수'),
  desc: yup
    .string()
    .min(3, '최소 3글자')
    .max(100, '최대 100글자')
    .required('필수'),
});
