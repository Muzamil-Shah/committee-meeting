import React, { useState, ChangeEvent } from 'react';
import * as XLSX from 'xlsx';

// Define types for data
type ExcelData = {
    [key: string]: string | number;
};

const ReadExcelFile: React.FC = () => {
    const [_, setData] = useState<ExcelData[]>([]);

    const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const binaryStr = e.target?.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json: ExcelData[] = XLSX.utils.sheet_to_json(worksheet);
            setData(json);
        };
        reader.readAsBinaryString(file);
    };

    

    return (
        <div>
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            
        </div>
    );
};

export default ReadExcelFile;
