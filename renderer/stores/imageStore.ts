
import { create } from "zustand";
import { devtools, persist, } from "zustand/middleware";


interface CreateImageStoreState {

  imageArray: { url: string, desc: string, file?: File }[];

  imagesToDel: { url: string, desc: string }[];
  setImageArray: (imageArray: { url: string, desc: string, file?: File }[]) => void;
  pushImageArray: (item: { url: string, desc: string, file?: File }) => void;
  pushImagesToDel: (item: { url: string, desc: string }) => void;
  getImageArray: () => { url: string, desc: string }[];
  getImagesToDel: () => { url: string, desc: string }[];
  onAddDesc: (index: number, value: string) => void;
  onDelete: (index: number) => void;

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
          let tem = [...get().imageArray]
          get().imagesToDel.push(tem[index])
          tem.splice(index, 1)
          set({ imageArray: tem })
        }
      }),
      { name: 'imageStore' }

    )
  )
)

// imageArray = { url: '', desc: '' }[]
// imagesToDel = { url: '', desc: '' }[]
// pushImageArray()

// // file input
// onchange() {
//   let = tem = [...imageAyy]
//   fileFromPath.forEach((file) => {
//     tem.push(file)
//   }
//   pushImageArray(tem)
// }

// // desc input
// onchange(){
//   let tem = [...imageAyy]
//   tem[index].desc = value
//   pushImageArray(tem)
// }

// onAdd({ url: '', desc: '' }){
//   let tem = [...imageAyy]
//   tem.push({ url: '', desc: '' })
//   pushImageArray(tem)
// }

// onDelete(imdex){
//   let tem = [...imageAyy]
//   setImagesToDel(tem[index])
//   tem.splice(index, 1)
//   pushImageArray(tem)
// }

// [{ url: sdfm, des: sdfa }, { url: sdfm, des: sdfa }, { url: sdfm, des: sdfa }, { url: sdfm, des: sdfa }]
// [{ url: local, des: sdfa }, { url: local, des: sdfa }, { url: local, des: sdfa }, { url: local, des: sdfa }]



