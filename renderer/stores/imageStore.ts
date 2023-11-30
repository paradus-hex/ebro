
import { create } from "zustand";
import { devtools, persist, } from "zustand/middleware";

interface CreateImageStoreState {
  imageUrlArray: string[];
  imagesToDel: { url: string, desc: string }[];
  imageInfoArray: { url: string, desc: string, file?: File }[];
  getImageUrlArray: () => string[];
  setImageUrlArray: (imageUrlArray: string[]) => void;
  pushImageUrlArray: (item: string) => void;
  pushImagesToDel: (item: { url: string, desc: string }) => void;
  getImagesToDel: () => { url: string, desc: string }[];
  onAddDesc: (index: number, value: string) => void;
  onDelete: (index: number) => void;
  setImagesToDel: (imagesToDel: { url: string, desc: string }[]) => void;
  getImageInfoArray: () => { url: string, desc: string, file?: File }[];
  setImageInfoArray: (imageInfoArray: { url: string, desc: string, file?: File }[]) => void;
  pushImageInfoArray: (item: { url: string, desc: string, file?: File }) => void;
}
export const useImageStore = create<CreateImageStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        imageUrlArray: [],
        imagesToDel: [],
        imageInfoArray: [],
        setImageUrlArray: (imageUrlArray) => set({ imageUrlArray }),
        pushImageUrlArray: (item) => {
          let temp = [...get().imageUrlArray]
          temp.push(item)
          set({ imageUrlArray: temp })
        },
        pushImagesToDel: (imagesToDel) => {
          let temp = [...get().imagesToDel]
          temp.push(imagesToDel)
          set({ imagesToDel: temp })
        },
        getImageUrlArray: () => get().imageUrlArray,
        getImagesToDel: () => get().imagesToDel,
        onAddDesc: (index, value) => {
          let temp = [...get().imageInfoArray]
          if (temp[index]) {
            temp[index].desc = value
            set({ imageInfoArray: temp })
          }
        },
        onDelete: (index) => {
          let item = [...get().imageInfoArray]
          if (!item[index].file) get().pushImagesToDel(item[index])
          item.splice(index, 1)
          set({ imageInfoArray: item })
          let temp = [...get().imageUrlArray]
          temp.splice(index, 1)
          set({ imageUrlArray: temp })
        },
        setImagesToDel: (imagesToDel) => set({ imagesToDel }),
        getImageInfoArray: () => get().imageInfoArray,
        setImageInfoArray: (imageInfoArray) => set({ imageInfoArray }),
        pushImageInfoArray: (item) => {
          let temp = [...get().imageInfoArray]
          temp.push(item)
          set({ imageInfoArray: temp })
        }
      }),
      { name: 'imageStore' }
    )
  )
)




