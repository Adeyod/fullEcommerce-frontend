import { AiOutlineFacebook } from 'react-icons/ai';
const FAuth = () => {
  const facebookLogin = async () => {
    window.open('http://localhost:3030/api/users/auth/facebook', '_self');
  };
  return (
    <div className="w-[70%] flex flex-col mx-auto relative mt-2 border rounded border-black p-2 text-white font-bold h-12 bg-blue-950">
      {/* <div className=" flex md:gap-6 items-center px-4 mx-auto"> */}
      <button onClick={facebookLogin}>
        <AiOutlineFacebook className="absolute text-3xl" />
        <p className="text-white text-center mx-auto">Facebook</p>
      </button>
      {/* </div> */}
    </div>
  );
};

export default FAuth;
