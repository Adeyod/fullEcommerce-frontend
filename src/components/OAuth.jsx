import { FcGoogle } from 'react-icons/fc';
const OAuth = () => {
  const googleLogin = async () => {
    const res = window.open(
      'https://fullecommerce-backend.onrender.com/auth/google',
      '_self'
    );
    // const response = await fetch('http://localhost:3030/api/users/google');
    const data = await res.json();
    console.log(data);
    // console.log(data);
  };

  return (
    <div className="w-[70%] flex flex-col mx-auto relative mt-2 border rounded border-black p-2 text-white font-bold h-12">
      {/* <div className=" flex md:gap-6 items-center px-4 mx-auto"> */}
      <button className="pl-4" onClick={googleLogin}>
        <FcGoogle className="text-3xl absolute left-2" />
        <p className="text-black">Google</p>
      </button>
      {/* </div> */}
    </div>
  );
};

export default OAuth;
