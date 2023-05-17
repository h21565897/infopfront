import store from "@/store/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

type AppDispatch = typeof store["dispatch"];
type RootState = ReturnType<typeof store["getState"]>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
