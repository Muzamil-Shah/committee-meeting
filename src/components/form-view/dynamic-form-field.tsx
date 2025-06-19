import { useState } from "react"
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Checkbox } from "../ui/checkbox"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select"
import { Switch } from "../ui/switch"
import { Textarea } from "../ui/textarea"
import { Calendar } from "../ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { format } from "date-fns"
import { Button } from "../ui/button"
import { Control, FieldValues, Path } from "react-hook-form"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "../ui/command"
import { cn } from "../../lib/utils"

export type FormFieldProps<T extends FieldValues> = {
    name: Path<T>
    label: string
    fieldType: string
    placeholder?: string
    options?: { value: string; label: string }[] | undefined
    required?: boolean
    control: Control<T>
    disabled?: boolean
}

const DynamicFormField = <T extends FieldValues>({
    name,
    label,
    fieldType,
    placeholder = "",
    options,
    required = false,
    control,
    disabled = false,
}: FormFieldProps<T>) => {
    // const [date, setDate] = useState<Date | undefined>()

    const [open, setOpen] = useState(false);
    return (
        <>
            {fieldType === "text" && <FormField
                name={name}
                control={control}
                render={({ field }) => (
                    <FormItem className="space-y-[5px]">
                        <FormLabel className="dark:text-white font-normal">{label}{required && <span className="text-red-500"> *</span>}</FormLabel>
                        <br />
                        <FormControl>
                            <Input placeholder={placeholder} {...field} className=" dark:text-white border border-gray-400
                            disabled:opacity-100 disabled:bg-gray-100 dark:disabled:opacity-100 dark:disabled:bg-gray-800 font-medium h-7" 
                            disabled={disabled} 
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />}
            {fieldType === "file" && (
                <FormField
                    name={name}
                    control={control}
                    render={({ field }) => (
                        <FormItem className="space-y-[5px]">
                            <FormLabel className="dark:text-white font-normal">
                                {label}
                                {required && <span className="text-red-500"> *</span>}
                            </FormLabel>
                            <br />
                            <FormControl>
                                <input
                                    type="file"
                                    {...field}
                                    className="dark:text-white border border-gray-400"
                                    disabled={disabled}
                                    onChange={(e) => {
                                        const files = e.target.files;
                                        if (files) {
                                            field.onChange(files[0]);
                                        }
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}
            {fieldType === "checkbox" && <FormField
                name={name}
                control={control}
                render={({ field }) => (
                    <FormItem className="space-y-[5px]">
                        {label && (<><FormLabel className="dark:text-white font-normal">{label}{required && <span className="text-red-500"> *</span>}</FormLabel>
                            <br /></>)}
                        <FormControl>
                            <Checkbox {...field} className="dark:text-white
                            disabled:bg-gray-100 border border-gray-400 dark:disabled:opacity-100 dark:disabled:bg-gray-800" disabled={disabled} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />}
            {/* {fieldType === "date" && <FormField
                name={name}
                control={control}
                render={({ field }) => {
                    setDate(field.value)
                    return (
                        <FormItem className="space-y-[5px]">
                            <FormLabel className="dark:text-white font-normal">{label}{required && <span className="text-red-500"> *</span>}</FormLabel>
                            <br />
                            <FormControl>
                                <Popover>
                                    <PopoverTrigger asChild className="w-full flex justify-start h-7">
                                        <Button
                                            variant={"outline"}
                                            className={`${!date ? "focus-visible:outline-gray-400 disabled:opacity-100 disabled:bg-gray-100 border border-gray-400 dark:disabled:opacity-100 dark:disabled:bg-gray-800 focus-visible:border focus-visible:border-gray-400 bg-background  shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-0 w-full flex justify-start h-7"
                                                    : "border border-gray-400 px-4 py-0 w-full flex justify-start disabled:opacity-100 disabled:bg-gray-100 dark:disabled:opacity-100 dark:disabled:bg-gray-800 h-7"
                                                }`}
                                            disabled={disabled}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4 dark:text-white" />
                                            <span className="dark:text-white">
                                                {date ? format(date, "PPP") : <span className="dark:text-white">Select Date</span>}
                                            </span>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent align="start">
                                        <Calendar
                                            {...field}
                                            mode="single"
                                            selected={date}
                                            onSelect={(d) => {
                                                setDate(d)
                                                field.onChange(d)
                                                // field.onChange(d ? d.toISOString().split("T")[0] : "");
                                            }}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )
                }}
            />} */}
        {fieldType === "date" && (
    <FormField
        name={name}
        control={control}
        render={({ field }) => {
            const formattedDate = field.value ? format(new Date(field.value), "PPP") : null;

            return (
                <FormItem className="space-y-[5px]">
                    <FormLabel className="dark:text-white font-normal">
                        {label}
                        {required && <span className="text-red-500"> *</span>}
                    </FormLabel>
                    <br />
                    <FormControl>
                        <Popover>
                            <PopoverTrigger asChild className="w-full flex justify-start h-7">
                                <Button
                                    variant={"outline"}
                                    className={`${
                                        !field.value
                                            ? "focus-visible:outline-gray-400 disabled:opacity-100 disabled:bg-gray-100 border border-gray-400 dark:disabled:opacity-100 dark:disabled:bg-gray-800 focus-visible:border focus-visible:border-gray-400 bg-background  shadow-sm hover:bg-accent hover:text-accent-foreground px-4 py-0 w-full flex justify-start h-7"
                                            : "border border-gray-400 px-4 py-0 w-full flex justify-start disabled:opacity-100 disabled:bg-gray-100 dark:disabled:opacity-100 dark:disabled:bg-gray-800 h-7"
                                    }`}
                                    disabled={disabled}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4 dark:text-white" />
                                    <span className="dark:text-white">
                                        {formattedDate || "Select Date"}
                                    </span>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent align="start">
                                <Calendar
                                    mode="single"
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(d) => {
                                        field.onChange(d ? d.toISOString().split("T")[0] : "");
                                    }}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            );
        }}
    />
)}



            {fieldType === "combobox" && <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className="space-y-[5px]">
                        <FormLabel className="dark:text-white font-normal">{label}{required && <span className="text-red-500"> *</span>}</FormLabel>
                        <br />
                        <FormControl>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        disabled={disabled}
                                        className="w-full flex h-7 justify-between dark:text-white border border-gray-400
                                        disabled:opacity-100 disabled:bg-gray-100 dark:disabled:opacity-100 dark:disabled:bg-gray-800"
                                    >
                                        {field.value
                                            ? options?.find((option) => option.value === field.value)?.label
                                            : placeholder}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
                                        <CommandList>
                                            <CommandEmpty>No {label.toLowerCase()} found.</CommandEmpty>
                                            <CommandGroup>
                                                {options?.map((option) => (
                                                    <CommandItem
                                                        key={option?.value}
                                                        value={option?.value}
                                                        onSelect={(currentValue) => {
                                                            field.onChange(currentValue === field.value ? "" : currentValue);
                                                            setOpen(false);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-5 w-5",
                                                                field.value === option.value ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {option.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                    </FormItem>
                )}
            />}


            {fieldType === "multiSelect" && <FormField
                control={control}
                name={name}
                render={({ field }) => (
                    <FormItem className="space-y-[5px]">
                        <FormLabel className="dark:text-white font-normal">
                            {label}
                            {required && <span className="text-red-500"> *</span>}
                        </FormLabel>
                        <br />
                        <FormControl>
                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        disabled={disabled}
                                        className="w-full h-7 justify-between overflow-x-auto overflow-y-hidden
                                        disabled:bg-gray-100 border border-gray-400 dark:disabled:opacity-100 dark:disabled:bg-gray-800"
                                    >
                                        <div className="flex gap-2 justify-start">
                                            {field.value.length ? (
                                                field.value.map((value: string) => {
                                                    const option = options?.find((opt) => opt.value === value);
                                                    return option ? (
                                                        <div key={value} className="px-2 py-[1px] rounded-xl border bg-slate-200 dark:bg-slate-600 text-xs font-medium">
                                                            {option.label}
                                                        </div>
                                                    ) : null;
                                                })
                                            ) : (
                                                placeholder
                                            )}
                                        </div>
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[200px] p-0">
                                    <Command>
                                        <CommandInput placeholder={`Search ${label.toLowerCase()}...`} />
                                        <CommandEmpty>No Data found.</CommandEmpty>
                                        <CommandList>
                                            <CommandGroup>
                                                {options?.map((option) => (
                                                    <CommandItem
                                                        key={option.value}
                                                        value={option.value}
                                                        onSelect={() => {
                                                            const newValue = field.value.includes(option.value)
                                                                ? field?.value.filter((v: string) => v !== option.value)
                                                                : [...field.value, option.value];
                                                            field.onChange(newValue);
                                                        }}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                field.value.includes(option.value) ? "opacity-100" : "opacity-0"
                                                            )}
                                                        />
                                                        {option.label}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </CommandList>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                        </FormControl>
                    </FormItem>
                )}
            />}



            {fieldType === "radio" && options && <FormField
                name={name}
                control={control}
                render={({ field }) => (
                    <FormItem className="space-y-[5px]">
                        <FormLabel className="dark:text-white font-normal">{label}{required && <span className="text-red-500"> *</span>}</FormLabel>
                        <br />
                        <FormControl>
                            <RadioGroup onValueChange={field.onChange} value={field.value} disabled={disabled} className="dark:text-white border border-gray-400">
                                {options.map(option => (
                                    <RadioGroupItem key={option.value} value={option.value}>
                                        {option.label}
                                    </RadioGroupItem>
                                ))}
                            </RadioGroup>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />}
            {fieldType === "select" && options && <FormField
                name={name}
                control={control}
                render={({ field }) => (
                    <FormItem className="space-y-[5px]">
                        <FormLabel className="dark:text-white font-normal">{label}{required && <span className="text-red-500"> *</span>}</FormLabel>
                        <br />
                        <FormControl>
                            <Select onValueChange={field.onChange} value={field.value} disabled={disabled} >
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select" className="text-white border border-gray-400" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        {options.map(option => (
                                            <SelectItem key={option.value} value={option.value}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />}
            {fieldType === "switch" && <FormField
                name={name}
                control={control}
                render={({ field }) => (
                    <FormItem className="space-y-[5px]">
                        <FormLabel className="dark:text-white font-normal">{label}{required && <span className="text-red-500"> *</span>}</FormLabel>
                        <br />
                        <FormControl>
                            <Switch {...field} disabled={disabled} className="dark:text-white border border-gray-400" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />}
            {fieldType === "textarea" && <FormField
                name={name}
                control={control}
                render={({ field }) => (
                    <FormItem className="space-y-[5px]">
                        <FormLabel className="dark:text-white font-normal">{label}{required && <span className="text-red-500"> *</span>}</FormLabel>
                        <br />
                        <FormControl>
                            <Textarea placeholder={placeholder} {...field} disabled={disabled} className="dark:text-white border border-gray-400
                            disabled:opacity-100 disabled:bg-gray-100 dark:disabled:opacity-100 dark:disabled:bg-gray-800 font-medium " />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />}
        </>
    )
}

export default DynamicFormField
