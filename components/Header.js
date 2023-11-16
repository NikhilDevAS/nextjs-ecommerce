import Link from 'next/link';
import Center from './Center';
import { useContext, useState } from 'react';
import { Context } from './Context/ContextProvider';

export default function Header() {
  const { userInfo, authStatus, cartProducts, removeUserInfo } =
    useContext(Context);

  const [mobileNav, setMobileNav] = useState(false);
  return (
    <header className="fixed top-0">
      {/* <pre className="text-white">{JSON.stringify(userInfo)}</pre> */}
      <Center>
        <div className="flex justify-between px-0 py-[15px] items-center">
          <Link
            className="text-white text-2xl relative z-10 ml-5 md:ml-0"
            href={'/'}
          >
            Ecommerce
          </Link>
          <div>
            <nav className="desktop-nav">
              <Link className="nav-link" href={'/'}>
                Home
              </Link>
              <Link className="nav-link" href={'/products'}>
                All Products
              </Link>
              <Link className="nav-link" href={'/categories'}>
                Categories
              </Link>

              <Link className="nav-link" href={'/cart'}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                  />
                </svg>
                Cart ({cartProducts.length})
              </Link>
              {authStatus !== 'authenticated' ? (
                <Link className="nav-link" href={'/login'}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>{' '}
                  <div>Login</div>
                </Link>
              ) : (
                <>
                  <Link className="nav-link" href={'/account'}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {userInfo && <span>{userInfo?.name}</span>}
                  </Link>
                  <button className="nav-link" onClick={() => removeUserInfo()}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                      />
                    </svg>
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
          {mobileNav && (
            <nav className="fixed bg-[#222] pt-[70px] px-[20px] pb-[20px] top-0 bottom-0 left-0 right-0 gap-10">
              <Link className="nav-link" href={'/'}>
                Home
              </Link>
              <Link className="nav-link" href={'/products'}>
                All Products
              </Link>
              <Link className="nav-link" href={'/categories'}>
                Categories
              </Link>
              <Link className="nav-link" href={'/account'}>
                Account
              </Link>
              <Link className="nav-link" href={'/cart'}>
                Cart ({cartProducts.length})
              </Link>
            </nav>
          )}
          <button
            className="md:hidden z-10 mr-5"
            onClick={() => setMobileNav(!mobileNav)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </div>
      </Center>
    </header>
  );
}
