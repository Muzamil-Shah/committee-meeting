import axios from "axios";
import { AI, AUTH, URL } from "./path";
//! login-captcha
export const GET_CAPTCHA = `${AUTH}/auth-service/get-captcha`;
export const SIGN_IN = `${AUTH}/auth-service/sign-in`;
export const SIGN_OUT = `${AUTH}/auth-service/logout`;
export const SIGN_IN_VENDOR = `${URL}/panasonic-authentication/vendorAuthenticate`;
export const OTP_VERIFICATION_VENDOR = `${URL}/panasonic-authentication/vendorAuthenticateToken`;
export const VERIFY_VENDOR_LINK = `${URL}/panasonic-authentication/checkForLinkExpiry`;
export const VERIFY_USER_EMAIL = `${URL}/panasonic-authentication/checkForAdAuthentication`;
export const REFRESH_TOKEN = `${URL}/auth-service/refresh-token`;
export const VERIFY_MICROSOFT_CODE = `${URL}/panasonic-authentication/handleCallBack`;
// Vendor Onboarding 
export const GET_VENDOR_ONBOARDING_DETAILS_WITH_STEP = `${URL}/panasonic-vendor-upsert/getVendorDetails`
export const ADD_VENDOR_ONBOARDING_DETAILS_WITH_STEP = `${URL}/panasonic-vendor-upsert/saveVendorDetails`
export const GENERATE_VENDOR_ONBOARDING_LINK = `${URL}/panasonic-purchase-indent/afterAcknowledgeForVendorInitiation`
// Verify data trough the api
export const VERIFY_PAN = `${URL}/panasonic-validation/verifyPan`
export const VERIFY_GSTIN = `${URL}/panasonic-validation/gstinByPAN`
export const VERIFY_MSME = `${URL}/panasonic-validation/verifyMsme`
export const VERIFY_BANK = `${URL}/panasonic-validation/verifyBank`
export const VERIFY_ADDRESS_WITH_GSTIN = `${URL}/panasonic-validation/getAddressByGstn`
//Upload Data to S3 bucket
export const UPLOAD_DATA= `${URL}/panasonic-document-upload/addDocumentData`
export const DELETED_UPLOAD_DATA= `${URL}/panasonic-document-upload/deleteDocumentData` 
export const GET_UPLOAD_DATA= `${URL}/panasonic-document-upload/getDocumentDetails` 
//Business User Routs
export const ADD_REQUEST = `${URL}/panasonic-purchase-indent/submitActionOnPurchaseIndentByUniqueNumber`
export const ACTION_ON_REQUEST = `${URL}/panasonic-purchase-indent/submitActionOnPurchaseIndentByUniqueNumber`
export const GET_REQUEST_WITH_ID = `${URL}/panasonic-purchase-indent/getPurchaseIndentByUniqueNumber`
export const GET_VENDOR_DETAIL_BY_ID = `${URL}/panasonic-purchase-indent/getVendorAllDetailsByUniqueNumber`
export const GET_MRO_USERS = `${URL}/panasonic-purchase-indent/getMROUserDetails`
export const ADD_MRO_USERS_TO_WORKITEM = `${URL}/panasonic-purchase-indent/assignWorkitem`
export const GET_ALL_WORKITEM_NUMBER = `${URL}/panasonic-purchase-indent/getWorkitemNumberDetails`
// QCS Routs
export const GET_QCS= `${URL}/panasonic-purchase-indent/qcs/getQCSData`;
export const ADD_QCS= `${URL}/panasonic-purchase-indent/qcs/addQCSData`;
export const UPDATE_QCS= `${URL}/panasonic-purchase-indent/qcs/addQCSData`;
export const UPDATE_TechnicalRating_QCS= `${URL}/panasonic-purchase-indent/qcs/updateTechnicalRating`;
export const GET_QCS_BY_ID= `${URL}/panasonic-purchase-indent/qcs/getQCSDataById`;
export const DELETE_QCS= `${URL}/panasonic-purchase-indent/qcs/deleteQCSData`;
export const UPDATE_QCS_GSTIN= `${URL}/panasonic-document-upload/updateDocumentGstin`;
// Upload QCS File for filling the form
export const UPLOAD_QCS= `${URL}/panasonic-purchase-indent/qcs/uploadQCSData`;


