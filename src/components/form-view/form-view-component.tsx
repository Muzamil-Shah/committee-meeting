import { FieldValues, Control, Controller, Path } from 'react-hook-form';
import { Input } from '../ui/input';
import { FormControl, FormItem, FormLabel, FormMessage } from '../ui/form';

interface FormViewComponentProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  placeholder: string;
  type: string;
  control: Control<T>;
}

const FormViewComponent = <T extends FieldValues>({
  name,
  label,
  placeholder,
  type,
  control
}: FormViewComponentProps<T>) => (
  <Controller
    name={name}
    control={control}
    render={({ field, fieldState }) => (
        <>
        <FormItem className='mt-3 w-full'>
          <FormLabel>{label}</FormLabel>
          <FormControl className=''>
            <Input
              type={type}
              placeholder={placeholder}
              className='h-9 text-secondary-foreground'
              {...field}
            />
          </FormControl>
        </FormItem>
          {fieldState.error && (
          <FormMessage>{fieldState.error.message}</FormMessage>
        )}
        </>
    )}
  />
);

export default FormViewComponent;