import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import * as XLSX from "xlsx";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleDownloadFile = ({
  dataToExport,
  title,
  fileName,
}: {
  dataToExport: any[];
  title: string;
  fileName: string;
}) => {
  const worksheet = XLSX.utils.json_to_sheet(dataToExport);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, title);
  XLSX.writeFile(workbook, fileName);
};

export const handleDownloadFileWithCustomHeader = ({
  dataToExport,
  title,
  fileName,
  headers,
}: {
  dataToExport: any[];
  title: string;
  fileName: string;
  headers: { key: string; header: string }[]; // Key-Header mapping
}) => {
  if (!dataToExport.length) return;

  // Prepare header row with custom names
  const headerRow = headers.map((h) => h.header);

  // Convert data to match new headers
  const mappedData = dataToExport.map((row) =>
    headers.map(({ key }) => row[key] || "") // Ensuring order matches headers
  );

  // Combine headers + data
  const finalData = [headerRow, ...mappedData];

  // Create worksheet with correct structure
  const worksheet = XLSX.utils.aoa_to_sheet(finalData); // aoa_to_sheet ensures headers are correctly aligned

  // Auto-fit columns
  const columnWidths = headerRow.map((header) => ({ wch: header.length + 5 }));
  worksheet["!cols"] = columnWidths;

  // Create and save workbook
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, title);
  XLSX.writeFile(workbook, fileName);
};

export const getCurrentFinancialYear = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  if (month >= 4) {
    return `${year}-${(year + 1).toString().slice(-2)}`;
  } else {
    return `${year - 1}-${year.toString().slice(-2)}`;
  }
};

export const updateFormData = <T extends Record<string, unknown>>({
  formData,
  setFormData,
  newData,
}: {
  formData: Partial<T>;
  setFormData: React.Dispatch<React.SetStateAction<Partial<T>>>;
  newData: Partial<T>;
}) => {
  const trimmedData: Partial<T> = { ...formData };
  for (const key in newData) {
    if (Object.prototype.hasOwnProperty.call(newData, key)) {
      const value = newData[key as keyof T];
      if (typeof value === "string") {
        trimmedData[key as keyof T] = value.trim() as T[keyof T];
      } else {
        trimmedData[key as keyof T] = value;
      }
    }
  }
  setFormData(trimmedData);
};



// excel upload

// export const readAndMapExcelData = <T>(
//   file: File,
//   columnMapping: Record<string, keyof T>
// ): Promise<Record<string, T>[]> => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const binaryStr = event.target?.result;
//       const workbook = XLSX.read(binaryStr, { type: "binary" });
//       const sheetName = workbook.SheetNames[0];
//       const worksheet = workbook.Sheets[sheetName];
//       const excelData = XLSX.utils.sheet_to_json(worksheet) as Record<string, unknown>[];

//       const mappedData = excelData.map((row) => {
//         const newRow: Record<string, T> = {}; // Changed type to Record<string, T>
//         Object.keys(columnMapping).forEach((excelKey) => {
//           const tableKey = columnMapping[excelKey as keyof typeof columnMapping];
//           newRow[tableKey as string] = row[excelKey] as T; // Type assertion updated
//         });
//         return newRow;
//       });
//       resolve(mappedData);
//     };

//     reader.onerror = () => reject(new Error("Failed to read file"));
//     reader.readAsBinaryString(file);
//   });
// };

export const getBase64 = (file: any) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};


export function dateToArray(date: Date) {
  return [
    date.getFullYear(),          // Year
    date.getMonth() + 1,         // Month (0-based, so add 1)
    date.getDate(),              // Day
    date.getHours(),             // Hours
    date.getMinutes(),           // Minutes
    date.getSeconds(),           // Seconds
    date.getMilliseconds() * 1000000, // Nanoseconds (converted from milliseconds)
  ];
}
export function arrayToDate(dateArray: number[]) {
  return new Date(
    dateArray[0], // Year
    dateArray[1] - 1, // Month (0-based in JS)
    dateArray[2], // Day
    dateArray[3], // Hour
    dateArray[4], // Minute
    dateArray[5], // Second
    Math.floor(dateArray[6] / 1000) // Milliseconds (adjusted from nanoseconds)
  );
}

export function areArraysEqualUnordered(arr1:any[], arr2:any[]) {
  if (arr1?.length !== arr2?.length) return false;

  // if(Array.isArray(arr1) && Array.isArray(arr2)){

    const sortedArr1 = [...arr1]?.sort();
    const sortedArr2 = [...arr2]?.sort();
    
    return JSON.stringify(sortedArr1) === JSON.stringify(sortedArr2);
  // }else{
    
  // }
}


export function extractMatchesAsString(input: string): string {
  const regex = /[a-zA-Z0-9\s+_\-.]+/g; // Regex to extract valid sequences
  const sanitizedInput = input.replace(/[^a-zA-Z0-9\s+_\-.]/g, '_'); // Replace invalid characters with "_"
  const matches = sanitizedInput.match(regex); // Find valid substrings
  return matches ? matches.join('') : ''; // Combine valid parts into a single string
}

export function clearAllParams() {
  const url = new URL(window.location.href);

  // Clear all parameters
  url.search = '';

  // Update the browser URL
  window.history.replaceState(null, '', url.toString());
}

interface CurrencyFormatOptions {
  includeSymbol?: boolean;
  decimalPlaces?: number;
  showZeroDecimals?: boolean;
}

export function formatIndianCurrency(
  amount: number,
  options: CurrencyFormatOptions = {}
): string {
  const {
    includeSymbol = true,
    decimalPlaces = 2,
    showZeroDecimals = true
  } = options;

  if (typeof amount !== 'number' || isNaN(amount)) {
    return includeSymbol ? '₹—' : '—';
  }

  const formatter = new Intl.NumberFormat('en-IN', {
    style: 'decimal',
    minimumFractionDigits: showZeroDecimals ? decimalPlaces : 0,
    maximumFractionDigits: decimalPlaces
  });

  const formattedAmount = formatter.format(amount);
  return includeSymbol ? `₹${formattedAmount}` : formattedAmount;
}

export const extractValueOutOfArrayOfObjects = (
  obj: Record<string, any>,
  searchKey: string[]
): string[] => {
  let data: any = obj;
  for (const key of searchKey) {
    if (Array.isArray(data)) {
      data = data.map((item) => item[key]);
    } else if (data && data[key]) {
      data = data[key];
    } else {
      return [];
    }
  }
  if (Array.isArray(data)) {
    return data;
  } else {
    return [data];
  }
};