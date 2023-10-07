
import { create } from "zustand";
import { devtools, persist, } from "zustand/middleware";


interface CreateImageStoreState {
  imageArray: { url: string, desc: string, file?: File }[];
  imagesToDel: { url: string, desc: string }[];
  setImageArray: (imageArray: { url: string, desc: string, file?: File }[]) => void;
  pushImageArray: (item: { url: string, desc: string, file?: File }) => void;
  pushImagesToDel: (item: { url: string, desc: string }) => void;
  getImageArray: () => { url: string, desc: string, file?: File }[];
  getImagesToDel: () => { url: string, desc: string }[];
  onAddDesc: (index: number, value: string) => void;
  onDelete: (index: number) => void;
  setImagesToDel: (imagesToDel: { url: string, desc: string }[]) => void;

}
export const useImageStore = create<CreateImageStoreState>()(
  devtools(
    persist(
      (set, get) => ({
        imageArray: [],
        imagesToDel: [],
        setImageArray: (imageArray) => set({ imageArray }),
        pushImageArray: (item) => {
          let temp = [...get().imageArray]
          temp.push(item)
          set({ imageArray: temp })
        },
        pushImagesToDel: (imagesToDel) => {
          let temp = [...get().imagesToDel]
          temp.push(imagesToDel)
          set({ imagesToDel: temp })
        },
        getImageArray: () => get().imageArray,
        getImagesToDel: () => get().imagesToDel,
        onAddDesc: (index, value) => {
          let temp = [...get().imageArray]
          if (temp[index]) {
            temp[index].desc = value
            set({ imageArray: temp })
          }
        },
        onDelete: (index) => {
          let item = [...get().imageArray]
          if (!item[index].file) get().pushImagesToDel(item[index])
          item.splice(index, 1)
          set({ imageArray: item })
        },
        setImagesToDel: (imagesToDel) => set({ imagesToDel })
      }),
      { name: 'imageStore' }
    )
  )
)




