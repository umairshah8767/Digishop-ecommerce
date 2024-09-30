import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import type { AppDispatch, RootState } from '@/redux'; // Make sure the path is correct

// Typed `useDispatch` and `useSelector` hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
