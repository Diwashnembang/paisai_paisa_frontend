import {storeState} from "@/types"
import { create } from 'zustand'
 const useStore= create<storeState>((set) => ({
    authorized: false ,
    setAuthorized : (v:boolean)=> set({authorized:v})
}))


export default useStore