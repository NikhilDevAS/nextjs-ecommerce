import { useContext } from 'react';
import { Context } from './Context/ContextProvider';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';

export default function Change_Password() {
  const router = useRouter();
  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm();
  const { userInfo } = useContext(Context);

  const onSubmit = async (data) => {
    try {
      const response = await axios.put('/api/user/change-password', {
        ...data,
        userId: userInfo._id,
      });

      if (response.data.status) {
        router.push('/account');
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <section>
      <h1 className="title">Change Password</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Enter Current Password</label>
        <input
          type="password"
          placeholder="******"
          {...register('currentPassword', {
            required: {
              value: true,
              message: 'Required Current Password!',
            },
            minLength: {
              value: 6,
              message: 'Need minimum 6 characters!',
            },
          })}
        />
        {errors && errors.currentPassword && (
          <p className="text-sm text-red-600">
            {errors.currentPassword.message}
          </p>
        )}
        <label>Enter New Password</label>
        <input
          type="password"
          placeholder="******"
          {...register('newPassword', {
            required: {
              value: true,
              message: 'Required New Password!',
            },
            minLength: {
              value: 6,
              message: 'Need minimum 6 characters!',
            },
          })}
        />
        {errors && errors.newPassword && (
          <p className="text-sm text-red-600">{errors.newPassword.message}</p>
        )}
        <label>Enter Confirm Password</label>
        <input
          type="password"
          placeholder="******"
          {...register('confirmPassword', {
            required: {
              value: true,
              message: 'Confirm Password is required!',
            },
            validate: (val) => {
              if (watch('newPassword') != val) {
                return 'Your passwords do no match';
              }
            },
          })}
        />
        {errors && errors.confirmPassword && (
          <p className="text-sm text-red-600">
            {errors.confirmPassword.message}
          </p>
        )}
        <button
          type="submit"
          className="px-5 py-2 bg-black text-white text-md w-full mt-2 md:w-[20%]"
        >
          Save
        </button>
      </form>
    </section>
  );
}
