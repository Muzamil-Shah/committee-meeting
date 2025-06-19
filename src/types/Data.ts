import { z } from "zod";

export interface UserDetails {
  username: string;
  userId: string;
  roleNames: string[];
  roleIds: string[];
  rightIds: string[];
  rightNames: string[];
}
export interface UserVendorDetails {
  role: string;
  userId: number;
  username: string;
  departmentId: null;
  projects: null;
    roleId: Number;
    department: string,
    fullName: string
}

export interface OptionShap {
  label: string,
  value: number | string
}

export interface ChartData {
  month: string;
  approvedInvoice: number;
  rejectInvoice: number;
  pendingInvoice: number;
  accessType: string;
  notesType: string[];
}

export interface GlobalAccessFilterData {
  id: number;
  label: string;
  value: string;
  roleNames: string[];
}

export interface LoansData {
  id: number;
  count: number | string;
  label: string;
  name: string;
  icon: JSX.Element;
  accessType: string[];
  path: string;
  color?: string;
  background?: string
}

export interface ServiceDataType {
  id: string;
  fromLocation: string;
  toLocation: string;
  service: string;
  quantity: number;
  rma: number;
  vsat: string;
  valueAddedCharges: number;
  accessServiceCharges: number;
  totalMediaCharges: number;
  mediaManagementCharges: number;
  SOCCCharges: number;
  interfaceProtocolCharges: number;
  fixedSiteCharges: number;
  totalCharges: number;
  dailyCharges: number;
  startDate: Date;
}

export interface ReportItem {
  id: number;
  gst: string;
  services: string;
  location: string;
  siteName: string;
  usiCode: string;
  connectivity: string;
  baseAmount: number;
  totalAmount: number;
  accessType: string;
  priority: string;
  comment: string;
}

export interface SiteData {
  value: string;
  label: string;
  buyerGstin: string;
  buyerLocation: string;
}
export interface StateData {
  value: string;
  label: string;
  sitesName: SiteData[];
}

export interface StateMasterDataType {
  id: number;
  stateName: string;
  createdBy: string;
  createdOn: string;
}

export interface commentMatrixDataType {
  id: number;
  comment: string;
  createdBy: string;
  createdOn: string;
  action: string;
}
export interface PaymentTermsDataType{
  id: number,
  description: string
}

export type DocumentFileShap = {
  documentName: string;
  documentExtension: string;
  docIndex: number | string;
};
export const DocumentFileSHapZod = z.object({
  documentName: z.string({message:"Only text is allowed. Please enter a valid string."}),
  documentExtension: z.string({message:"Only text is allowed. Please enter a valid string."}),
  docIndex: z.number({message:"Only decimal numbers are allowed. Please enter a valid decimal value (e.g., 1.23)."}).or(z.string({message:"Only text is allowed. Please enter a valid string."})),
})

export interface Category{
  id: number,
  category: string
}
export interface Role{
  id: number,
  role: string
}
export interface SubCategory{
  id: number,
  category: string
  categoryId: string
  subCategoryName: string
}
export interface FolderI{
  allowedExtension: string;
  directoryPath: string;
  docType: string;
  projectId: string | number | null;
}
export interface HsnSacCode{
  code: string;
  hsnCode?: string;
  sacCode?: string;
  typeOfCode: string;
  description: string;
  mainHeading: string;
  subHeading: string;
}
export interface HsnSacCodeInvoice{
  
    uom: string,
    amount: string | number
    code: string | number
    quantity: string | number
    sNo: string | number
    description: string
    id: string | number

}
export interface User{
  id: number,
  username: string
  firstname: string
  lastname: string
  department: string
  role: string
}
export interface ServiceInventoryLDataType {
  id: number;
  serviceClass: string;
  bandwidth: number;
  usiCode: string;
  serviceType: string;
  superCededUsi: string;
  fromSite: string;
  fromSiteNo: number;
  toSite: string;
  toSiteNo: number;
  connectivity: string;
  fromSiteInterface: string;
  layer2: string;
  toSiteInterface: string;
  fromSiteLID: string;
  fromSiteFAC: string;
  toSiteLID: string;
  toSiteFAC: string;
  rmaCode: number;
  phase: string;
  miscInfo: string;
  startDate: string;
  endDate: string;
  activeNonActive: string;
  remarks: string;
  oct23: string;
  nov23: string;
  dec23: string;
  jan23: string;
  feb23: string;
  mar23: string;
  apr23: string;
  may23: string;
  jun23: string;
}

export interface ServiceInventoryCDataType {
  id: number;
  serviceClass: string;
  usiCode: string;
  fromSite: string;
  toSite: string;
  phase: string;
  startDate: string;
  endDate: string;
  status: string;
}

export interface PricingSheetDataType {
  id: number;
  serviceClass: string;
  usiCode: string;
  fromSite: string;
  toSite: string;
  phase: string;
  startDate: string;
  status: string;
}

export interface LineItemDataType {
  id: number;
  usiCode: string;
  connectivity: string;
  stateName: string;
  service: string;
  descriptionOfService: string;
  billingStartPeriod: string;
  billingEndPeriod: string;
  hsnCode: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  taxableAmount: number;
  centralTax: number | null;
  centralTaxValue: number | null;
  integratedTax: number;
  integratedTaxValue: number;
  stateUnionTerritoryTax: number | null;
  stateUnionTerritoryTaxValue: number | null;
  totalAmountIncTax: number;
}

