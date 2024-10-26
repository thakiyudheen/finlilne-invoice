import {configureStore} from '@reduxjs/toolkit' 
import totalSlice from './slices/totalSlice'

const store= configureStore({
    reducer :{
        total :totalSlice
    }
})

export default store