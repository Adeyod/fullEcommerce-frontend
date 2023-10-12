import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import Login from './pages/Login';
import ProductDetails from './pages/productDetails';
import NavBar from './components/NavBar';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import ResetPassword from './pages/ResetPassword';
import EditProfile from './pages/EditProfile';
import { useEffect } from 'react';
import { loginSuccess } from './redux/userSlice';
import { useDispatch } from 'react-redux';
import ProtectedRoutes from './components/ProtectedRoutes';
import CreateProduct from './pages/CreateProduct';
import CheckOut from './pages/CheckOut';
// import { ColorRing } from 'react-loader-spinner';
import CheckoutSuccess from './components/CheckoutSuccess';
import Favourites from './pages/Favourites';

const App = () => {
  const dispatch = useDispatch();
  // const [admin, setAdmin] = useState(false);

  // const { currentUser } = useSelector((state) => state.user);

  // const { others } = currentUser;
  // const { user } = currentUser;

  // const handlePath = () => {
  //   if (others.role || user.role === 'admin') {
  //     navigate('/create-product');
  //   } else {
  //     navigate('/');
  //   }
  // };

  // const handle = () => {
  //   if (currentUser !== null) {
  //     // const { others, user } = currentUser;
  //     if (currentUser?.others?.role || currentUser?.user?.role === 'admin') {
  //       setAdmin(true);
  //       console.log(admin);
  //     } else {
  //       setAdmin(false);
  //     }
  //   } else {
  //     setAdmin(false);
  //   }
  // };

  // handle();

  useEffect(() => {
    const loginSuccessApi = () => {
      fetch('http://localhost:3030/auth/login/success', {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error('Authentication failed');
        })
        .then((resObject) => {
          // setUser(resObject.user);
          dispatch(loginSuccess(resObject));
        })
        .catch((err) => {
          console.log(err);
        });
    };
    loginSuccessApi();
  }, []);

  return (
    <div>
      <NavBar />
      <Routes>
        {/* <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        /> */}
        <Route path="/" element={<HomePage />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />

        {/* ASSOCIATED WITH LOGIN AND REGISTER */}
        <Route path="/login" element={<Login />} />
        <Route path="/users/:id/confirm/:token" element={<VerifyEmail />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password/:id/:token" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* <Route element={<RoleBasedRoutes />}> */}
        <Route path="/create-product" element={<CreateProduct />} />
        {/* </Route> */}

        {/* THIS CAN ONLY BE SEEN IF YOU ARE AN ADMIN */}

        {/* LOGGED IN USERS CAN ONLY SEE THIS */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/checkout-success" element={<CheckoutSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/check-out" element={<CheckOut />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
