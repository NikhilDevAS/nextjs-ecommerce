import { createContext, useEffect, useState } from 'react';

export const Context = createContext({});

export default function ContextProvider({ children }) {
  //   const ls = typeof window !== 'undefined' ? localStorage : null;

  // ++++++++++++++ { User Information Context } ++++++++++++++

  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
  }, [userInfo]);

  useEffect(() => {
    if (localStorage && localStorage.getItem('userInfo')) {
      setUserInfo(JSON.parse(localStorage.getItem('userInfo')));
    }
  }, []);

  function addUserInfo(details) {
    setUserInfo(details);
  }

  function removeUserInfo() {
    localStorage.removeItem('userInfo');
    setUserInfo(null);
  }

  // ++++++++++++++ { Cart Context } ++++++++++++++
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (cartProducts?.length > 0) {
      localStorage.setItem('cart', JSON.stringify(cartProducts));
    }
  }, [cartProducts]);
  useEffect(() => {
    if (localStorage && localStorage.getItem('cart')) {
      setCartProducts(JSON.parse(localStorage.getItem('cart')));
    }
  }, []);

  function addProduct(productId) {
    setCartProducts((prev) => [...prev, productId]);
  }

  function removeProduct(productId) {
    setCartProducts((prev) => {
      const pos = prev.indexOf(productId);
      if (pos !== -1) {
        return prev.filter((value, index) => index !== pos);
      }

      return prev;
    });
  }

  function clearCart() {
    setCartProducts([]);
    localStorage.removeItem('cart');
  }

  // ++++++++++++++ { Cart Context } ++++++++++++++

  return (
    <Context.Provider
      value={{
        authStatus: userInfo ? 'authenticated' : 'unauthenticated',
        userInfo,
        addUserInfo,
        removeUserInfo,
        cartProducts,
        addProduct,
        removeProduct,
        clearCart,
      }}
    >
      {children}
    </Context.Provider>
  );
}
