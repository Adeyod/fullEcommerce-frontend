import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { others } = currentUser;
  const { user } = currentUser;

  return (
    <div>
      <div className="my-10 ">
        <p className="text-2xl uppercase underline font-bold my-5">Profile</p>
        <div className="flex flex-col items-center gap-5">
          <img
            src={others ? others.profilePicture : user.profilePicture}
            alt="profileImg"
            className="w-32 rounded-full"
          />
          <div className="flex flex-col items-start">
            <p>
              <span className="uppercase font-bold">First Name: </span>
              {others ? others.firstName : user.firstName}
            </p>
            <p>
              <span className="uppercase font-bold">Last Name: </span>
              {others ? others.lastName : user.lastName}
            </p>
            <p>
              <span className="uppercase font-bold">Role: </span>
              {others ? others.role : user.role}
            </p>
            <p>
              <span className="uppercase font-bold">Email: </span>
              {others ? others.email : user.email}
            </p>
          </div>
        </div>
      </div>
      <Link
        to="/edit-profile"
        className="font-bold border p-2 rounded border-slate-500 bg-slate-700 text-white uppercase"
      >
        Edit Profile
      </Link>
    </div>
  );
};

export default Profile;
