'use client';
import { useRouter } from 'next/router';
import { Button } from '../components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../components/ui/Form';
import { Input } from '../components/ui/Input';
import { MultiSelect } from '../components/MultiSelect';
import ImageUpload from '../components/ImageUpload';
import { FormPopOver } from '../components/FormPopOver';
import { useEffect, useState } from 'react';

const formSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  address: z
    .string()
    .min(2, { message: 'Address must be at least 2 characters.' }),
  zipCode: z
    .string()
    .min(2, { message: 'Address must be at least 2 characters.' }),
  city: z
    .string()
    .min(2, { message: 'Address must be at least 2 characters.' }),
  yearOfConstruction: z
    .number()
    .min(4, { message: 'Year of construction must be at least 4 digits long' }),
  sizeOfProperty: z.number(),
  sizeOfHome: z.number(),
  numberOfBedRooms: z.number(),
  numberOfBathRooms: z.number(),
  architecturalStyle: z.array(z.string()),
  outbuildings: z.array(z.string()),
  uniqueSellingPoints: z.string(),
  interiorFeatures: z.string(),
  localAttractions: z.string(),
  geographicalFeatures: z.string(),
  nearbyAmenities: z.string(),
});

export default function Create() {
  const router = useRouter();
  const handleHomeClick = () => {
    router.push('/home');
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      address: '',
    },
  });
  // const [values, setValues] = useState({} as any);
  const { control, formState, watch } = form;
  // useEffect(() => {
  //   const subscription = watch();
  //   console.log(subscription);
  //   setValues(subscription);
  //   // return () => subscription.unsubscribe();
  // }, [watch]);
  const values = watch();
  // const values = form.getValues();

  const { errors } = formState;
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className="flex">
      <div className="w-full flex-col gap-10 justify-center">
        <Button
          className="w-[90px] h-[50px] text-xl mt-4"
          onClick={handleHomeClick}
        >
          Home
        </Button>
        <div className="my-10"></div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-4 gap-y-14">
              <div className="w-full flex flex-col">
                <FormLabel
                  className={`text-xl ${
                    errors.address || errors.city || errors.zipCode
                      ? 'text-red-600'
                      : ' '
                  } `}
                >
                  Address
                </FormLabel>
                <FormPopOver
                  className="mt-[8px] bg-white"
                  values={values}
                  type="address"
                >
                  <div className="grid  items-center gap-4 ">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-center">
                          <FormLabel className="text-xl ">Address</FormLabel>
                          <FormControl>
                            <Input
                              id="width"
                              defaultValue="100%"
                              className="max-w-[920px] bg-white col-span-2 h-8"
                              placeholder="Enter the address of the property"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid  items-center gap-4">
                    <FormField
                      control={form.control}
                      name="zipCode"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-center">
                          <FormLabel className="text-xl col-span-1">
                            Zip Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="max-w-[920px] bg-white col-span-2 h-8"
                              placeholder="Enter the address of the property"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid  items-center gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem className="flex flex-col items-center">
                          <FormLabel className="text-xl col-span-1">
                            City
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="max-w-[920px] bg-white col-span-2 h-8"
                              placeholder="Enter the address of the property"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </FormPopOver>
                {(errors.address || errors.city || errors.zipCode) && (
                  <div>
                    <FormDescription className="text-red-600">
                      Atleast one of the fields is invalid
                    </FormDescription>
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="yearOfConstruction"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className="text-xl ">
                      Year of Construction
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="max-w-[920px] bg-white"
                        placeholder="Enter the year of construction of the property"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizeOfProperty"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className="text-xl">
                      Size of the property {`(in acres)`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-[920px] bg-white"
                        placeholder="Enter the size of the property"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sizeOfHome"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className="text-xl">
                      Size of the Home {`(in m^2)`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-[920px] bg-white"
                        placeholder="Enter the size of the home"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col">
                <FormLabel
                  className={`text-xl ${
                    errors.numberOfBathRooms || errors.numberOfBedRooms
                      ? 'text-red-600'
                      : ' '
                  } `}
                >
                  Number of Rooms
                </FormLabel>
                <FormPopOver
                  className="mt-[8px] bg-white"
                  values={values}
                  type="roomNumbers"
                >
                  <FormField
                    control={form.control}
                    name="numberOfBedRooms"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center">
                        <FormLabel className="text-xl">
                          Number of Bed Rooms
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="max-w-[920px] bg-white"
                            placeholder="Enter the number of rooms"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="numberOfBathRooms"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-center">
                        <FormLabel className="text-xl">
                          Number of Bathrooms
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="max-w-[920px] bg-white"
                            placeholder="Enter the number of rooms"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </FormPopOver>
                {(errors.numberOfBathRooms || errors.numberOfBedRooms) && (
                  <div>
                    <FormDescription className="text-red-600">
                      Atleast one of the fields is invalid
                    </FormDescription>
                  </div>
                )}
              </div>

              <FormField
                control={form.control}
                name="architecturalStyle"
                render={({ field }) => {
                  if (field.value === undefined) {
                    field.value = [];
                  }
                  return (
                    <FormItem className="flex flex-col items-center">
                      <FormLabel className="text-xl">
                        Architectural Style
                      </FormLabel>
                      <MultiSelect
                        selected={field.value}
                        options={[
                          {
                            value: 'style 1',
                            label: 'style 1',
                          },
                          {
                            value: 'style 2',
                            label: 'style 2',
                          },
                          {
                            value: 'style 3',
                            label: 'style 3',
                          },
                          {
                            value: 'style 4',
                            label: 'style 4',
                          },
                        ]}
                        {...field}
                        className="sm:w-[510px]"
                      />
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="outbuildings"
                render={({ field }) => {
                  if (field.value === undefined) {
                    field.value = [];
                  }
                  return (
                    <FormItem className="flex flex-col items-center">
                      <FormLabel className="text-xl">Outbuildings</FormLabel>
                      <MultiSelect
                        selected={field.value}
                        options={[
                          {
                            value: 'item 1',
                            label: 'item 1',
                          },
                          {
                            value: 'item 2',
                            label: 'item 2',
                          },
                          {
                            value: 'item 3',
                            label: 'item 3',
                          },
                          {
                            value: 'item 4',
                            label: 'item 4',
                          },
                        ]}
                        {...field}
                        className="sm:w-[510px]"
                      />
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="uniqueSellingPoints"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className="text-xl">
                      Unique selling points
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-[920px] bg-white"
                        placeholder="Write about some unique selling points of the property"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="interiorFeatures"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className="text-xl">Interior Features</FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-[920px] bg-white"
                        placeholder="Write about some interior features of the property"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="localAttractions"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className="text-xl">Local attractions</FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-[920px] bg-white"
                        placeholder="Mention some local attractions"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="geographicalFeatures"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className="text-xl">
                      Geographical Featues
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-[920px] bg-white"
                        placeholder="Point out some geographical features of the property"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nearbyAmenities"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className="text-xl">Nearby Amenities</FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-[920px] bg-white"
                        placeholder="Mention some of the notable nearby amenities"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        <DevTool control={control} />
      </div>
      <div className="flex flex-col justify-center h-screen bg-white w-[30%] gap-y-40">
        <ImageUpload></ImageUpload>
        <Button className="text-xl mx-8">Generate</Button>
      </div>
    </div>
  );
}
