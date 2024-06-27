import {create} from "zustand";

const useStore = create((set, get) => ({
    data: null,
    setData: (val) => set({data: val}),
    filter: false,
    setFilter: (val) => set({filter: val}),
    pageStart: 0,
    setPageStart: (val) => set({pageStart: val}),
    pageEnd: 10,
    setPageEnd: (val) => set({pageEnd: val}),
    pages: null,
    setPages: (val) => set({pages: val}),
    currentPage: 1,
    setCurrentPage: (val) => set({currentPage: val}),
    favorites: [],
    setFavorites: (val) => set({favorites: val}),
    logged: null,
    setLogged: (val) => set({logged: val}),
    updatePost: null,
    setUpdatePost: (val) => set({updatePost: val})
}))

export default useStore