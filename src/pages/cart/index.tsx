import { Trash2 } from "lucide-react";
import useAppContext from "../../hooks/useAppContext";
import { useEffect, useState } from "react";
import { useGetCartItems, useRemoveCartItem } from "../../hooks/useCart";
import type { ItemCart } from "../../helpers/data";

const CartPage = () => {
  const { cartItems, setCurrentItemsInCart } = useAppContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const [quantityDeleted, setQuantityDeleted] = useState(0);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [itemToRemove, setItemToRemove] = useState<ItemCart | undefined>(
    undefined
  );
  const { mutate, isSuccess } = useRemoveCartItem();
  const { mutate: mutateCartItems } = useGetCartItems();

  const handleRemoveItem = (id: number) => {
    const itemSelected = cartItems.find((item) => item.id === id);
    if (itemSelected) {
      setItemToRemove(itemSelected);
      setQuantityDeleted(itemSelected.quantity);
      mutate(id);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      if (itemToRemove && selectedItems.includes(itemToRemove.id)) {
        setTotalPrice(
          (prev) =>
            prev - itemToRemove.item.public_price * itemToRemove.quantity
        );
        setSelectedItems(
          selectedItems.filter((itemId) => itemId !== itemToRemove.id)
        );
      }
      setCurrentItemsInCart((prev) => prev - quantityDeleted);
    }
    mutateCartItems();
  }, [isSuccess, setCurrentItemsInCart, quantityDeleted, mutateCartItems]);

  return (
    <div className="flex w-full h-full items-center justify-center px-10 sm:px-20 lg:px-[220px]">
      <div className="w-full flex flex-col h-full">
        <div className="w-full py-6 bg-red-600 mt-10 flex items-center justify-between rounded">
          <p className="text-white ml-6 font-semibold text-2xl ">Cart</p>
          <p className="text-white mr-6 font-semibold text-2xl">
            {totalPrice.toLocaleString()} VND
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="flex flex-col h-full mb-[50px] gap-4 mt-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex flex-row">
                <div className="w[20px] flex items-center justify-center mr-[10px]">
                  <input
                    type="checkbox"
                    id={`item-${item.id}`}
                    checked={selectedItems.includes(item.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        // Thêm item vào danh sách đã chọn
                        setSelectedItems([...selectedItems, item.id]);
                        setTotalPrice(
                          (prev) =>
                            prev + item.item.public_price * item.quantity
                        );
                      } else {
                        // Xóa item khỏi danh sách đã chọn
                        setSelectedItems(
                          selectedItems.filter((id) => id !== item.id)
                        );
                        setTotalPrice(
                          (prev) =>
                            prev - item.item.public_price * item.quantity
                        );
                      }
                    }}
                  />
                </div>
                <div className="w-[70px] sm:w-[100px] border border-r-0 border-slate-200 rounded-l-lg">
                  <img
                    src={item.item.images[0].image_link}
                    alt={`item-avt-${index}`}
                    className="w-[70px] h-[70px] sm:w-[100px] sm:h-[100px] object-cover rounded-md"
                  />
                </div>
                <div className="flex justify-between flex-1 border border-l-0 border-slate-200 rounded-r-lg">
                  <div className="flex flex-col justify-start gap-1">
                    <h2 className="font-semibold text-lg sm:text-xl text-start ml-[10px] line-clamp-1 overflow-hidden">
                      {item.item.item_name}
                    </h2>
                    <p className="text-start text-sm sm:text-base sm:font-medium ml-[10px]">{`${item.item.public_price.toLocaleString()} VND`}</p>
                    <p className="text-start text-xs sm:text-sm text-slate-600 ml-[10px]">{`${item.quantity} items`}</p>
                  </div>

                  <div className="flex h-[70px] w-[30px] sm:w-[60px] sm:h-[100px] items-center justify-center">
                    <button onClick={() => handleRemoveItem(item.id)}>
                      <Trash2 />
                    </button>
                  </div>
                </div>
              </div>
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
