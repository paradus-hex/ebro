
import { z } from "zod";
import { create } from "zustand";
import { formSchema } from "../pages/create";


import { devtools, persist, } from "zustand/middleware";
import { set } from "lodash";

interface CreatePageStoreState {
  values: { userName: string; projectName: string, updatedAt: string, isFavorite: boolean } & z.infer<typeof formSchema>;
  projectKey: string;
  response: string;
  note: string;
  imageUrls: string[];
  images: File[];
  imageDesc: { desc: string }[];
  imageDescObj: { [key: string]: { desc: string, name: string, url: string } };
  imageSwiperDescObj: { [key: string]: string };
  setValues: (values: { userName: string; projectName: string, updatedAt: string, isFavorite: boolean } & z.infer<typeof formSchema>) => void;
  setProjectKey: (projectKey: string) => void;
  setResponse: (response: string) => void;
  getValues: () => { userName: string; projectName: string, updatedAt: string, isFavorite: boolean } & z.infer<typeof formSchema>;
  getProjectKey: () => string;
  getResponse: () => string;
  getNote: () => string;
  setNote: (note: string) => void;
  getImageUrls: () => string[];
  setImageUrls: (imageUrls: string[]) => void;
  delImageUrls: (index: number) => void;
  getImages: () => File[];
  setImages: (images: File[]) => void;
  delImageDesc: (index: number) => void;
  setImageDesc: (imageDesc: { desc: string }[]) => void;
  getImageDesc: () => { desc: string }[];
  getImageDescObj: () => { [key: string]: { desc: string, name: string, url: string } };
  setImageDescObj: (key: string, value: { desc: string, name: string, url: string }) => void;
  delImageDescObj: () => void;
  delIndiImageDescObj: (key: string) => void;
  getSwiperImageDescObj: () => { [key: string]: string };
  setSwiperImageDescObj: (key: string, value: string) => void;
  delSwiperImageDescObj: () => void;
  delIndiSwiperImageDescObj: (key: string) => void;

}



interface CreateImageStoreState {

  imageArray: { url: string, desc: string, file?: File }[];

  imagesToDel: { url: string, desc: string }[];
  setImageArray: (item: { url: string, desc: string }) => void;
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
        setImageArray: (item) => {
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
          temp[index].desc = value
          set({ imageArray: temp })
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
// setImageArray()

// // file input
// onchange() {
//   let = tem = [...imageAyy]
//   fileFromPath.forEach((file) => {
//     tem.push(file)
//   }
//   setImageArray(tem)
// }

// // desc input
// onchange(){
//   let tem = [...imageAyy]
//   tem[index].desc = value
//   setImageArray(tem)
// }

// onAdd({ url: '', desc: '' }){
//   let tem = [...imageAyy]
//   tem.push({ url: '', desc: '' })
//   setImageArray(tem)
// }

// onDelete(imdex){
//   let tem = [...imageAyy]
//   setImagesToDel(tem[index])
//   tem.splice(index, 1)
//   setImageArray(tem)
// }

// [{ url: sdfm, des: sdfa }, { url: sdfm, des: sdfa }, { url: sdfm, des: sdfa }, { url: sdfm, des: sdfa }]
// [{ url: local, des: sdfa }, { url: local, des: sdfa }, { url: local, des: sdfa }, { url: local, des: sdfa }]



