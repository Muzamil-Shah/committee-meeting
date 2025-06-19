import { useCallback, useEffect, useMemo } from "react";
import { FieldProps } from "../../../components/filter-component-view";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import { Search, SearchIcon } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";

type FilterFieldData<T extends Record<string, unknown>> = {
  validation: z.ZodRawShape;
  initialValues: Partial<T>;
  fields: FieldProps<T>[];
};

type Props<T extends Record<string, unknown>> = {
  filterFieldData: FilterFieldData<T>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
  initialData?: T[];
  formData: Partial<T>;
  downloadFileName?: string;
  showDownloadButton?: boolean;
  tempFlagForSLA?: boolean;
  tempServiceInventoryFileDownload?: boolean;
  GET_SEARCH_URL: string;
  queryKey: string;
};

function FilterView<T extends Record<string, unknown>>({
  filterFieldData,
  setFormData,
  formData,
}: Props<T>) {
  // const query = useQueryGenerator({queryKey,url: GET_SEARCH_URL,params: {...formData},headers: {}});
  const formSchema = useMemo(
    () => z.object(filterFieldData.validation),
    [filterFieldData.validation]
  );

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...filterFieldData.initialValues, ...formData },
  });

  const { reset } = methods;
  useEffect(() => {
    reset({ ...filterFieldData.initialValues, ...formData });
  }, [formData, reset, filterFieldData.initialValues]);

  const onSubmit = useCallback(
    (data: z.infer<typeof formSchema>) => {
      setFormData((pre) => ({ ...pre, ...data }));
    },
    [formSchema]
  );

  return (
    <div className="w-full bg-background ">
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="w-full flex justify-end"
        >
          <div className="w-full gap-2 flex justify-between items-end border rounded-lg p-0.5 shadow-sm ">
            {filterFieldData.fields.map((fieldItem) => (
              <FormField
                name={fieldItem?.name}
                control={methods?.control}
                
                render={({ field }) => (
                  <FormItem className="w-full">
                    {fieldItem?.label && (
                      <FormLabel className="dark:text-white font-medium ">
                        {fieldItem?.label}
                        {fieldItem?.required && (
                          <span className="text-red-500"> *</span>
                        )}
                      </FormLabel>
                    )}
                    {/* <br /> */}

                    <FormControl className="w-full ">
                      <div className="relative w-10/12">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="hidden md:flex absolute left-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        >
                          <Search
                            className="h-4 w-4 text-secondary-foreground"
                            aria-hidden="true"
                          />

                          <span className="sr-only">Search</span>
                        </Button>
                        <Input
                          placeholder={fieldItem?.placeholder}
                          {...field}
                          onChange={(e) => {
                            const value = fieldItem?.isUppercase
                              ? e.target.value.toUpperCase()
                              : e.target.value;
                            // Handle potential number conversion
                            const parsedValue = fieldItem?.isString
                              ? value
                              : value !== ""
                              ? fieldItem?.isString
                                ? value
                                : isNaN(Number(value))
                                ? value // Keep as string if not a valid number
                                : Number(value)
                              : value; // Convert to number if it is a valid numeric string

                            field.onChange(parsedValue);
                          }}
                          className="w-full md:pl-9 h-7 border-none "
                          disabled={fieldItem?.disabled}
                        />
                      </div>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {/* <div className=" flex justify-start"> */}
              <Button
                type="submit"
                variant="secondary"
                size={"sm"}
                className="h-7  flex items-center gap-1"
              >
                <SearchIcon className="flex md:hidden" />{" "}
                <span className="hidden md:flex">Search</span>
              </Button>
            {/* </div> */}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default FilterView;
