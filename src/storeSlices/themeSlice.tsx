import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

export type themeType  = "dark" | "light"


type initialStateType = {
    theme:themeType
}
const initialState:initialStateType = {
    theme:"dark"
}

const themeSlice = createSlice({
    name:"theme",
    initialState,
    reducers:{
        setTheme(state,action:PayloadAction<themeType>){
            state.theme = action.payload
        }
    }
})

export const { setTheme } = themeSlice.actions
export const getTheme = (state:RootState) => state.theme.theme;

export default themeSlice.reducer;