import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react';

interface UIState {
  isMobileMenuOpen: boolean;
  isScrolled: boolean;
}

type UIAction =
  | { type: 'OPEN_MOBILE_MENU' }
  | { type: 'CLOSE_MOBILE_MENU' }
  | { type: 'SET_SCROLLED'; isScrolled: boolean };

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case 'OPEN_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: true };
    case 'CLOSE_MOBILE_MENU':
      return { ...state, isMobileMenuOpen: false };
    case 'SET_SCROLLED':
      return { ...state, isScrolled: action.isScrolled };
    default:
      return state;
  }
}

interface UIContextValue {
  isMobileMenuOpen: boolean;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  isScrolled: boolean;
}

const UIContext = createContext<UIContextValue | null>(null);

const initialState: UIState = { isMobileMenuOpen: false, isScrolled: false };

export function UIProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  useEffect(() => {
    const handleScroll = () => {
      dispatch({ type: 'SET_SCROLLED', isScrolled: window.scrollY > 50 });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (state.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [state.isMobileMenuOpen]);

  const openMobileMenu = useCallback(() => {
    dispatch({ type: 'OPEN_MOBILE_MENU' });
  }, []);

  const closeMobileMenu = useCallback(() => {
    dispatch({ type: 'CLOSE_MOBILE_MENU' });
  }, []);

  const value: UIContextValue = {
    isMobileMenuOpen: state.isMobileMenuOpen,
    openMobileMenu,
    closeMobileMenu,
    isScrolled: state.isScrolled,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI(): UIContextValue {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}
