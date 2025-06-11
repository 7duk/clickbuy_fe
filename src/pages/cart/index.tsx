import { useState } from "react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([1, 2, 3]);
  return (
    <div className="flex w-full h-full items-center justify-center !px-[250px]">
      <div className="w-full flex flex-col h-full">
        <div className="w-full h-[80px] bg-red-600 mt-10 flex items-center justify-start rounded">
          <p className="text-white ml-6 font-semibold text-2xl ">Cart</p>
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col h-full mb-[50px]">
            {cartItems.map((item, index) => (
              <div key={index}>{item}</div>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <h2 className="text-center text-xl mt-10">Your cart is empty</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
