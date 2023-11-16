/* eslint-disable react-hooks/exhaustive-deps */
import Center from '@/components/Center';
import { Context } from '@/components/Context/ContextProvider';
import Header from '@/components/Header';
import Button from '@/components/properties/Button';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

export default function SignUpPage() {
  const { userInfo, authStatus, addUserInfo } = useContext(Context);
  const router = useRouter();

  useEffect(() => {
    if (authStatus === 'authenticated') {
      if (userInfo.phoneNumber) {
        router.push('/products');
      } else {
        router.push('/account');
      }
    }
  }, [authStatus]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('/api/user/signup', data);
      if (response.data) {
        addUserInfo(response.data.userInfo);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <Header />

      <Center>
        <div className="mt-[100px] w-full h-[70vh] flex justify-center items-center p-5">
          <div className=" p-5 w-full md:w-[40%] min-h-[50%] bg-white shadow-md rounded-md">
            <h1 className="title">Sign Up</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Full Name"
                {...register('name', {
                  required: {
                    value: true,
                    message: 'Name is required!',
                  },
                })}
              />
              {errors && errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
              <input
                type="email"
                placeholder="Email Address"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email is required!',
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors && errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
              <input
                type="password"
                placeholder="New Password"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required!',
                  },
                  minLength: {
                    value: 6,
                    message: 'Password length should be  minimum 6 characters!',
                  },
                })}
              />
              {errors && errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
              <input
                type="password"
                placeholder="Confirm Password"
                {...register('confirmPassword', {
                  required: {
                    value: true,
                    message: 'Confirm Password is required!',
                  },
                  validate: (val) => {
                    if (watch('password') != val) {
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
              <div className="mt-4">
                <Button submit={true} black={true}>
                  {'Sign Up'.toUpperCase()}
                </Button>
              </div>
            </form>

            <div className="mt-5">
              <Link className="text-blue-600" href={'/login'}>
                Have An Account? Click here to Login
              </Link>
            </div>
          </div>
        </div>
      </Center>
    </section>
  );
}
