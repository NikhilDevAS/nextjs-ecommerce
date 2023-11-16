import Center from '@/components/Center';
import Header from '@/components/Header';
import Button from '@/components/properties/Button';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from '@/components/Context/ContextProvider';

export default function LoginPage() {
  const { userInfo, addUserInfo, authStatus } = useContext(Context);
  const [error, setError] = useState(null);
  const router = useRouter();
  const from =
    router.query.from === undefined || Array.isArray(router.query.from)
      ? '/'
      : router.query.from;

  useEffect(() => {
    if (authStatus === 'authenticated') {
      if (userInfo.phoneNumber) {
        router.replace(from || '/');
      } else {
        router.push('/account');
      }
    }
  }, [authStatus]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post('/api/user/login', data);
      if (res.data) {
        addUserInfo(res.data.userInfo);
      }
    } catch (err) {
      setError(err.response.data.errMsg);
    }
  };
  return (
    <section>
      <Header />
      <Center>
        <div className="mt-[100px] w-full h-[70vh] flex justify-center items-center p-5">
          <div className=" p-5 w-full md:w-[40%] min-h-[50%] bg-white shadow-md rounded-md">
            <h1 className="title">Login</h1>

            {error && (
              <div className="text-red-600 bg-red-300 p-3 w-full">{error}</div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                placeholder="email"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Required email!',
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
                placeholder="*****"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Required password!',
                  },
                  minLength: {
                    value: 6,
                    message: 'Need minimum 6 characters!',
                  },
                })}
              />
              {errors && errors.password && (
                <p className="text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
              <div className="mt-4">
                <Button submit={true} black={true}>
                  {'Login'.toUpperCase()}
                </Button>
              </div>
            </form>

            <div className="mt-5">
              <Link className="text-blue-600" href={'/signup'}>
                Don't have an account? Click here to SignUp
              </Link>
            </div>
          </div>
        </div>
      </Center>
    </section>
  );
}
