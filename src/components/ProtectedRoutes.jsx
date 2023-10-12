import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoutes = () => {
  const { currentUser } = useSelector((state) => state.user);
  return <div>{currentUser ? <Outlet /> : <Navigate to="/login" />}</div>;
};
export const RoleBasedRoutes = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { others } = currentUser;
  const { user } = currentUser;
  return (
    <div>
      {others?.role || user?.role === 'admin' ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default ProtectedRoutes;
