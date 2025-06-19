import { BuildterDataI, NFAItem } from "./type";


export const columnsKeyValue:any = 
  {
    workitemNumber: "Workitem Number",
  status: "Status",
  typeOfRequest: "Request Type",
  requestorName: "Requester Name",
  departmentName: "Department",
 category: "Category",
 subCategory: "Sub - Category",
  budgetAvailable: "Budget Available",
  valueBudget: "Budget Value",
  pendingOn: "Assigned to",
  modifiedBy: "Last Updated By",
  modifiedOn: "Last Updated Date",
  vendorLegalName: "Legal Name",
 vendorEmail: "Email",
 vendorContactNo: "Contact Number",
  typeOfVendor: "Type",
  natureOfServices: "Nature of Services",
  workitem: "Work Item",
  currentStatus: "Current Status",
  userTotal: "User Total (in hours)",
  mroTotal: "MRO Total (in hours)",
  mro1Total: "MRO 1 Total (in hours)",
  mro2Total: "MRO 2 Total (in hours)",
  vendorTotal: "Vendor Total (in hours)",
 hodTotal: "HOD Total (in hours)",
  dnbTotal: "D&B Total (in hours)",
 dmdTotal: "DMD Total (in hours)",
  fnaTotal: "NFA Total (in hours)",
  clmTotal: "CLM Total (in hours)",
  sapTotal: "SAP Total (in hours)",
  user: "User (Users)",
  mro: "MRO (Users)",
  mro1: "MRO 1 (Users)",
 mro2: "MRO 2 (Users)",
  vendor: "Vendor (Users)",
  hod: "HOD (Users)",
  dnb: "D&B (Users)",
  dmd: "DMD (Users)",
  fna: "NFA (Users)",
  clm: "CLM (Users)",
  sap: "SAP (Users)",
  }

export const buildersData: BuildterDataI[] = [
  {
    id: 1,
    createdBy: "Admin",
    createdOn: "2025-04-08T15:22:44.830159",
    modifiedBy: "Admin",
    modifiedOn: "2025-04-08T15:22:44.830159",
    status: "1",
    builderName: "PRESIDENCY BUILDERS PVT. LTD.",
    loanAmountSanctioned: 1000000,
    totalVendor: 200000
},
  ...Array(100).fill({
    id: Math?.random(),
    createdBy: "Admin",
    createdOn: "2025-04-08T15:22:44.830159",
    modifiedBy: "Admin",
    modifiedOn: "2025-04-08T15:22:44.830159",
    status: "1",
    builderName: "PRESIDENCY BUILDERS PVT. LTD.",
    loanAmountSanctioned: 1000000,
    totalVendor: 200000
  })
];


export const nfaData: NFAItem[] = [
  {
    id:1,
    title: "Permission for 5 Production PCs of Overseas Centers",
    draftNFANo: 'UCO/IT/25/0003',
    dateAndTime: "07-04-2025 10:00 am",
    typeOfNFA: 'Procurement',
    nfaValueExclGST: 20000,
    nfaValueInclGST: 22000,
    department: 'Information Technology',
    importance: 'High',
    natureOfNFA: 'Procurement'
  },
  {
    id:2,
    title: "Approval for renewal of data aggregator",
    draftNFANo: 'UCO/IT/25/0004',
    dateAndTime: "12-02-2025 12:03 pm",
    typeOfNFA: 'Procurement',
    nfaValueExclGST: 700000,
    nfaValueInclGST: 723000,
    department: 'Finance',
    importance: 'High',
    natureOfNFA: 'Financial Approval'
  },
  {
    id:3,
    title: "Go-live format standardization",
    draftNFANo: 'UCO/IT/25/0005',
    dateAndTime: "27-03-2025 1:00 pm",
    typeOfNFA: 'General',
    nfaValueExclGST: 0,
    nfaValueInclGST: 0,
    department: 'Information Technology',
    importance: 'High',
    natureOfNFA: 'Change Request'
  },
];