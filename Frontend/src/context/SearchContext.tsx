import { createContext, useContext, useReducer, useCallback, useRef, type ReactNode } from 'react';
import type { Product } from '../types';
import { productService } from '../services/productService';

interface SearchState {
  isOpen: boolean;
  query: string;
  results: Product[];
}

type SearchAction =
  | { type: 'OPEN_SEARCH' }
  | { type: 'CLOSE_SEARCH' }
  | { type: 'SET_QUERY'; query: string; results: Product[] }
  | { type: 'CLEAR_QUERY' };

function searchReducer(state: SearchState, action: SearchAction): SearchState {
  switch (action.type) {
    case 'OPEN_SEARCH':
      return { ...state, isOpen: true };
    case 'CLOSE_SEARCH':
      return { ...state, isOpen: false };
    case 'SET_QUERY':
      return { ...state, query: action.query, results: action.results };
    case 'CLEAR_QUERY':
      return { ...state, query: '', results: [] };
    default:
      return state;
  }
}

interface SearchContextValue {
  isOpen: boolean;
  query: string;
  results: Product[];
  openSearch: () => void;
  closeSearch: () => void;
  setQuery: (query: string) => void;
  clearQuery: () => void;
}

const SearchContext = createContext<SearchContextValue | null>(null);

const initialState: SearchState = { isOpen: false, query: '', results: [] };

export function SearchProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(searchReducer, initialState);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openSearch = useCallback(() => {
    dispatch({ type: 'OPEN_SEARCH' });
  }, []);

  const closeSearch = useCallback(() => {
    dispatch({ type: 'CLOSE_SEARCH' });
  }, []);

  const setQuery = useCallback((query: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!query.trim()) {
      dispatch({ type: 'SET_QUERY', query, results: [] });
      return;
    }

    debounceRef.current = setTimeout(async () => {
      const results = await productService.searchProducts(query);
      dispatch({ type: 'SET_QUERY', query, results });
    }, 300);
  }, []);

  const clearQuery = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    dispatch({ type: 'CLEAR_QUERY' });
  }, []);

  const value: SearchContextValue = {
    isOpen: state.isOpen,
    query: state.query,
    results: state.results,
    openSearch,
    closeSearch,
    setQuery,
    clearQuery,
  };

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}

export function useSearch(): SearchContextValue {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}
