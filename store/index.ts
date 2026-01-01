import { authApi } from "@/services/authApi";
import { jobsApi } from "@/services/jobsApi";
import { userApi } from "@/services/userApi";
import { authslice } from "@/slices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE,
} from "redux-persist";

// ✅ Persist config
const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["auth"], // only persist auth reducer
};

// ✅ Combine reducers
const rootReducer = combineReducers({
    auth: authslice,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [jobsApi.reducerPath]: jobsApi.reducer,
});

// ✅ Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(authApi.middleware, userApi.middleware, jobsApi.middleware),
    });

// ✅ Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
