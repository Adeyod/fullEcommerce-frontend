import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const navigate = useNavigate();
  const param = useParams();
  const [formData, setFormData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await fetch(
        `https://fullecommerce-backend.onrender.com/api/users/reset-password/${param.id}/${param.token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      setLoading(false);
      if (!data.success) {
        toast.error(data.message);
        return;
      } else {
        toast.success(data.message);
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" flex flex-col justify-center  px-4 item-center mt-24">
      <p className="text-xl underline mt-2 uppercase font-bold text-center">
        Reset Password
      </p>

      <div className="md:flex items-center justify-around">
        <form onSubmit={handleSubmit}>
          <div className="">
            <div className="flex flex-col">
              <label htmlFor="oldPassword" className="text-justify">
                Old Password
              </label>
              <input
                className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12 "
                type="password"
                name="oldPassword"
                id="oldPassword"
                minLength={8}
                placeholder="Password here..."
                required
                onChange={handleChange}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="newPassword" className="text-justify">
                New Password
              </label>
              <input
                className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12 "
                type="password"
                name="newPassword"
                id="newPassword"
                minLength={8}
                placeholder="New Password here..."
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
  );
};

export default ResetPassword;
