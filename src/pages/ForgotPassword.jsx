import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState('');
  const [loading, setLoading] = useState(false);

  const { currentUser } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      if (currentUser) {
        navigate('/');
      }
      const response = await fetch(
        'https://fullecommerce-backend.onrender.com/api/users/forgotPassword',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      setLoading(false);
      const api = await response.json();
      if (api.success === true) {
        toast.success(api.message);
        navigate('/');
        return;
      }
      console.log(api);
    } catch (error) {
      return toast.error(error.message);
    }
  };
  // useEffect(() => {
  //   handleSubmit();
  // }, []);

  return (
    <div className=" justify-evenly  px-4">
      <div className="">
        <p className="text-xl underline mt-2 uppercase font-bold text-center">
          forgot password
        </p>

        <div className="md:flex items-center justify-around">
          <form onSubmit={handleSubmit}>
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

              <button className="w-full mt-2 bg-slate-600 uppercase rounded-full p-2 text-white font-bold h-12">
                {loading ? 'LOADING' : 'submit'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
