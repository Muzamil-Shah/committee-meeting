import React, { memo } from "react";
import { MemoizedFieldComponent } from "../../../components/filter-component-view";
import { status, subStatus } from "../../../lib/constants";
import { User } from "../../../contexts/user-context";

type Props = {
  setTAPId: React.Dispatch<React.SetStateAction<Record<string, unknown>>>;
  user: User;
  formData: any;
};

function TAPDetailsView({ setTAPId, formData, user }: Props) {
  return (
    <div className="w-full rounded-xl border p-3 flex flex-col justify-start items-start space-y-3">
      <h3 className="text-sm font-medium">Enter TAP Details</h3>
      <div>
        {["MRO"]?.includes(user?.role!) &&
        formData?.status === status?.vendorCodeCreated &&
        formData?.subStatus === subStatus?.pendingAtMRO ? (
          <MemoizedFieldComponent
            field={{
              name: "tapId",
              fieldType: "text",
              label: "TAP ID",
              required: false,
              placeholder: "",
            }}
            setFormData={setTAPId}
            key={1}
          />
        ) : (
          <MemoizedFieldComponent
            field={{
              name: "tapId",
              fieldType: "text",
              label: "TAP ID",
              required: false,
              placeholder: "",
              disabled: true,
            }}
            setFormData={setTAPId}
            key={1}
          />
        )}
      </div>
    </div>
  );
}

export default memo(TAPDetailsView);
