import React, {createContext, useContext, useReducer} from 'react';
import {IProduct} from '../components/product';

type ContextData = {
  cart: IProduct[];
  products: IProduct[];
};

export interface ICartContext extends ContextData {
  initializeProducts: (products: IProduct[]) => void;
  addProductToCart: (product: IProduct) => void;
  removeProductFromCart: (productId: string) => void;
}

const ADD_PRODUCT = 'add';
const REMOVE_PRODUCT = 'remove';
const INITIALIZE = 'initialize';

type Actions =
  | {data: IProduct; type: 'add'}
  | {data: string; type: 'remove'}
  | {data: IProduct[]; type: 'initialize'};

const reducer = (state: ContextData, action: Actions): ContextData => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {...state, cart: [...state.cart, action.data]};
    case REMOVE_PRODUCT:
      return {
        ...state,
        cart: state.cart.filter(productCart => productCart.id !== action.data),
      };
    case INITIALIZE:
      return {
        ...state,
        products: action.data,
      };
    default:
      return state;
  }
};

export const CartContext = createContext<ICartContext>({
  cart: [],
  products: [],
  initializeProducts: () => {},
  addProductToCart: () => {},
  removeProductFromCart: () => {},
});

export const useCartContext = () => useContext(CartContext);

export interface IContextProviderProps {
  children: React.ReactNode;
}

const CartProvider = ({children}: IContextProviderProps) => {
  const [state, dispatch] = useReducer(reducer, {
    cart: [],
    products: [],
  });

  return (
    <CartContext.Provider
      value={{
        ...state,
        addProductToCart: (product: IProduct) =>
          dispatch({data: product, type: ADD_PRODUCT}),
        removeProductFromCart: (productId: string) =>
          dispatch({data: productId, type: REMOVE_PRODUCT}),
        initializeProducts: (products: IProduct[]) =>
          dispatch({data: products, type: INITIALIZE}),
      }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
