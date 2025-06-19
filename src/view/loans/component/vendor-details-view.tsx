import { memo, useCallback, useMemo, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../../../components/ui/collapsible";
import { Button } from "../../../components/ui/button";
import {
  ChartSpline,
  ChevronDown,
  ChevronsUpDown,
  Eye,
  Printer,
} from "lucide-react";
import { documentTypeLabels } from "../../../lib/constants";
import { Link } from "react-router-dom";
import { useSidebarOpen } from "../../../contexts/SidebarOpen";

// Types
interface Props {
  // uniqueNumber: string;
  vData: any;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
  setOpenFullscreen: React.Dispatch<React.SetStateAction<boolean>>;
  isPreCheck: boolean;
}

interface Section {
  title: string;
  // data: any;
  renderContent: () => JSX.Element;
}

export const RenderBasicDetails = (vData: any) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7">
    <DetailItem label="Vendor Name" value={vData?.vendorName} />
    <DetailItem label="Email Id" value={vData?.emailId} />
    <DetailItem
      label="Alternative E-mail Id"
      value={vData?.alternativeEmailId}
    />
    <DetailItem
      label="Contact Person Name"
      value={vData?.contactPersonName}
    />
    <DetailItem
      label="Contact Person Phone No."
      value={vData?.contactPersonPhoneNo}
    />
    <DetailItem
      label="Alternative Contact No."
      value={vData?.alternateContactNo}
    />
    <DetailItem
      label="Contact Person E-mail ID"
      value={vData?.contactPersonEmailId}
    />
    <DetailItem
      label="Contact Person Alternate E-mail ID"
      value={vData?.contactPersonAlternateEmailId}
    />
    <DetailItem
      label="Authorized Person Name"
      value={vData?.authorizedPersonName}
    />
    <DetailItem
      label="Authorized Person E-mail ID"
      value={vData?.authorizedPersonEmailId}
    />
    <DetailItem
      label="Authorized Person Phone No"
      value={vData?.authorizedPersonPhoneNo}
    />
    <DetailItem
      label="Payment in favour of"
      value={vData?.paymentInFavourOf}
    />
    <DetailItem
      label="Nature of Goods/Services"
      value={vData?.natureOfGoodsServices}
    />
    <DetailItem label="Aadhaar Number" value={vData?.aadharNumber} />
    <DetailItem label="Service Tax Number" value={vData?.serviceTaxNo} />
    <DetailItem label="TIN No./GST No." value={vData?.tinNoGstNo} />
    <DetailItem label="MSME Number" value={vData?.msmeNumber} />
    <DetailItem label="PAN Number" value={vData?.panNo} />
    <DetailItem label="CIN Number" value={vData?.cinNumber} />
  </div>
);
export const RenderVendorQuestionnaireDetails = (vData: any) => (
  <div>
    <div className="bg-gray-200 rounded-lg">
      <h4 className="font-medium px-2 py-1">Questionnaire</h4>
    </div>
    <div className="p-[0.2px] bg-gray-400 w-full mb-4 mt-2" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
      <DetailItem
        label="How old is the entity?"
        value={vData?.vendorQuestionnaireDto?.entityAgeYears}
      />
      <DetailItem
        label="What is the type of entity?"
        value={vData?.vendorQuestionnaireDto?.entityType}
      />
      <DetailItem
        label="Does the Administrative Service Provider has a valid GSTIN Certificate?
"
        value={vData?.vendorQuestionnaireDto?.validGstinCertificate}
      />
      <DetailItem
        label="When did the entity register for the GSTIN Certificate ? (Date of Validity)"
        value={vData?.vendorQuestionnaireDto?.gstinRegistrationDate}
      />
      <DetailItem
        label="Are the audited financial statements available for last three Financial Years?"
        value={
          vData?.vendorQuestionnaireDto?.auditedFinancialStatementsLast3Years
        }
      />
      <DetailItem
        label="How much are the short term and long term borrowings of the entity in last Financial Year ?"
        value={vData?.vendorQuestionnaireDto?.borrowingsLastFinancialYear}
      />
      <DetailItem
        label="Is the net profit of the firm consistent from last few years?"
        value={vData?.vendorQuestionnaireDto?.consistencyNetProfit}
      />
      <DetailItem
        label="Who are the current directors of the ASP?"
        value={vData?.vendorQuestionnaireDto?.currentDirectors}
      />
      <DetailItem
        label="Who are the current shareholders of the ASP?"
        value={vData?.vendorQuestionnaireDto?.currentShareholders}
      />
      <DetailItem
        label="Was there any change in the management of ASP in last one year?"
        value={vData?.vendorQuestionnaireDto?.changeInManagementLastYear}
      />
      <DetailItem
        label="Proprietor / Partner / Director of ASP company associated with any other company."
        value={vData?.vendorQuestionnaireDto?.associatedWithPanasonic}
      />
      <DetailItem
        label="Credit Rating score of the entity CIBIL score in case of Proprietorship firm"
        value={vData?.vendorQuestionnaireDto?.creditRatingScore}
      />
    </div>
    <div className="bg-gray-200 rounded-lg mt-10">
      <h4 className="font-medium px-2 py-1">Financial Controls</h4>
    </div>
    <div className="p-[0.2px] bg-gray-400 w-full mb-4 mt-2" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
      <DetailItem
        label="Are there internal financial controls to monitor all payments and transactions?"
        value={
          vData?.vendorFinanceOperationExperianceDto?.internalFinancialControls
        }
      />
      <DetailItem
        label="Does the ASP receives payment from its clients/ customers in cash?"
        value={vData?.vendorFinanceOperationExperianceDto?.paymentMode}
      />
      <DetailItem
        label="Does the ASP provides cash payments to suppliers ?"
        value={vData?.vendorFinanceOperationExperianceDto?.aspPaymentMode}
      />
    </div>
    <div className="bg-gray-200 rounded-lg mt-10">
      <h4 className="font-medium px-2 py-1">Size and Scale of Operations</h4>
    </div>
    <div className="p-[0.2px] bg-gray-400 w-full mb-4 mt-2" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
      <DetailItem
        label="In how many states in India does the entity operates?"
        value={vData?.vendorFinanceOperationExperianceDto?.statesOfOperation}
      />
      <DetailItem
        label="Does the entity has global presence ?"
        value={vData?.vendorFinanceOperationExperianceDto?.globalPresence}
      />
      <DetailItem
        label="How many employees are employed in the Administrative Service Provider?"
        value={vData?.vendorFinanceOperationExperianceDto?.numberOfEmployees}
      />
      <DetailItem
        label="What is the average turnover of the entity in last three Financial Years?"
        value={vData?.vendorFinanceOperationExperianceDto?.averageTurnover}
      />
      <DetailItem
        label="Proof of Establishment for current operational office address"
        value={vData?.vendorFinanceOperationExperianceDto?.proofOfEstablishment}
      />
      <DetailItem
        label="Does the entity has a dedicated operational office in a commercial property?"
        value={
          vData?.vendorFinanceOperationExperianceDto?.dedicatedOperationalOffice
        }
      />
    </div>
    <div className="bg-gray-200 rounded-lg mt-10">
      <h4 className="font-medium px-2 py-1">Experience</h4>
    </div>
    <div className="p-[0.2px] bg-gray-400 w-full mb-4 mt-2" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
      <DetailItem
        label="In past has ASP provided similar type of services which shall be provided to Panasonic India to any other clients ?"
        value={
          vData?.vendorFinanceOperationExperianceDto?.similarServicesProvided
        }
      />
      <DetailItem
        label="Since when ASP is providing services (In reference to (In past has ASP provided similar type of services which shall be provided to Panasonic Life Solutions to any other clients ?)) in the market ?"
        value={
          vData?.vendorFinanceOperationExperianceDto?.serviceProvisionDuration
        }
      />
      <DetailItem
        label="How many clients are associated with ASP in reference to (In past has ASP provided similar type of services which shall be provided to Panasonic Life Solutions to any other clients ?)?"
        value={vData?.vendorFinanceOperationExperianceDto?.numberOfClients}
      />
      <DetailItem
        label="Has ASP executed any similar kind of projects in reference to (In past has ASP provided similar type of services which shall be provided to Panasonic Life Solutions to any other clients ?) with their other clients with expected work order value + 25% of PI Project value?"
        value={
          vData?.vendorFinanceOperationExperianceDto?.similarProjectsExecuted
        }
      />
      <DetailItem
        label="How much approximate revenue is generated in last last financial year by the entity, through services in reference to (In past has ASP provided similar type of services which shall be provided to Panasonic Life Solutions to any other clients ?) ?"
        value={vData?.vendorFinanceOperationExperianceDto?.revenueGenerated}
      />
      <DetailItem
        label="Provide 3 client in reference to (In past has ASP provided similar type of services which shall be provided to Panasonic Life Solutions to any other clients ?) ?"
        value={vData?.vendorFinanceOperationExperianceDto?.clientReference}
      />
      <DetailItem
        label="Provide 3 supplier references  in reference to (In past has ASP provided similar type of services which shall be provided to Panasonic Life Solutions to any other clients ?) ?"
        value={vData?.vendorFinanceOperationExperianceDto?.supplierReference}
      />
    </div>
    <div className="bg-gray-200 rounded-lg mt-10">
      <h4 className="font-medium px-2 py-1">
        Quantum of Business with Panasonic
      </h4>
    </div>
    <div className="p-[0.2px] bg-gray-400 w-full mb-4 mt-2" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
      <DetailItem
        label="Has the Administrative Service Provider previously provided services to PI?"
        value={
          vData?.vendorQuantumControlsImportantInformationDto
            ?.previousServicesToPI
        }
      />
      <DetailItem
        label="If yes, for how many projects has the Administrative Service Provider provided services?"
        value={
          vData?.vendorQuantumControlsImportantInformationDto
            ?.numProjectsProvidedToPI
        }
      />
    </div>
    <div className="bg-gray-200 rounded-lg mt-10">
      <h4 className="font-medium px-2 py-1">
        Anti-Bribery and Anti-Corruption (ABAC) Controls
      </h4>
    </div>
    <div className="p-[0.2px] bg-gray-400 w-full mb-4 mt-2" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
      <DetailItem
        label="Does the entity have documented policies and procedures for anti-bribery and anti-corruption?"
        value={
          vData?.vendorQuantumControlsImportantInformationDto
            ?.documentedAbacPolicies
        }
      />
      <DetailItem
        label="Are the policies communicated at all levels?"
        value={
          vData?.vendorQuantumControlsImportantInformationDto
            ?.policiesCommunicatedAllLevels
        }
      />
      <DetailItem
        label="Does the Administrative Service Provider imparts ABAC training to its on-roll/ off-roll employees?"
        value={
          vData?.vendorQuantumControlsImportantInformationDto
            ?.abacTrainingProvidedEmployees
        }
      />
      <DetailItem
        label="Is there specific Gift policy, Whistle Blower policy formulated in the Administrative Service Provider?"
        value={
          vData?.vendorQuantumControlsImportantInformationDto
            ?.specificGiftWhistlePolicies
        }
      />
    </div>
    <div className="bg-gray-200 rounded-lg mt-10">
      <h4 className="font-medium px-2 py-1">Other Important Information</h4>
    </div>
    <div className="p-[0.2px] bg-gray-400 w-full mb-4 mt-2" />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
      <DetailItem
        label="Is any PI's current/ former employee is/ was associated with the ASP ?"
        value={
          vData?.vendorQuantumControlsImportantInformationDto
            ?.assocWithPICurrentFormerEmp
        }
      />
      <DetailItem
        label="Does any of the  entity maintains relations with government authorities / political parties?"
        value={
          vData?.vendorQuantumControlsImportantInformationDto
            ?.maintainsRelWithGovtAuth
        }
      />
      <DetailItem
        label="Is the entity associated with government authorities / PSU/ NGOs?"
        value={
          vData?.vendorQuantumControlsImportantInformationDto
            ?.assocWithGovtAuthPsuNgo
        }
      />
      <DetailItem
        label="Does ASP in the past or currently associated with any other ASP or Vendor or Customer of PI?"
        value={
          vData?.vendorQuantumControlsImportantInformationDto
            ?.assocWithOtherAspVendorPI
        }
      />
      <DetailItem
        label="Does any KMP ( Key management personnel) or their family members were or are involved in similar business or any business with Panasonic?"
        value={
          vData?.vendorQuantumControlsImportantInformationDto
            ?.kmpFamilyInvolvedWithPI
        }
      />
      <DetailItem
        label="Has the ASP come across any corruption or any other malpractice within their organization?"
        value={
          vData?.vendorQuantumControlsImportantInformationDto
            ?.encounteredCorruptionMalpractice
        }
      />
      <DetailItem
        label="Does the ASP/ its KMP/ sister concerns has any ongoing criminal litigation against the company or its officials / PC Act or any other anti-corruption laws ?"
        value={
          vData?.vendorQuantumControlsImportantInformationDto
            ?.ongoingCriminalLitigationCompany
        }
      />
      <DetailItem
        label="Was the entity ever blacklisted by Panasonic India / Panasonic India entites /  any other client/ any regulatory body?"
        value={
          vData?.vendorQuantumControlsImportantInformationDto
            ?.everBlacklistedByPIOrRegBody
        }
      />
    </div>
  </div>
);

