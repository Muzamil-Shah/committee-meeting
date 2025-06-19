import { memo } from "react";
import { MemoizedFieldComponent } from "../../../components/filter-component-view";
import { User } from "../../../contexts/user-context";
import { areArraysEqualUnordered } from "../../../lib/utils";
import { status, subStatus } from "../../../lib/constants";

type Props = {
  user: User;
  justification: string | null;
  setFormData: React.Dispatch<
    React.SetStateAction<Partial<Record<string, unknown>>>
  >;
  preferedVendor: number[];
  findPreferedQCSIds: number[];
  mroPreferedVendor: number[];
  formDataStatus: string;
  formDataSubStatus: string;
};

function JustificationView({
  setFormData,
  user,
  justification,
  findPreferedQCSIds,
  preferedVendor,
  mroPreferedVendor,
  formDataStatus,
  formDataSubStatus,
}: Props) {
  return (
    <div className="flex flex-col justify-start items-start gap-2">
      {justification ? (
        (!areArraysEqualUnordered(
          (findPreferedQCSIds as any[]) ?? [],
          (preferedVendor as any[]) ?? []
        ) ||
          !areArraysEqualUnordered(
            (mroPreferedVendor as any[]) ?? [],
            (preferedVendor as any[]) ?? []
          )) &&
        formDataStatus === status?.scopeFinalized &&
        formDataSubStatus === subStatus.pendingAtInitiator ? (
          <div className="w-full space-y-3">
            <MemoizedFieldComponent
              field={{
                name: "justification",
                label: "Justification",
                placeholder: "Write your Justification here",
                fieldType: "textarea",
              }}
              setFormData={setFormData}
            />

<div className="flex flex-col justify-start items-start gap-2">
            <h3 className="text-xs font-medium">
              Disclaimer :{" "}
              <span className="text-red-500">
                {" "}
                There will not be any subjective approval
              </span>
            </h3>
            <p>
              Along with justification remarks please provide justification
              documents.
            </p>
          </div>
          </div>
        ) : (
          <>
            <h3 className="text-xs font-medium">
              Justification <span className="text-red-500">*</span>
            </h3>
            <p className="w-full rounded-xl border bg-secondary p-2 text-xs ">
              {justification}
            </p>
            <div className="flex flex-col justify-start items-start gap-2">
            <h3 className="text-xs font-medium">
              Disclaimer :{" "}
              <span className="text-red-500">
                {" "}
                There will not be any subjective approval
              </span>
            </h3>
            <p>
              Along with justification remarks please provide justification
              documents.
            </p>
          </div>
          </>
        )
      ) : ["User"]?.includes(user?.role) &&
        (!areArraysEqualUnordered(
          (findPreferedQCSIds as any[]) ?? [],
          (preferedVendor as any[]) ?? []
        ) ||
          !areArraysEqualUnordered(
            (mroPreferedVendor as any[]) ?? [],
            (preferedVendor as any[]) ?? []
          )) ? (
        <div className="w-full space-y-3">
          <MemoizedFieldComponent
            field={{
              name: "justification",
              label: "Justification",
              placeholder: "Write your Justification here",
              fieldType: "textarea",
            }}
            setFormData={setFormData}
          />

          <div className="flex flex-col justify-start items-start gap-2">
            <h3 className="text-xs font-medium">
              Disclaimer :{" "}
              <span className="text-red-500">
                {" "}
                There will not be any subjective approval
              </span>
            </h3>
            <p>
              Along with justification remarks please provide justification
              documents.
            </p>
          </div>
        </div>
      ) : (
        <>
          <h3 className="text-xs font-medium">
            Justification <span className="text-red-500">*</span>
          </h3>
          <p className="w-full  p-2 text-xs ">N/A</p>
        </>
      )}
    </div>
  );
}

export default memo(JustificationView);
