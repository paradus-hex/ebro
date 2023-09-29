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
import { Input } from '../components/ui/input';
import { MultiSelect } from '../components/MultiSelect';
import ImageUpload from '../components/imageUpload';
import { FormPopOver } from '../components/formPopOver';
import { Textarea } from '../components/ui/textarea';
import { architecturalStyles, outbuildings } from '../lib/constants';

const formSchema = z.object({
  address: z
    .string()
    .min(2, { message: 'Address must be at least 2 characters.' }),
  zipCode: z
    .string()
    .min(2, { message: 'Address must be at least 2 characters.' }),
  city: z
    .string()
    .min(2, { message: 'Address must be at least 2 characters.' }),
  yearOfConstruction: z.coerce
    .number()
    .min(1800, {
      message: 'Year of construction must be at least 1800',
    })
    .int({ message: 'The year of construction must be an integer' }),
  sizeOfProperty: z.coerce
    .number()
    .gt(0, { message: 'Size of the property must be greater than 0 acres' }),
  sizeOfHome: z.coerce
    .number()
    .gt(0, { message: 'Size of the home must be greater than 0 m^2' }),
  numberOfBedRooms: z.coerce
    .number()
    .gt(0, { message: 'The number of bedrooms cannot be 0' })
    .int({ message: 'The number of bedrooms must be an integer' }),
  numberOfBathRooms: z.coerce
    .number()
    .gt(0, { message: 'The number of bathrooms cannot be 0' })
    .int({ message: 'The number of bathrooms must be an integer' }),
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
  const handleGenerateClick = () => {
    router.push('/finalpage');
  };
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interiorFeatures: '',
    },
  });

  const { control, formState, watch } = form;
  const values = watch();
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
            <div className="grid grid-cols-2 gap-4 gap-y-14 place-items-center">
              <div className="w-full flex flex-col">
                <FormLabel
                  className={`text-xl  ${
                    errors.address || errors.city || errors.zipCode
                      ? 'text-red-600'
                      : ' '
                  } `}
                >
                  Address
                </FormLabel>
                <FormPopOver
                  className="mt-[8px] bg-slate-300/20 rounded-xl"
                  values={values}
                  type="address"
                >
                  <div className="grid  items-center gap-4 ">
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem className=" flex flex-col items-center">
                          <FormLabel className="text-xl ">Address</FormLabel>
                          <FormControl>
                            <Input
                              id="width"
                              defaultValue="100%"
                              className="max-w-[920px] bg-slate-300/20 rounded-xl col-span-2 h-8"
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
                        <FormItem className=" flex flex-col items-center">
                          <FormLabel className="text-xl col-span-1">
                            Zip Code
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="max-w-[920px] bg-slate-300/20 rounded-xl col-span-2 h-8"
                              placeholder="Enter the zip code"
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
                        <FormItem className=" flex flex-col items-center">
                          <FormLabel className="text-xl col-span-1">
                            City
                          </FormLabel>
                          <FormControl>
                            <Input
                              className="max-w-[920px] bg-slate-300/20 rounded-xl col-span-2 h-8"
                              placeholder="Enter the name of the city"
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
                  <FormItem className="w-[80%] flex flex-col items-center">
                    <FormLabel className="text-xl ">
                      Year of Construction
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="max-w-[920px] bg-slate-300/20 rounded-xl"
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
                  <FormItem className="w-[80%] flex flex-col items-center">
                    <FormLabel className="text-xl">
                      Size of the property {`(in acres)`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-[920px] bg-slate-300/20 rounded-xl"
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
                  <FormItem className="w-[80%] flex flex-col items-center">
                    <FormLabel className="text-xl">
                      Size of the Home {`(in m^2)`}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-[920px] bg-slate-300/20 rounded-xl"
                        placeholder="Enter the size of the home"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-col">
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
                  className="mt-[8px] bg-slate-300/20 rounded-xl"
                  values={values}
                  type="roomNumbers"
                >
                  <FormField
                    control={form.control}
                    name="numberOfBedRooms"
                    render={({ field }) => (
                      <FormItem className=" flex flex-col items-center">
                        <FormLabel className="text-xl">
                          Number of Bed Rooms
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="max-w-[920px] bg-slate-300/20 rounded-xl"
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
                      <FormItem className=" flex flex-col items-center">
                        <FormLabel className="text-xl">
                          Number of Bathrooms
                        </FormLabel>
                        <FormControl>
                          <Input
                            className="max-w-[920px] bg-slate-300/20 rounded-xl"
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
                    <FormItem className="w-[80%] flex flex-col items-center ">
                      <FormLabel
                        className="text-xl"
                        placeholder="Select the architectural style of the property"
                      >
                        Architectural Style
                      </FormLabel>
                      <MultiSelect
                        selected={field.value}
                        options={architecturalStyles}
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
                    <FormItem className="w-[80%] flex flex-col items-center">
                      <FormLabel
                        className="text-xl"
                        placeholder="Select the architectural style of the property"
                      >
                        Outbuildings
                      </FormLabel>
                      <MultiSelect
                        selected={field.value}
                        options={outbuildings}
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
                  <FormItem className="w-[80%] flex flex-col items-center">
                    <FormLabel className="text-xl">
                      Unique selling points
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-[920px] bg-slate-300/20 rounded-xl"
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
                  <FormItem className="w-[80%] flex flex-col items-center">
                    <FormLabel className="text-xl">Interior Features</FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-[920px] bg-slate-300/20 rounded-xl"
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
                  <FormItem className="w-[80%] flex flex-col items-center">
                    <FormLabel className="text-xl">Local attractions</FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-[920px] bg-slate-300/20 rounded-xl"
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
                  <FormItem className="w-[80%] flex flex-col items-center">
                    <FormLabel className="text-xl">
                      Geographical Features
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-[920px] bg-slate-300/20 rounded-xl"
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
                  <FormItem className="w-[80%] flex flex-col items-center">
                    <FormLabel className="text-xl">Nearby Amenities</FormLabel>
                    <FormControl>
                      <Input
                        className="max-w-[920px] bg-slate-300/20 rounded-xl"
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
      <div className="flex flex-col justify-start bg-slate-200/50 w-[30%] min-h-screen">
        <ImageUpload></ImageUpload>
        <div
          className="flex
        flex-col justify-center items-center"
        >
          <Button className="m-5 rounded-xl">Notes</Button>
          <Textarea
            className="w-[80%] m-auto"
            placeholder="Type your message here."
          />
        </div>

        <Button
          className="text-xl mx-8 my-10 rounded-xl"
          onClick={handleGenerateClick}
        >
          Generate
        </Button>
      </div>
    </div>
  );
}
