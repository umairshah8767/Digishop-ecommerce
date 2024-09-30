// components/ReduxProvider.tsx

"use client"; // Yeh line add karein
import { Provider } from 'react-redux';
import { store } from '@/redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist'; // Import ko yahan add karein

let persistor = persistStore(store); // Persistor ko yahan define karein

const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
