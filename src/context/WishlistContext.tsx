import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react';
import type { Product } from '../types';

interface WishlistState {
  items: Product[];
}

type WishlistAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: number }
  | { type: 'TOGGLE_ITEM'; product: Product }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'LOAD_WISHLIST'; items: Product[] };

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_ITEM':
      if (state.items.some((i) => i.id === action.product.id)) return state;
      return { ...state, items: [...state.items, action.product] };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.productId) };
    case 'TOGGLE_ITEM': {
      const exists = state.items.some((i) => i.id === action.product.id);
      return {
        ...state,
        items: exists
          ? state.items.filter((i) => i.id !== action.product.id)
          : [...state.items, action.product],
      };
    }
    case 'CLEAR_WISHLIST':
      return { ...state, items: [] };
    case 'LOAD_WISHLIST':
      return { ...state, items: action.items };
    default:
      return state;
  }
}

const STORAGE_KEY = 'estele-wishlist';

function loadWishlistFromStorage(): Product[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

interface WishlistContextValue {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

const initialState: WishlistState = { items: [] };

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState, (init) => ({
    ...init,
    items: loadWishlistFromStorage(),
  }));

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addItem = useCallback((product: Product) => {
    dispatch({ type: 'ADD_ITEM', product });
  }, []);

  const removeItem = useCallback((productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', productId });
  }, []);

  const toggleItem = useCallback((product: Product) => {
    dispatch({ type: 'TOGGLE_ITEM', product });
  }, []);

  const clearWishlist = useCallback(() => {
    dispatch({ type: 'CLEAR_WISHLIST' });
  }, []);

  const isInWishlist = useCallback(
    (productId: number) => state.items.some((i) => i.id === productId),
    [state.items]
  );

  const value: WishlistContextValue = {
    items: state.items,
    addItem,
    removeItem,
    toggleItem,
    isInWishlist,
    clearWishlist,
    count: state.items.length,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
