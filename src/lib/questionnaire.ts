import { KeyValueObjectDataType } from "../types/Data";

export const entityYear :KeyValueObjectDataType[]=[
    { value: "0-1 Year", label: "0-1 Year" },
    { value: "2-5 Years", label: "2-5 Years" },
    { value: "5-10 Years", label: "5-10 Years" },
    { value: "10-15 Years", label: "10-15 Years" },
    { value: "15-20 Years", label: "15-20 Years" },
    { value: "> 20 Years", label: "> 20 Years" }
  ];

  export const entityTypeOptions : KeyValueObjectDataType[]=[
    { value: "Proprietorship / Unregistered Partnership", label: "Proprietorship / Unregistered Partnership" },
    { value: "Registered Partnership", label: "Registered Partnership" },
    { value: "Trust/ NGOs", label: "Trust/ NGOs" },
    { value: "Private Limited / LLP", label: "Private Limited / LLP" },
    { value: "Public Limited", label: "Public Limited" }
  ];


  export const gstOptions: KeyValueObjectDataType[] = [
    { value: "No", label: "No" },
    { value: "Yes", label: "Yes" },
    { value: "GST not applicable in business", label: "GST not applicable in business" }
  ];

 export const gstRegistrationDateOptions: KeyValueObjectDataType[] = [
    { value: "GST not applicable in business", label: "GST not applicable in business" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
    { value: "2021", label: "2021" },
    { value: "2020", label: "2020" },
    { value: "2018 / 2017 / 2019", label: "2018 / 2017 / 2019" }
  ];

  export const auditedFinancialStatementsOptions: KeyValueObjectDataType[] = [
    { value: "No", label: "No" },
    { value: "Yes", label: "Yes" }
  ];

  
  export const borrowingsOptions: KeyValueObjectDataType[] = [
    { value: "> 100% of total revenue", label: "> 100% of total revenue" },
    { value: "61-100% of total revenue", label: "61-100% of total revenue" },
    { value: "41-60% of total revenue", label: "41-60% of total revenue" },
    { value: "21-40% of total revenue", label: "21-40% of total revenue" },
    { value: "11-20% of total revenue", label: "11-20% of total revenue" },
    { value: "< 10% of total revenue", label: "< 10% of total revenue" }
  ];

  export const netProfitConsistencyOptions: KeyValueObjectDataType[] = [
    { value: "Not Applicable", label: "Not Applicable" },
    { value: "Consistent from 1 year", label: "Consistent from 1 year" },
    { value: "Consistent from 2 years", label: "Consistent from 2 years" },
    { value: "Consistent from 3 years and above", label: "Consistent from 3 years and above" },
    { value: "Not Consistent", label: "Not Consistent" }
  ];

  export const currentDirectorsOptions: KeyValueObjectDataType[] = [
    { value: "Not Applicable", label: "Not Applicable" },
    { value: "Director Name & Appointment Date", label: "Director Name & Appointment Date" }
  ];

  export const currentShareholdersOptions: KeyValueObjectDataType[] = [
    { value: "Not Applicable", label: "Not Applicable" },
    { value: "Provide details", label: "Provide details" }
  ];

  
  export const yesNoOptions: KeyValueObjectDataType[] = [
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" }
  ];

  export const panasonicAssociationOptions: KeyValueObjectDataType[] = [
    { value: "No", label: "No" },
    { value: "Yes", label: "Yes" }
  ];

  export const creditRatingOptions: KeyValueObjectDataType[] = [
    { value: "CIBIL Score < 720", label: "CIBIL Score < 720" },
    { value: "CIBIL Score > 720", label: "CIBIL Score > 720" },
    { value: "CRISIL Score BBB, BB, B", label: "CRISIL Score BBB, BB, B" },
    { value: "CRISIL Score AAA, AA, A", label: "CRISIL Score AAA, AA, A" },
    { value: "CRISIL Score C, D", label: "CRISIL Score C, D" },
    { value: "Not Provided", label: "Not Provided" }
  ];

  export const statesOfOperationOptions: KeyValueObjectDataType[] = [
    { value: "0-3", label: "0-3" },
    { value: "3-6", label: "3-6" },
    { value: "> 6", label: "> 6" }
  ];

  export const employeesInASPOptions: KeyValueObjectDataType[] = [
    { value: "0-10 employees", label: "0-10 employees" },
    { value: "11-20 employees", label: "11-20 employees" },
    { value: "20-30 employees", label: "20-30 employees" },
    { value: "30-50 employees", label: "30-50 employees" },
    { value: "> 50 employees", label: "> 50 employees" }
  ];

  export const averageTurnoverOptions: KeyValueObjectDataType[] = [
    { value: "0-50 Lacs", label: "0-50 Lacs" },
    { value: "50 Lacs", label: "50 Lacs" },
    { value: "2-10 Cr", label: "2-10 Cr" },
    { value: "10-30 Cr", label: "10-30 Cr" },
    { value: "30-50 Cr", label: "30-50 Cr" },
    { value: "> 50 Cr", label: "> 50 Cr" }
  ];

  export const serviceProvisionDurationOptions: KeyValueObjectDataType[] = [
    { value: "Not applicable", label: "Not applicable" },
    { value: "Less than one year", label: "Less than one year" },
    { value: "1-3 Years", label: "1-3 Years" },
    { value: "3-5 Years", label: "3-5 Years" },
    { value: "5-7 Years", label: "5-7 Years" },
    { value: "> 7 Years", label: "> 7 Years" }
  ];

  export const clientsAssociatedWithASPOptions: KeyValueObjectDataType[] = [
    { value: "Not Provided services to any Clients", label: "Not Provided services to any Clients" },
    { value: "Only Working with Panasonic Life Solutions", label: "Only Working with Panasonic Life Solutions" },
    { value: "1-5", label: "1-5" },
    { value: "6-10", label: "6-10" },
    { value: "11-20", label: "11-20" },
    { value: "21-30", label: "21-30" },
    { value: "> 30", label: "> 30" }
  ];

  export const executedSimilarProjectsOptions: KeyValueObjectDataType[] = [
    { value: "Not done similar quantum of work in past", label: "Not done similar quantum of work in past" },
    { value: "1-5 Projects", label: "1-5 Projects" },
    { value: "> 5 Projects", label: "> 5 Projects" }
  ];

  export const revenueGeneratedFromSimilarServicesOptions: KeyValueObjectDataType[] = [
    { value: "> 51%", label: "> 51%" },
    { value: "31-50%", label: "31-50%" },
    { value: "10-30%", label: "10-30%" },
    { value: "Not generated any revenue from similar nature of service", label: "Not generated any revenue from similar nature of service" }
  ];

  export const clientReferencesOptions: KeyValueObjectDataType[] = [
    { value: "Not applicable", label: "Not applicable" },
    { value: "No details provided", label: "No details provided" },
    { value: "Details provided", label: "Details provided" }
  ];

  export const supplierReferencesOptions: KeyValueObjectDataType[] = [
    { value: "No supplier in Business", label: "No supplier in Business" },
    { value: "No details provided", label: "No details provided" },
    { value: "Details provided", label: "Details provided" }
  ];

  export const projectsProvidedToPIOptions: KeyValueObjectDataType[] = [
    { value: "Not Applicable", label: "Not Applicable" },
    { value: "1-3 Projects", label: "1-3 Projects" },
    { value: "3-5 Projects", label: "3-5 Projects" },
    { value: "> 5 Projects", label: "> 5 Projects" }
  ];

  export const blacklistedOptions: KeyValueObjectDataType[] = [
    { value: "No", label: "No" },
    { value: "Blacklisted by Panasonic / Panasonic entities", label: "Blacklisted by Panasonic / Panasonic entities" },
    { value: "Blacklisted by Regulatory Body", label: "Blacklisted by Regulatory Body" },
    { value: "Blacklisted by other clients", label: "Blacklisted by other clients" }
  ];
  
  
 
  
  