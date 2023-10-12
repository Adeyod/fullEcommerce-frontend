import { useState } from 'react';
import { useSelector } from 'react-redux';

const EditProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { others } = currentUser;
  const [formData, setFormData] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('I want to submit changes to database');
  };
  return (
    <div>
      <div className="my-10 ">
        <p className="text-2xl uppercase underline font-bold my-5">Profile</p>
        <div className="flex flex-col items-center gap-5">
          <form onSubmit={handleSubmit}>
            <img
              src={others.profilePicture}
              alt="profileImg"
              className="w-32 rounded-full"
            />
            <div className="flex flex-col items-start">
              <input
                className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12"
                type="text"
                placeholder="first name..."
                defaultValue={others.firstName}
                id="firstName"
                onChange={handleChange}
              />

              <input
                className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12"
                type="text"
                placeholder="first name..."
                defaultValue={others.lastName}
                id="lastName"
                onChange={handleChange}
              />

              <p>
                <span className="uppercase font-bold">Email: </span>
                {others.email}
              </p>
            </div>
            <button className="font-bold border my-4 p-2 rounded border-slate-500 bg-slate-700 text-white uppercase">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