export interface defaultRowDataType {
  fromLocation: string;
  toLocation: string;
  service: string;
  quantity: number;
  rma: number;
  vsat: string;
  valueAddedCharges: number;
  accessServiceCharges: number;
  totalMediaCharges: number;
  mediaManagementCharges: number;
  SOCCCharges: number;
  interfaceProtocolCharges: number;
  fixedSiteCharges: number;
  totalCharges: number;
  dailyCharges: number;
  startDate: string;
  id: string;
}

export interface serviceTypeDataType {
  value: string;
  label: string;
}
export interface KeyValueObjectDataType {
  value: string | number;
  label: string;
}



export interface RecentItem {
  id: string;
  uniqueNumber: string | undefined;
  status: string;
  stateName: string;
  createdOn: string;
  createdBy: string;
  totalAmount: number;
  requestorName: string;
  pendingOn: string;
  comment: string;
  location?: string;
  gstNumber?: string;
  sellerGstNumber?: string;
  taxableAmount?: number;
}

export interface DebitCreditNoteDataType {
  id: number;
  uniqueNumber: string;
  billTo: string;
  supplierDetails: string;
  gstinOfSupplier: string;
  state: string;
  placeOfSupply: string;
  gstinOfRecipient: string;
  creditNoteNumber: string;
  date: string;
  referenceInvoiceNumber: string;
  referenceInvoiceDate: string;
  irnNumber: string;
  agreementNumber: string;
  agreementDate: string;
  grandTotalTaxableAmount: number;
  grandTotalCentralTax: number;
  grandTotalStateUnionTerritoryTax: number;
  grandTotalAmount: number;
  amountInWords: string;
  note: string;
  bankName: string;
  beneficiaryAcNo: string;
  beneficiaryAcName: string;
  ifsc: string;
  pan: string;
  paymentTerms: string;
  status: string;
  type: string;
  createdOn: string;
  createdBy: string;
}

export interface siteDataType {
  value: string;
  label: string;
  id: number;
  siteName: string;
  siteId: string;
}

export interface FinancialBidDataType {
  id: number;
  connectivity: string;
  service: string;
  usiCode: string;
  valueAddedServiceCharge: number;
  accessServiceChargeRma2Rma3: number;
  accessServiceChargeRma1: number;
  totalMediaCharge: number;
  mediaManagementCharge: number;
  noccAndSoccCharge: number;
  interfaceProtocolCharge: number;
  fixedSiteCharge: number;
  totalChargeForService: number;
  dailyCharges: number;
  phase: string;
  dateOfImpOfService: string;
  noOfDaysServiceIsActiveInYear: number;
  noOfDaysInFirstQuat: number;
  costOfServiceInFirstQuat: number;
  noOfDaysInSecondQuat: number;
  costOfServiceInSecondQuat: number;
  noOfDaysInThirdQuat: number;
  costOfServiceInThirdQuat: number;
  noOfDaysInFourthQuat: number;
  costOfServiceInFourthQuat: number;
  totalCostOfService: number;
}

export interface DebitCreditLineItemDataType {
  id: string;
  description: string;
  hsnSac: string;
  totalAmountBasePrice?: string | undefined;
  taxableAmount?: string | undefined;
  centralTax?: string | undefined;
  stateUnionTerritoryTax?: string | undefined;
  totalAmountIncludedTax?: string | undefined;
}

export interface CreditNoteAnnexureListViewDataType {
  id: string;
  type: string;
  serviceClass: string;
  usiCode: string;
  fromSite: string;
  fromSiteNo: number;
  toSite: string;
  toSiteNo: number;
  rma: string;
  phase: string;
  startDate: string;
  endDate: string;
  rate: number;
  totalAmountHeader: number;
}

export interface DebitNoteAnnexureListViewDataType {
  id: string;
  usiCode: string;
  newUsi: string;
  site: string;
  state: string;
  startDate: string;
  endDate: string;
  connectivity: string;
  serviceClass: string;
  uniqueServiceIdentifierUSI: string;
  dailyCharges: string;
  days: string;
  amount: string;
  remarks: string;
  totalAmount: string;
}

export interface DownloadSLADataType {
  year: string;
  month: string;
  quarter: string;
  usiCode: string;
  totalPenalty: string;
  rma: string;
  availabilityTimeInMinutes: string;
  outageTimeInMinutes: string;
  exceptionTimeOutage: string;
  outageTimeHarris: string;
  status?: string;
  penaltyAmount: number;
}

export interface UploadSLADataType {
  year: string;
  month: string;
  usiCode: string;
  totalPenalty: string;
  rma: string;
  availabilityTimeInMinutes: string;
  outageTimeInMinutes: string;
  exceptionTimeOutage: string;
  outageTimeHarris: string;
  penaltyAmountOne: number;
  diversityRestorationTime: string;
  exceptionTimeDiversityRestoration: string;
  diversityRestorationTimeHarris: string;
  penaltyAmountTwo: number;
  siteToSiteLatency: string;
  instancesEligibleForPenalty: string;
  penaltyAmountThree: number;
  siteToSiteJitter: string;
  instancesEligibleForPenaltyTwo: string;
  penaltyAmountFour: number;
  siteToSitePacketDelivery: string;
  los: string;
  onePacketDelivery: string;
  penaltyAmountFive: number;
  noOfPlannedMaintenance: string;
  durationInMinutes: string;
  mtboHours: string;
  penaltyAmountSix: string;
  noOfInstanceTwo: string;
  penaltyAmountSeven: number;
}
