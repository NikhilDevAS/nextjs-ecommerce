import Center from '@/components/Center';
import Header from '@/components/Header';

export default function AccountPage({ children, ...props }) {
  return (
    <section>
      <Header />
      <Center>
        <div className="mt-[65px] flex md:hidden items-center justify-center shadow-md rounded-md gap-5">
          <button
            onClick={() => props.setPageTitle('Profile')}
            className={
              props.pagetitle === 'Profile'
                ? 'my-3 cursor-pointer text-lg bg-gray-300 py-2 px-2 rounded-md'
                : 'my-3 cursor-pointer text-lg hover:bg-gray-300 py-2 px-2 rounded-md'
            }
          >
            Profile
          </button>
          <button
            onClick={() => props.setPageTitle('Myorder')}
            className={
              props.pagetitle === 'Myorder'
                ? 'my-3 cursor-pointer text-lg bg-gray-300 py-2 px-2 rounded-md'
                : 'my-3 cursor-pointer text-lg hover:bg-gray-300 py-2 px-2 rounded-md'
            }
          >
            My Orders
          </button>
          <button
            onClick={() => props.setPageTitle('Change_Password')}
            className={
              props.pagetitle === 'Change_Password'
                ? 'my-3 cursor-pointer text-lg bg-gray-300 py-2 px-2 rounded-md'
                : 'my-3 cursor-pointer text-lg hover:bg-gray-300 py-2 px-2 rounded-md'
            }
          >
            Change_Password
          </button>
        </div>
        <div className="md:mt-[100px] mt-0 md:flex gap-5">
          <div className="w-[20%] min-h-[60vh] p-5 shadow-md rounded-md hidden md:flex">
            <ul className="w-full">
              <li
                onClick={() => props.setPageTitle('Profile')}
                className={
                  props.pagetitle === 'Profile'
                    ? 'my-3 cursor-pointer text-lg bg-gray-300 py-2 px-2 rounded-md'
                    : 'my-3 cursor-pointer text-lg hover:bg-gray-300 py-2 px-2 rounded-md'
                }
              >
                Profile
              </li>
              <li
                onClick={() => props.setPageTitle('Myorder')}
                className={
                  props.pagetitle === 'Myorder'
                    ? 'my-3 cursor-pointer text-lg bg-gray-300 py-2 px-2 rounded-md'
                    : 'my-3 cursor-pointer text-lg hover:bg-gray-300 py-2 px-2 rounded-md'
                }
              >
                My Orders
              </li>
              <li
                onClick={() => props.setPageTitle('Change_Password')}
                className={
                  props.pagetitle === 'Change_Password'
                    ? 'my-3 cursor-pointer text-lg bg-gray-300 py-2 px-2 rounded-md'
                    : 'my-3 cursor-pointer text-lg hover:bg-gray-300 py-2 px-2 rounded-md'
                }
              >
                Change_Password
              </li>
            </ul>
          </div>
          <div className="w-full md:w-[80%] p-5">{children}</div>
        </div>
      </Center>
    </section>
  );
}