// Dashboard Routs Base on User HDFC
export const GET_USER_DASHBOARD_DATA= `${URL}/hdfc-service/dashboard`;
export const GET_HSN_DASHBOARD_DATA= `${URL}/hdfc-service/get-all-hsn-sac-details`;
export const GET_DASHBOARD_BAR_CHART_DATA= `${URL}/hdfc-service/get-dashboard-bar-chart`;
export const GET_HSN_DASHBOARD_INVOICE_DATA= `${URL}/hdfc-service/get-hsn-invoices`;
export const GET_BUILDERS_LIST = `${URL}/hdfc-service/get-all-builder`;
export const GET_BUILDERS_DETAILS_LIST = `${URL}/hdfc-service/get-all-builder-details`;
export const ADD_BUILDER = `${URL}/hdfc-service/add-builder`;
export const DELETE_BUILDER = `${URL}/hdfc-service/delete-builder`;
export const GET_PROJECTS_LIST = `${URL}/hdfc-service/get-all-project`;
export const GET_PROJECTS_DETAILS_LIST = `${URL}/hdfc-service/get-all-project-details`;
export const GET_HSN_LIST = `${URL}/hdfc-service/get-all-hsn-sac`;
export const ADD_HSN_SAC = `${URL}/hdfc-service/add-hsn-sac`;
export const DELETE_HSN_SAC = `${URL}/hdfc-service/delete-hsn-sac`;
export const ADD_PROJECT = `${URL}/hdfc-service/add-project`;
export const DELETE_PROJECT = `${URL}/hdfc-service/delete-project`;
export const GET_PROJECTS_DETAILS = `${URL}/hdfc-service/get-project`;
export const GET_BUILDERS_DETAILS = `${URL}/hdfc-service/get-builder`;
export const GET_INVOICE_DETAILS = `${URL}/hdfc-service/get-invoice-details`
export const GET_INVOICE_DOCUMENT = `${URL}/hdfc-service/get-invoice`
export const GET_REQUEST_DATA_WITH_STATUS = `${URL}/panasonic-dashboard/getDetailsAccordingToStatus`
export const GET_FOLDERS_MDM = `${URL}/hdfc-service/get-all-folder`
export const ADD_FOLDERS_MDM = `${URL}/hdfc-service/add-folder`
export const DELETE_FOLDERS_MDM = `${URL}/hdfc-service/delete-folder`
export const UPLOAD_INVOICE_DOCUMENT = `${URL}/hdfc-service/upload-doc`
export const CHAT_WHIT_AI = `${AI}//api/v1/Chatbot`
// Generate the UniqeNumber
export const GET_COMMENT_HISTORY_BY_UNINO = `${URL}/panasonic-purchase-indent/getCommentHistoryByUniqueNumber`
export const GET_UNIQUE_NUMBER = `${URL}/panasonic-purchase-indent/generateUUID`
export const SEND_REMINDER = `${URL}/panasonic-purchase-indent/reminderEmail`
export const GET_REPORTS = `${URL}/panasonic-purchase-indent/getReportDetails`
export const GET_VENDOR_REPORTS = `${URL}/panasonic-purchase-indent/getReportDetailsForVendor`


// MDM
export const GET_DEPARTMENT = `${URL}/panasonic-mdm/getDepartment`
export const ADD_DEPARTMENT = `${URL}/panasonic-mdm/addDepartment`
export const UPDATE_DEPARTMENT = `${URL}/panasonic-mdm/updateDepartmentById`
export const DELETE_DEPARTMENT = `${URL}/panasonic-mdm/deleteDepartmentById`
export const GET_CATEGORY = `${URL}/panasonic-mdm/getCategoryForMDM`
export const GET_ROLE_BASE_CATEGORY = `${URL}/panasonic-mdm/getCategory`
export const ADD_CATEGORY = `${URL}/panasonic-mdm/addCategory`
export const UPDATE_CATEGORY = `${URL}/panasonic-mdm/updateCategoryById`
export const DELETE_CATEGORY = `${URL}/panasonic-mdm/deleteCategoryById`
export const GET_SUB_CATEGORY_BY_CATEGORYID = `${URL}/panasonic-mdm/getSubCategoryByCategory`
export const GET_SUB_CATEGORY = `${URL}/panasonic-mdm/getSubCategory`
export const ADD_SUB_CATEGORY = `${URL}/panasonic-mdm/addSubCategory`
export const UPDATE_SUB_CATEGORY = `${URL}/panasonic-mdm/updateSubCategoryById`
export const DELETE_SUB_CATEGORY = `${URL}/panasonic-mdm/deleteSubCategoryById`
export const GET_QCS_MDM = `${URL}/panasonic-mdm/getMdmByType`
export const ADD_QCS_MDM = `${URL}/panasonic-mdm/addMDM`
export const UPDATE_QCS_MDM = `${URL}/panasonic-mdm/updateMDM`
export const DELETE_QCS_MDM = `${URL}/panasonic-mdm/deleteMDM`
export const GET_USERS = `${URL}/panasonic-mdm/getUser`
export const GET_USERS_WITH_ROLE = `${URL}/panasonic-mdm/getUserByRole`
export const ADD_USERS = `${URL}/panasonic-mdm/addUser`
export const UPDATE_USERS = `${URL}/panasonic-mdm/updateUserById`
export const DELETE_USERS = `${URL}/panasonic-mdm/deleteUserById`
export const GET_ROLE = `${URL}/panasonic-mdm/getRole`  
export const ADD_ROLE = `${URL}/panasonic-mdm/addRole`
export const UPDATE_ROLE = `${URL}/panasonic-mdm/updateRole`
export const DELETE_ROLE = `${URL}/panasonic-mdm/deleteRole`
export const GET_VENDOR_EXPIRED_FILE = `${URL}/panasonic-mdm/getTptAgreementDetailsByGSTIN`
export const GET_HOD_USERS = `${URL}/panasonic-mdm/getUsersAndHodByDepartment`



// HDFC Projects

export const GET_BUILDERSL = `${URL}/hdfc-loan/builders`


export const getCaptcha = async () => {
    try {
      const { data } = await axios.get(GET_CAPTCHA, {}, );
      return data;
    } catch (error) {
      throw error;
    }
  };