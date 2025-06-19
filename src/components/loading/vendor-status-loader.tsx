import { Skeleton } from "../ui/skeleton";

type Props = {};

function VendorStatusLoader({}: Props) {
  return (
    <div className="w-full  flex flex-col justify-start items-start gap-1  space-y-3">
        <Skeleton key={1} className="w-full h-32 rounded-xl" />
    </div>
  );
}

export default VendorStatusLoader;
