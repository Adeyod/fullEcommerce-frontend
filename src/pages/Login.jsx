import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import FAuth from '../components/FAuth';
import AAuth from '../components/AAuth';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice';

import { ThreeDots } from 'react-loader-spinner';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState('');

  const { loading } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginStart());
      const response = await fetch(
        'https://fullecommerce-backend.onrender.com/api/users/userLogin',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const api = await response.json();
      if (!api.success) {
        dispatch(loginFailure(api));
        toast.info(api.message);
        return;
      }
      dispatch(loginSuccess(api));
      toast.success(api.message);
      navigate('/profile');
      return;
    } catch (error) {
      dispatch(loginFailure());
      toast.error(error.message);

      console.log(error);
    }
  };
  // useEffect(() => {
  //   handleSubmit();
  // }, []);

  return (
    <div className="">
      <div className="">
        <p className="text-xl underline mt-2 uppercase font-bold text-center">
          Login
        </p>

        <div className="md:flex items-center px-10">
          <form onSubmit={handleSubmit} className="md:w-[40%]">
            <div className="">
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

              <div className="md:flex md:flex-col gap-4 justify-center">
                <div className="flex gap-2 font-bold mt-2">
                  <p className="md:text-justify lg:text-xl md:text-[15px]">
                    Dont have an account ?
                  </p>
                  <Link
                    className="text-blue-700 lg:text-xl text-[15px] hover:underline"
                    to="/register"
                  >
                    Register
                  </Link>
                </div>
                <div className="flex lg:text-xl text-[15px] gap-2 font-bold mt-2">
                  <Link
                    className="text-blue-700 hover:underline"
                    to="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>

              <button className="w-full mt-2 bg-slate-600 uppercase rounded-full p-2 text-white font-bold h-12">
                {/* {loading ? (
                  <ThreeDots
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                    className="mb-5 flex "
                  />
                ) : (
                  'Login'
                )} */}
                {loading ? 'Loading...' : 'Login'}
              </button>
            </div>
          </form>
          <div className="flex gap-2 my-3 md:flex-col items-center justify-center mx-auto ml-[10%] md:w-[10%]">
            <div className=" w-[30%] h-[2px] bg-gray-500 md:h-[30vh] md:w-[2px] md:bg-gray-500"></div>
            <p>or</p>
            <div className=" w-[30%] h-[2px] bg-gray-500 md:h-[30vh] md:w-[2px] md:bg-gray-500"></div>
          </div>
          <div className=" gap-y-2 md:gap-y-6 flex-col items-center justify-center md:w-[40%] flex">
            <OAuth />
            <FAuth />
            {/* <AAuth /> */}
          </div>
        </div>
      </div>
      <hr className="my-4" />
    </div>
  );
};

export default Login;
