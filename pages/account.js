import AccountPage from '@/components/AccountPage';
import Change_Password from '@/components/Change_Password';
import { Context } from '@/components/Context/ContextProvider';
import MyOrdersPage from '@/components/MyOrders';
import ProfilePage from '@/components/Profile';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

export default function MainProfilePage() {
  const { authStatus } = useContext(Context);
  const [pagetitle, setPageTitle] = useState('Profile');
  const router = useRouter();

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.replace({
        pathname: '/login',
        query: { from: router.asPath },
      });
    }
  }, [authStatus]);

  useEffect(() => {
    switch (pagetitle) {
      case 'Profile':
        setPageTitle('Profile');
        break;
      case 'Myorder':
        setPageTitle('Myorder');
        break;
      case 'Change_Password':
        setPageTitle('Change_Password');
        break;

      default:
        setPageTitle('Profile');
    }
  }, [pagetitle]);

  return (
    <section>
      <AccountPage pagetitle={pagetitle} setPageTitle={setPageTitle}>
        {authStatus == 'authenticated' && pagetitle === 'Profile' && (
          <ProfilePage />
        )}
        {pagetitle === 'Myorder' && <MyOrdersPage />}
        {pagetitle === 'Change_Password' && <Change_Password />}
      </AccountPage>
    </section>
  );
}
