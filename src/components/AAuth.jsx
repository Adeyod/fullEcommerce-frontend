import { FcGoogle } from 'react-icons/fc';
const AAuth = () => {
  return (
    <div className="w-[70%] mx-auto mt-2 border rounded border-black p-2 text-white font-bold h-12">
      <div className=" flex md:gap-6 items-center px-4 mx-auto">
        <FcGoogle className="text-3xl" />
        <p className="text-black text-center mx-auto">Google</p>
      </div>
    </div>
  );
};

export default AAuth;
