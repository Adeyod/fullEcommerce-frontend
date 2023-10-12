import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState('');
  const [productImg, setProductImg] = useState('');
  const [loading, setLoading] = useState(false);

  // const { currentUser } = useSelector((state) => state.user);
  // const { others } = currentUser;
  // const { user } = currentUser;

  const handleFormData = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('file', productImg);
    data.append('upload_preset', 'myEcommerce');
    const imgUpload = await axios.post(
      `https://api.cloudinary.com/v1_1/dgxyjw6q8/image/upload`,
      data
    );
    if (imgUpload.data) {
      try {
        setLoading(true);
        const response = await fetch(
          'https://fullecommerce-backend.onrender.com/api/products/addProduct',
          {
            method: 'POST',
            credentials: 'include',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Credentials': true,
            },
            body: JSON.stringify({ formData, images: imgUpload.data }),
          }
        );
        setLoading(false);
        const data = await response.json();
        toast.success(data.message);
        navigate('/');
        console.log(data);
      } catch (error) {
        toast.error(error);
        console.log(error);
      }
    } else {
      console.log('Something went wrong');
    }
  };

  return (
    <div className="uppercase lg:flex justify-evenly  px-4">
      <div>
        <h1 className="uppercase font-bold text-center text-xl underline mt-2">
          create product
        </h1>
        <form onSubmit={handleSubmit}>
          <div className=" justify-center">
            <div className="my-4 flex flex-col">
              <label htmlFor="title" className="text-justify">
                product Name
              </label>
              <input
                className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12"
                type="text"
                name="title"
                id="title"
                onChange={handleFormData}
                placeholder="Product name here..."
                required
              />
            </div>

            <div className="flex mb-4 flex-col">
              <label htmlFor="category" className="text-justify">
                Product Category
              </label>
              <select
                className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12"
                type="text"
                name="category"
                id="category"
                onChange={handleFormData}
                placeholder="Product category..."
                required
              >
                <option value="">SELECT CATEGORY</option>
                <option value="fashion">FASHION</option>
                <option value="cosmetics">COSMETICS</option>
                <option value="Wears">ELECTRONICS</option>
                <option value="kitchenUtensils">KITCHEN UTENSILS </option>
              </select>
            </div>

            <div className="flex  mb-4 flex-col">
              <label htmlFor="email" className="text-justify">
                Product Brand
              </label>
              <input
                className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12 "
                type="text"
                onChange={handleFormData}
                name="brand"
                id="brand"
                placeholder="Product brand..."
                required
              />
            </div>

            {/* <div className="flex  mb-4 flex-col">
              <label htmlFor="percentageDiscount" className="text-justify">
                Percentage Discount
              </label>
              <select
                className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12 "
                type="text"
                name="discountPercentage"
                id="discountPercentage"
                // placeholder="Password here..."

                onChange={handleFormData}
                required
              >
                <option value="">choose percentage discount</option>
                <option value="5">5%</option>
                <option value="7.5">7.5%</option>
                <option value="12">12%</option>
                <option value="18.75">18.75%</option>
              </select>
            </div> */}

            <div className="flex  mb-4 flex-col">
              <label htmlFor="price" className="text-justify">
                Price
              </label>
              <input
                className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12 "
                type="number"
                name="price"
                id="price"
                onChange={handleFormData}
                // placeholder="Confirm Password..."
                required
              />
            </div>

            <div className="flex  mb-4 flex-col">
              <label htmlFor="price" className="text-justify">
                stock
              </label>
              <input
                className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12 "
                type="number"
                name="stock"
                id="stock"
                onChange={handleFormData}
                // placeholder="Confirm Password..."
                required
              />
            </div>

            <div className="flex  mb-4 flex-col">
              <label htmlFor="price" className="text-justify">
                images
              </label>
              <input
                className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12 "
                type="file"
                name="images"
                id="images"
                accept="image/"
                onChange={(e) => setProductImg(e.target.files[0])}
                // placeholder="Confirm Password..."
                required
              />
              {/* {productImg && (
                <img
                  src={productImg}
                  alt="productImg"
                  className="w-[50vw] lg:w-[20vw] mx-auto p-3 my-4 border-2 border-gray-200"
                />
              )} */}
            </div>

            <div className="flex  my-4 flex-col">
              <label htmlFor="price" className="text-justify">
                description
              </label>
              <textarea
                className="border-2 outline-none w-full lg:w-[500px] rounded-lg pl-2 h-12 "
                type="number"
                name="description"
                id="description"
                onChange={handleFormData}
                style={{ height: '40vh', resize: 'none' }}
                placeholder="Describe your product here..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full uppercase mt-2 bg-slate-600 rounded-lg p-2 text-white font-bold h-12"
            >
              {loading ? 'LOADING...' : 'submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
