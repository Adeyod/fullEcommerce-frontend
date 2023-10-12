import { useState } from 'react';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import FAuth from '../components/FAuth';
import AAuth from '../components/AAuth';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'https://fullecommerce-backend.onrender.com/api/users/createUser',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      toast.info(data.message);
      alert(data.message);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className=" justify-evenly  px-4">
      <div className="">
        <p className="text-xl underline mt-2 uppercase font-bold text-center">
          Register
        </p>
        <div className="md:flex items-center justify-around">
          <form onSubmit={handleSubmit}>
            <div className="">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="text-justify">
                  First Name
                </label>
                <input
                  className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12"
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="First name here..."
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="text-justify">
                  Last Name
                </label>
                <input
                  className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12"
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Last name here..."
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="text-justify">
                  Email Address
                </label>
                <input
                  className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12 "
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email here..."
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="address" className="text-justify">
                  Address
                </label>
                <input
                  className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12 "
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address..."
                  required
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="text-justify">
                  Password
                </label>
                <input
                  className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12 "
                  type="password"
                  name="password"
                  id="password"
                  minLength={8}
                  placeholder="Password here..."
                  required
                  onChange={handleChange}
                />
              </div>

              <div className="flex gap-2 font-bold mt-2">
                <p className="text-justify">Already have an account ?</p>
                <Link className="text-blue-700 hover:underline" to="/login">
                  Login
                </Link>
              </div>

              <button className="w-full mt-2 bg-slate-600 uppercase rounded-full p-2 text-white font-bold h-12">
                register
              </button>
            </div>
          </form>
          <div className="flex gap-2 my-3 md:flex-col items-center justify-center mx-auto">
            <div className=" w-[30%] h-[2px] bg-gray-500 md:h-[30vh] md:w-[2px] md:bg-gray-500"></div>
            <p>or</p>
            <div className=" w-[30%] h-[2px] bg-gray-500 md:h-[30vh] md:w-[2px] md:bg-gray-500"></div>
          </div>
          <div className=" gap-y-2 md:gap-y-6 flex-col flex">
            <OAuth />
            <FAuth />
            <AAuth />
          </div>
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
};

export default Register;