const VendorDetailsView = ({
  vData,
  isOpen,
  setIsOpen,
  setOpenFullscreen,
  isPreCheck
}: Props) => {
  // const [isOpen, setIsOpen] = useState<boolean>(true);
  const { isSidebarOpen, toggleSidebar } = useSidebarOpen();
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  const getDocumentTypeLabel = (type: keyof typeof documentTypeLabels) => {
    return documentTypeLabels[type] || type;
  };

  // Toggle section open/close
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handlePrintScreen = useCallback(async () => {
    if (isSidebarOpen) {
      toggleSidebar();
    }
    setOpenFullscreen(true);
    setTimeout(() => window.print(), 1000);
  }, []);

  useMemo(() => {
    if (isOpen) {
      setExpandedSections({
        "Basic Details": true,
        "Address Details": true,
        "Bank Details": true,
        Questionnaire: true,
        "Document Details": true,
      });
    }
  }, [isOpen]);

  // Utility for rendering basic details
  

  // Utility for rendering address details
  const renderAddressDetails = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7">
      {vData?.addressList?.map((address: any) => (
        <>
          <DetailItem label="Country" value={address?.countryName} />
          <DetailItem label="State" value={address?.stateName} />
          <DetailItem label="City" value={address?.city} />
          <DetailItem label="Postal Code" value={address?.postalCode} />
          <DetailItem
            label="Address: Street/House Number"
            value={address?.streetHouseNumber}
          />
          <DetailItem label="Street 2" value={address?.street2} />
          <DetailItem label="Street 3" value={address?.street3} />
          {/* <DetailItem label="Status" value={address?.status} />
                    <DetailItem label="Created By" value={address?.createdBy} />
                    <DetailItem label="Created On" value={formatDate(address?.createdOn)} />
                    <DetailItem label="Modified By" value={address?.modifiedBy} />
                    <DetailItem label="Modified On" value={formatDate(address?.modifiedOn)} /> */}
        </>
      ))}
    </div>
  );

  // Utility for rendering address details
  const renderBankDetails = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-7">
      {vData?.bankList?.map((bank: any) => (
        <>
          <DetailItem label="Bank Name" value={bank?.bankName} />
          <DetailItem label="Bank Account No." value={bank?.bankAccountNo} />
          <DetailItem label="IFSC Code" value={bank?.ifscCode} />
          <DetailItem label="SWIFT/BIC" value={bank?.swiftBic} />
          {/* <DetailItem label="Status" value={bank?.status} />
                    <DetailItem label="Created By" value={bank?.createdBy} />
                    <DetailItem label="Created On" value={formatDate(bank?.createdOn)} />
                    <DetailItem label="Modified By" value={bank?.modifiedBy} />
                    <DetailItem label="Modified On" value={formatDate(bank?.modifiedOn)} /> */}
        </>
      ))}
    </div>
  );

  const renderDocumentDetails = () => (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-7">
        {vData?.documentList?.map((doc: any) => (
          <div key={doc} className="text-left cursor-pointer">
            <div className="text-gray-500">
              {getDocumentTypeLabel(doc.documentType)}
            </div>
            {/* <h4 className="font-medium">}</h4> */}
            {/* <button type="button" className="text-left" onClick={()=>handleDocumentView(doc?.docIndex)}>
                            <div className="text-blue-700">{doc?.documentName + "." + doc?.documentExtension}</div>
                        </button> */}
            <div className="w-full rounded-xl p-1 flex justify-between items-center gap-1 bg-secondary">
              <span className="flex justify-end items-center gap-2">
                <ChartSpline className="w-4 h-4" />{" "}
                <span className="text-sm font-medium">
                  {doc?.documentName + "." + doc?.documentExtension}
                </span>
              </span>
              <span className="flex justify-end items-center gap-2">
                <Link
                  target="blank"
                  to={`http://apps.bpaassolutions.com:8080/omnidocs/WebApiRequestRedirection?Application=ViewDocument&cabinetName=forbesprod&sessionIndexSet=false&sessionIndexSet&enableDCInfotrue&S=S&DocumentId=${doc?.docIndex}`}
                >
                  <Eye className="text-blue-500" />
                </Link>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const basicDetailsField = () => RenderBasicDetails(vData);
  const questionnaireField = () => RenderVendorQuestionnaireDetails(vData);

  // Define all sections
  const sections: Section[] = [
    {
      title: "Basic Details",
      // data: vData,
      renderContent: basicDetailsField,
    },
    {
      title: "Address Details",
      // data: vData?.addressList,
      renderContent: renderAddressDetails,
    },
    {
      title: "Bank Details",
      // data: vData?.bankList,
      renderContent: renderBankDetails,
    },
   {
      title: "Questionnaire",
      // data: vData?.vendorQuestionnaireDto,
      renderContent: questionnaireField,
    },
    {
      title: "Document Details",
      renderContent: renderDocumentDetails,
    },
  ];

  return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full border rounded-xl p-2 space-y-2 z-20">
        <CollapsibleTrigger asChild>
          <div className="flex justify-between items-center cursor-pointer">
            <h3>Vendor Details</h3>
            <div className="flex justify-end items-center gap-2">
              <Button
                type="button"
                onClick={() => handlePrintScreen()}
                className="flex justify-center items-center gap-2 "
              >
                <Printer className="w-5 h-5" /> <span>Save as PDF</span>
              </Button>
              <Button type="button" variant="ghost" size="sm">
                <ChevronDown />
              </Button>
            </div>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {sections?.filter(item => !isPreCheck ? item?.title !== "Questionnaire" : item).map((section, index) => (
            <Collapsible
              key={index}
              open={!!expandedSections[section.title]}
              onOpenChange={() => toggleSection(section.title)}
              className="w-full bg-gray-100 p-2 rounded-lg my-2"
            >
              <CollapsibleTrigger asChild>
                <div className="flex justify-between items-center cursor-pointer bg-gray-200 px-2 rounded-lg">
                  <h4 className="font-medium">{section.title}</h4>
                  <Button type="button" variant="ghost" size="sm">
                    <ChevronsUpDown className="h-5 w-5" />
                  </Button>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-4 px-5 py-5">
                {section.renderContent()}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </CollapsibleContent>
      </Collapsible>
  );
};

// Utility Component for Details
const DetailItem = ({ label, value }: { label: string; value: any }) => (
  <div className="w-full flex-col justify-start items-start overflow-hidden">
    <div className="text-gray-500">{label}</div>
    <div className="h-auto font-semibold">{value ?? "---"}</div>
  </div>
);

export default memo(VendorDetailsView);
