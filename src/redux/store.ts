import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import users from "./userSlice";
import services from "./servicesSlice";

const persistConfig = {
  key: "cartRender",
  storage,
  whitelist: [],
};

const rootReducer = combineReducers({
  users: users.reducer,
  services: services.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
