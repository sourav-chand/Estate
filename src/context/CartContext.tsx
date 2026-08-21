import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react';
import type { Product, CartItem } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product; quantity: number }
  | { type: 'REMOVE_ITEM'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART' }
  | { type: 'OPEN_CART' }
  | { type: 'CLOSE_CART' }
  | { type: 'LOAD_CART'; items: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + action.quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, { product: action.product, quantity: action.quantity }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
    case 'UPDATE_QUANTITY':
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.product.id !== action.productId) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'OPEN_CART':
      return { ...state, isOpen: true };
    case 'CLOSE_CART':
      return { ...state, isOpen: false };
    case 'LOAD_CART':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

const STORAGE_KEY = 'estele-cart';

function loadCartFromStorage(): CartItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  itemCount: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const initialState: CartState = { items: [], isOpen: false };

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (init) => ({
    ...init,
    items: loadCartFromStorage(),
  }));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addItem = useCallback((product: Product, quantity = 1) => {
    dispatch({ type: 'ADD_ITEM', product, quantity });
  }, []);

  const removeItem = useCallback((productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  }, []);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const openCart = useCallback(() => {
    dispatch({ type: 'OPEN_CART' });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: 'CLOSE_CART' });
  }, []);

  const subtotal = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const value: CartContextValue = {
    items: state.items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    itemCount,
    isOpen: state.isOpen,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
