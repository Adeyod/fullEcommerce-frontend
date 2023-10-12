/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import {
  AiOutlineMenu,
  AiOutlineShoppingCart,
  AiOutlineClose,
} from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutSuccess } from '../redux/userSlice';
import { toast } from 'react-toastify';

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [admin, setAdmin] = useState(false);

  const { cartItems } = useSelector((state) => state.cart);

  const { currentUser } = useSelector((state) => state.user);

  // const roleDisplay = () => {
  // if (currentUser !== null) {
  //   // const { others, user } = currentUser;
  //   if (currentUser.others.role || currentUser.user.role === 'admin') {
  //     setAdmin(true);
  //     console.log(admin);
  //   } else {
  //     setAdmin(false);
  //   }
  // } else {
  //   setAdmin(false);
  // }
  // };

  // roleDisplay();

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const handleLogout = async () => {
    const response = await fetch(
      'https://fullecommerce-backend.onrender.com/api/users/userLogout'
    );

    if (response.status === 200) {
      document.cookie =
        'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      toast.success('Logout successful');
      dispatch(logoutSuccess());
      navigate('/login');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    // handleScroll();
  });
  return (
    <div
      className={`${
        isSticky
          ? 'fixed top-0 right-0 left-0 italic p-[23px] items-center text-white flex justify-between bg-button'
          : 'bg-primary italic p-[23px] items-center text-white flex justify-between'
      } transition-all duration-300 ease-in-out`}
    >
      <div className="font-bold  text-xl">
        <Link to="/">LOGO</Link>
      </div>
      <div className="flex md:flex-row-reverse items-center justify-between gap-x-4">
        <div className="relative">
          <Link to="/cart" className="text-4xl font-bold">
            <p className="absolute top-[-20px] bg-red-400 px-3 text-2xl rounded-full right-[-10px]">
              {cartItems && cartItems.length > 0 ? cartItems.length : ''}
            </p>
            <AiOutlineShoppingCart />
          </Link>
        </div>
        <div className="">
          <div className="hidden md:flex uppercase gap-3 font-bold">
            {currentUser && currentUser !== null ? (
              <div className=" flex gap-2">
                <button className="uppercase" onClick={handleLogout}>
                  logout
                </button>
                <Link to="/profile">profile</Link>
                <Link to="/favourites">Favourites</Link>

                <Link to="/create-product">create product</Link>
              </div>
            ) : (
              <div className="flex gap-4">
                <Link to="/login">login</Link>
                <Link to="/register">register</Link>
              </div>
            )}
          </div>
          <div className="flex md:hidden">
            <button onClick={handleToggle}>
              {toggle ? (
                <AiOutlineMenu className="text-4xl font-bold" />
              ) : (
                <AiOutlineClose className="text-4xl font-bold" />
              )}
            </button>
            <div
              className={
                toggle
                  ? 'absolute left-[-1000px]'
                  : 'left-0 flex flex-col bg-aPink absolute p-6 items-start gap-3 top-[82px] text-slate-800 h-[100vh] uppercase font-bold z-50'
              }
              onClick={handleToggle}
            >
              {currentUser && currentUser !== null ? (
                <div className="flex flex-col gap-2 items-start">
                  <button className="uppercase" onClick={handleLogout}>
                    logout
                  </button>
                  <Link to="/profile">profile</Link>
                  <Link to="/favourites">Favourites</Link>

                  <Link to="/create-product">create product</Link>
                </div>
              ) : (
                <div className="flex flex-col">
                  <Link to="/login">login</Link>
                  <Link to="/register">register</Link>
                  {/* <Link to="/create-product">create product</Link> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
