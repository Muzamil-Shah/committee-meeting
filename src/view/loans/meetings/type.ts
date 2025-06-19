import { CommentI } from "../my-inbox/type";

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
  createdOn: number[];
  modifiedOn: number[];
  modifiedBy: string;
};

export type RequestDetails = {
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

export type ProjectsDataI = {
  createdOn: Date;
  id: number;
  status: string;
  totalInvoiceAmounts: string | number;
  builderName: string;
  projectName: string;
  builderId: number;
  numberOfInvoices: string | number;

  numberOfInvoicesInException: number | string;
  numberOfInvoicesInProcess: number | string;
  numberOfInvoicesProcessed: number | string;

  sNo: number;
};
export type BuilderDetailsOfProjectDataI = {
  sNo: number;
  loanAmountSanctioned: number;
  loanAmountUtilized: number;
  id: number;
  projectName: string;
};

export type InvoiceI = {
  sNo: number;
  id: number;
  status: string;
  vendorName: string;
  invoiceNo: string;
  invoiceDate: string;
  uniqueNumber: string | number;
  totalInvoiceAmount: string | number;
};

export interface CommitteeMember {
  role: string;
  user: string;
  emailId: string;
}
export interface QuorumRequirement {
  role: string;
  count: number;
}
export interface CommitteeData {
  id: number;
  committeeName: string;
  committeeType: string;
  subject: string;
  description: string;
  startDate: string; // ISO date string
  endDate: string; // ISO date string
  quorumCheck: boolean;
  agendaApproval: boolean;
  momRequiredApproval: boolean;
  attachments: string[];
  composition: CommitteeMember[];
  quorum: QuorumRequirement[];
}

export interface IMeeting {
  id: number;
  title: string;
  subject: string;
  description: string;
  timeSchedule: {
    start_date: Date | null;
    end_date: Date | null;
  }[];
  start_date: Date | null;
  end_date: Date | null;
  attachment: any;
  agenda: { title: string; subject: string; comments: CommentI[] }[];
  nfa: number[];
  committee: number[];
  mom:[]
}
