import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { CurrencyData } from "../screens/Home"

type FavoritesState = {
    favorites: CurrencyData[];
}

const initialState: FavoritesState = {
    favorites: []
}

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<CurrencyData>) => {
            state.favorites.push(action.payload)
        },
        remove: (state, action: PayloadAction<CurrencyData>) => {
            state.favorites = state.favorites.filter((cd) => cd.currencyCode !== action.payload.currencyCode)
        }
    }
})

export const { add, remove } = favoritesSlice.actions
export default favoritesSlice.reducer 