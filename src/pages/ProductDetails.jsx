import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addToCart } from '../redux/cartSlice';

const ProductDetails = () => {
  const [currentProduct, setCurrentProduct] = useState(null);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchCurrentProduct = async () => {
      try {
        const response = await fetch(
          `https://fullecommerce-backend.onrender.com/api/products/getProductById/${id}`
        );
        if (!response.ok) {
          throw new Error('Network not ok');
        }
        const data = await response.json();
        setCurrentProduct(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCurrentProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (!currentProduct || currentProduct === null) {
    return <div>Loading...</div>;
  }

  const { product } = currentProduct;
  console.log('product:', currentProduct);

  return (
    <div className="m-10 gap-x-8">
      <p className="text-3xl mb-4 underline italic text-accent">
        Product Details
      </p>
      <div className="lg:flex lg:flex-row-reverse items-center">
        <div className="border lg:mr-[80px] w-[50%] flex mx-auto items-center px-6">
          <img
            className=" object-contain w-[100%] h-[70%] lg:h-[500px]"
            src={
              currentProduct?.product?.images.url
                ? currentProduct?.product?.images.url
                : currentProduct?.product?.images
            }
            alt={currentProduct?.title}
            // loading="lazy"
          />
        </div>

        <div className="mt-5 details lg:mx-[26px] lg:w-[50%] text-2xl ">
          <p className="mb-12 border-2 border-primary py-10 px-5">
            <span className="mr-2 uppercase font-bold italic underline">
              description:
            </span>
            {currentProduct?.product?.description}
          </p>
          <div className="details flex flex-col items-start">
            <p>
              <span className="mr-5 uppercase font-bold italic underline">
                title:
              </span>
              {currentProduct?.product?.title}
            </p>

            <p className="">
              <span className="mr-5 uppercase font-bold italic underline">
                price:
              </span>
              ${currentProduct?.product?.price}
            </p>

            <p>
              <span className="mr-5 uppercase font-bold italic underline">
                category:
              </span>
              {currentProduct?.product?.category}
            </p>

            {/* <p>
              <span className="mr-5 uppercase font-bold italic underline">
                discount:
              </span>
              {currentProduct?.product?.discountPercentage}%
            </p> */}

            <p>
              <span className="mr-5 uppercase font-bold italic underline">
                brand:
              </span>
              {currentProduct?.product?.brand}
            </p>
          </div>
          <button
            onClick={() => handleAddToCart(product)}
            className="active:bg-blue-400 active:scale-50 uppercase bg-button p-2 rounded font-bold text-white mb-[40px]"
          >
            add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
