"use client";

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Product, ProductSize, ProductVariant, CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: string; size: string; color: string } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: string; size: string; color: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "TOGGLE_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity: number, color: ProductVariant, size: ProductSize) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  itemCount: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product.id === action.payload.product.id &&
          item.selectedSize.label === action.payload.selectedSize.label &&
          item.selectedColor.color === action.payload.selectedColor.color
      );
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex].quantity += action.payload.quantity;
        return { ...state, items: updated };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.product.id === action.payload.productId &&
              item.selectedSize.label === action.payload.size &&
              item.selectedColor.color === action.payload.color
            )
        ),
      };
    case "UPDATE_QUANTITY": {
      const updated = state.items.map((item) =>
        item.product.id === action.payload.productId &&
        item.selectedSize.label === action.payload.size &&
        item.selectedColor.color === action.payload.color
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { ...state, items: updated };
    }
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "TOGGLE_CART":
      return { ...state, isOpen: !state.isOpen };
    case "LOAD_CART":
      return { ...state, items: action.payload };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false });

  useEffect(() => {
    const saved = localStorage.getItem("cart");
    if (saved) {
      try {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(saved) });
      } catch {
        localStorage.removeItem("cart");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = useCallback(
    (product: Product, quantity: number, color: ProductVariant, size: ProductSize) => {
      dispatch({ type: "ADD_ITEM", payload: { product, quantity, selectedColor: color, selectedSize: size } });
    },
    []
  );

  const removeItem = useCallback(
    (productId: string, size: string, color: string) => {
      dispatch({ type: "REMOVE_ITEM", payload: { productId, size, color } });
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: string, size: string, color: string, quantity: number) => {
      if (quantity < 1) return;
      dispatch({ type: "UPDATE_QUANTITY", payload: { productId, size, color, quantity } });
    },
    []
  );

  const clearCart = useCallback(() => dispatch({ type: "CLEAR_CART" }), []);
  const toggleCart = useCallback(() => dispatch({ type: "TOGGLE_CART" }), []);

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const total = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items: state.items, isOpen: state.isOpen, addItem, removeItem, updateQuantity, clearCart, toggleCart, itemCount, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
