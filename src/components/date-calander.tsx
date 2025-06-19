import React, { useMemo, useState } from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar} from "./ui/calendar";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

type CustomCalendarProps = {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    minDate?: Date | null
    disabled?: boolean
    props?: Record<string , unknown >
  };
  
  const CustomCalendar: React.FC<CustomCalendarProps> = ({ value, onChange, minDate = null,disabled=false ,props}) => {
    console.log({value});
    
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(value);
    const [displayedDate, setDisplayedDate] = useState<Date>(
      value ?? new Date()
    ); // Tracks the currently displayed month/year in the calendar
  
    const handleMonthChange = (month: number) => {
      const updatedDate = new Date(displayedDate.getFullYear(), month, 1);
      setDisplayedDate(updatedDate);
    };
  
    const handleYearChange = (year: number) => {
      const updatedDate = new Date(year, displayedDate.getMonth(), 1);
      setDisplayedDate(updatedDate);
    };
  
    const handleDateSelect = (date: Date | undefined) => {
      setSelectedDate(date);
      onChange?.(date);
    };
    useMemo(() => {
      setDisplayedDate(
        value ?? new Date()
      )
    },[value])
  
    return (
      <div className="space-y-3">
        <Popover>
          <PopoverTrigger asChild>
            <Button
            disabled={disabled}
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal overflow-hidden",
                !selectedDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : <span>Select a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-4">
            <div className="flex justify-between mb-4">
              {/* Month Selector */}
              <select
                className="border rounded px-2 py-1"
                value={displayedDate.getMonth()}
                onChange={(e) => handleMonthChange(parseInt(e.target.value, 10))}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {format(new Date(displayedDate.getFullYear(), i), "MMMM")}
                  </option>
                ))}
              </select>
              {/* Year Selector */}
              <select
                className="border rounded px-2 py-1"
                value={displayedDate.getFullYear()}
                onChange={(e) => handleYearChange(parseInt(e.target.value, 10))}
              >
                {Array.from({ length: 20 }, (_, i) => displayedDate.getFullYear() - 10 + i).map(
                  (year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  )
                )}
              </select>
            </div>
            {/* Calendar */}
            <Calendar
            {...props}
              mode="single"
              selected={selectedDate}
              month={displayedDate} // Control the displayed month/year dynamically
              onMonthChange={setDisplayedDate} // Allow external controls to update the calendar's view
              onSelect={handleDateSelect as (date: Date | undefined) => void}
              initialFocus
              disabled={(date) => minDate ? date < minDate : false}
            />
          </PopoverContent>
        </Popover>
      </div>
    );
  };
  
  export default CustomCalendar;
