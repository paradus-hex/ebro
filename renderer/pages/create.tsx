'use client';
import { useRouter } from 'next/router';
import { Button } from '../components/ui/button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { DevTool } from '@hookform/devtools';
import { useForm } from 'react-hook-form';
import { useChat } from 'ai/react';
import { Loader2 } from 'lucide-react';
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
import {
  architecturalStyles,
  emptyProjectData,
  outbuildings,
} from '../lib/constants';
import { ReactElement, useEffect, useState } from 'react';
import { useCreatePageStore } from '../stores/createPageStore';
import { getProjectDetails } from '../lib/firebasedb';
import Layout from '../components/Layout';

interface Params {
  key: string;
  passedProjectName: string;
  intention: string;
  prev: string;
}

export const formSchema = z.object({
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

function Create() {
  const router = useRouter();
  const { params } = router.query;
  const parsedParams: Params = params
    ? JSON.parse(decodeURIComponent(params as string))
    : {};
  const { key, passedProjectName, intention, prev } = parsedParams;
  console.log(passedProjectName, 'ssssssssssss', key, intention, prev);
  const {
    setValues,
    setResponse,
    getValues: getStoredValues,
    getResponse: getStoredResponse,
  } = useCreatePageStore();

  const { projectName: loadedProjectName, ...defaultValues } =
    getStoredValues();

  const prevProjectDetails = async () => {
    if (key === undefined && prev === 'home') {
      form.reset(emptyProjectData);
      setResponse('');
      setValues({ ...emptyProjectData, projectName: passedProjectName });
      return;
    }
    const data = key && (await getProjectDetails(key));
    form.reset(data);
    setImageDesc(data.imagesDesc);
    // console.log('image desc', data.imagesDesc);
    setResponse(data.response);
    setValues(data);
  };

  const handleGenerateClick = () => {
    router.push(
      `/finalpage?params=${encodeURIComponent(
        JSON.stringify({ projectName: passedProjectName, intention, key }),
      )}`,
    );
  };
  const handleGoBackClick = () => {
    router.push('/home');
  };
  // console.log(key, key && getProjectDetails(key));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleNextPageClick = () => {
    router.push(
      `/finalpage?params=${encodeURIComponent(
        JSON.stringify({ projectName: passedProjectName, intention, key }),
      )}`,
    );
  };

  const textAlreadyExists = getStoredResponse().length !== 0;
  const { append, isLoading } = useChat({
    onFinish: (message) => {
      setResponse(message.content.slice(1, -1));
      router.push(
        `/finalpage?params=${encodeURIComponent(
          JSON.stringify({ projectName: passedProjectName, intention, key }),
        )}`,
      );
    },
  });
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(false);
  const { control, formState, watch } = form;
  const values = watch();
  const { errors } = formState;
  function onSubmit(values: z.infer<typeof formSchema>) {
    setValues({
      ...values,
      projectName: passedProjectName, //Change these to test...........
      userName: 'user1', //TODO: get userName and projectName from context
      updatedAt: new Date().toISOString(),
      isFavorite: false,
    });
    // console.log(setProjects(values));
    append({ role: 'user', content: JSON.stringify(values) });
    setLoading(isLoading);
  }

  useEffect(() => {
    prevProjectDetails();
  }, []);

  return (
    <div className="flex">
      <div className=" flex-col gap-10 justify-center w-[50%] px-auto mx-auto">
        <div className="flex justify-between mt-10 mb-8">
          <Button disabled={isLoading} onClick={handleGoBackClick}>
            Go Back
          </Button>
          <h1 className="font-extrabold">
            {passedProjectName || 'Project Name'}
          </h1>
          <Button
            disabled={!textAlreadyExists || isLoading}
            onClick={handleNextPageClick}
            className="-translate-x-4"
          >
            Next Page
          </Button>
        </div>
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
                  className="mt-[8px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
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
                              className="max-w-[920px] bg-white rounded-xl col-span-2 h-8 border focus:border-1 focus:border-slate-400"
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
                              className="max-w-[920px] bg-white rounded-xl col-span-2 h-8 border focus:border-1 focus:border-slate-400"
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
                              className="max-w-[920px] bg-white rounded-xl col-span-2 h-8 border focus:border-1 focus:border-slate-400"
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
                        className="max-w-[920px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
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
                        className="max-w-[920px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
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
                        className="max-w-[920px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
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
                  className="mt-[8px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
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
                            className="max-w-[920px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
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
                            className="max-w-[920px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
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
                        className="max-w-[920px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
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
                        className="max-w-[920px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
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
                        className="max-w-[920px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
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
                        className="max-w-[920px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
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
                        className="max-w-[920px] bg-white rounded-xl border focus:border-1 focus:border-slate-400"
                        placeholder="Mention some of the notable nearby amenities"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={isLoading} type="submit">
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Submit
            </Button>
            {/* <Button type="submit">Submit</Button> */}
          </form>
        </Form>
        <DevTool control={control} />
      </div>
      <div className="flex flex-col justify-start items-center bg-slate-200/50 w-[50%] min-h-screen">
        <ImageUpload
          projectName={passedProjectName}
          prev={prev}
          intention={intention}
          key={key}
        ></ImageUpload>
        <div
          className="flex
        flex-col justify-center items-center"
        >
          <Button
            onClick={() => setNotes((prev) => !prev)}
            disabled={isLoading}
            className="m-5 rounded-xl"
          >
            Notes
          </Button>
          {notes && (
            <Textarea
              className="w-[80%] m-auto border focus:border-1 bg-white focus:border-slate-400"
              placeholder="Type your notes here."
            />
          )}
        </div>

        <Button
          className="text-xl mx-8 my-10 rounded-xl"
          onClick={handleGenerateClick}
          disabled={isLoading}
        >
          Generate
        </Button>
      </div>
    </div>
  );
}
Create.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Create;
