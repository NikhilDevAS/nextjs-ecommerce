/* eslint-disable @next/next/no-img-element */
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Context } from './Context/ContextProvider';

export default function ProfilePage() {
  const { userInfo, addUserInfo } = useContext(Context);
  const [accessToEdit, setAccessToEdit] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [country, setCountry] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    if (userInfo?.phoneNumber) {
      setAccessToEdit(false);
    } else {
      setAccessToEdit(true);
    }

    setName(userInfo?.name);
    setEmail(userInfo?.email);
    setPhoneNumber(userInfo?.phoneNumber);
    setAddress(userInfo?.address);
    setStreet(userInfo?.street);
    setCity(userInfo?.city);
    setZipcode(userInfo?.zipcode);
    setCountry(userInfo?.country);
    setImage(userInfo?.image);
  }, [userInfo]);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await axios.put('/api/user/userinfo', {
        id: userInfo?._id,
        name,
        email,
        phoneNumber,
        address,
        street,
        city,
        zipcode,
        country,
        image,
      });

      if (response.data.userInfo) {
        addUserInfo(response.data.userInfo);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function uploadImages(e) {
    const files = e.target?.files;
    if (files?.length > 0) {
      // setIsUploading(true);
      const data = new FormData();
      for (const file of files) {
        data.append('file', file);
      }

      const res = await axios.post('/api/upload', data);

      if (res) {
        setImage(res.data.secure_url);
      }
    }
  }
  return (
    <section>
      <div className="flex  w-full justify-between items-center">
        <h1 className="title">Profile</h1>
        {!accessToEdit ? (
          <button
            className="bg-black text-white rounded-md px-5 py-2 text-sm flex justify-center items-center gap-2"
            onClick={() => setAccessToEdit(true)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>

            <span className="hidden md:flex">Edit Profile</span>
          </button>
        ) : (
          <button
            className="bg-black text-white rounded-md px-5 py-2 text-sm flex justify-center items-center gap-2"
            onClick={() => setAccessToEdit(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
              />
            </svg>

            <span className="hidden md:flex">Back</span>
          </button>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="md:flex gap-2">
          <div className="md:w-[30%] flex justify-center">
            {image ? (
              <div>
                <img
                  src={image}
                  alt=""
                  className="rounded-full w-[150px] h-[150px] md:w-[200px] md:h-[200px] shadow-lg"
                />
                {accessToEdit && (
                  <button
                    onClick={() => {
                      setImage('');
                    }}
                    className="text-red-500 mt-2 px-2 py-1"
                  >
                    Change Profile Image
                  </button>
                )}
              </div>
            ) : (
              <div>
                <label className="w-full h-56 order border-primary text-center cursor-pointer flex flex-col items-center justify-center gap-1 text-primary bg-white shadow-sm rounded-sm">
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
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                  <div>Upload Profile Image</div>
                  <input
                    type="file"
                    accept=".jpg, .png"
                    onChange={uploadImages}
                    className="hidden"
                  />
                </label>
              </div>
            )}
          </div>
          <div className="w-full md:w-[60%] px-5 py-2">
            <div className="md:flex items-center">
              <label className="w-[30%]">Full Name</label>
              <input
                type="text"
                readOnly={!accessToEdit}
                placeholder="Enter Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="md:flex items-center">
              <label className="w-[30%]">Email Address</label>
              <input
                type="text"
                readOnly={!accessToEdit}
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="md:flex items-center">
              <label className="w-[30%]">Phone Number</label>
              <input
                type="text"
                readOnly={!accessToEdit}
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="w-full mt-5">
          <h1 className="text-xl">Shipping Address</h1>
          <div className="mt-5 md:mt-0 md:flex items-center">
            <label className="w-[10%]">Address</label>
            <input
              type="text"
              readOnly={!accessToEdit}
              placeholder="Enter Your Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="md:flex items-center">
            <label className="w-[10%]">Street</label>
            <input
              type="text"
              readOnly={!accessToEdit}
              placeholder="Enter Your Street Name"
              value={street}
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className="md:flex items-center">
            <label className="w-[10%]">City</label>
            <input
              type="text"
              readOnly={!accessToEdit}
              placeholder="Enter Your City Name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="md:flex items-center">
            <label className="w-[10%]">Zip Code</label>
            <input
              type="text"
              readOnly={!accessToEdit}
              placeholder="Enter Your Zip Code / Pincode"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
            />
          </div>
          <div className="md:flex items-center">
            <label className="w-[10%]">Country</label>
            <input
              type="text"
              readOnly={!accessToEdit}
              placeholder="Enter Your Country Name"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
        </div>
        {accessToEdit && (
          <div className="w-full flex justify-center items-center mt-3">
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white text-sm w-[40%]"
            >
              Save
            </button>
          </div>
        )}
      </form>
    </section>
  );
}
