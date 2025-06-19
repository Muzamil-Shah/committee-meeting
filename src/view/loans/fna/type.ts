export type PurchaseIndentDataType = {
  id: number;
  requestType: string;
  requestName: string;
  departmentName: string;
  category: number;
  categoryName: string;
  subCategory: number;
  subCategoryName: string;
  budgetAvaliable: string;
  valueBudget: number;
  attachment: string;
  scopeOfWork: string;
  status: string;
  createdOn:number[];
  modifiedOn: number[];
  modifiedBy: string;
};


export type  RequestDetails = {
    createdBy: string;
    createdOn: number[] | unknown[];
    modifiedBy: string;
    modifiedOn: number[] | unknown[];
    status: string;
    id: number;
    typeOfRequest: string;
    requestorName: string;
    departmentName: string;
    category: string | null;
    subCategory: string | null;
    budgetAvailable: string | null;
    valueBudget: string | null;
    scope: string | null;
    vendorLegalName: string;
    vendorEmail: string;
    vendorContactNo: string;
    typeOfVendor: string;
    natureOfServices: string | null;
    subStatus: string;
    btnStatus: string | null;
    remarks: string | null;
    uniqueNumber: string;
    linkExpireTime: string | null;
    vendorScorePercentage: number;
    vendorResult: string;
    preCheck: string | null;
  };
  
  export type   BuildterDataI = {
    createdOn: Date |string;
    id: number;
    status: string;
    loanAmountSanctioned:string;
      builderName:string;
      totalVendor: string;
  };
  export type  TopBuildterDataI = {
    
      sNo: number;
      numberOfInvoices:string | number;
      builderName:string;
      numberOfVendors: null | number;
      id: number;
      projectName: string;
    
  };


  export interface NFAItem {
    id: number;
    title: string;
    draftNFANo: string;
    dateAndTime: string; // ISO format
    typeOfNFA: string;
    nfaValueExclGST: number;
    nfaValueInclGST: number;
    department: string;
    importance: string;
    natureOfNFA: string;
  }