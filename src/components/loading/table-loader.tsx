import { Skeleton } from "../ui/skeleton";

type Props = {};

function TableLoader({}: Props) {
  return (
    <div className="w-full h-96  space-y-3">
        <div className="w-full flex justify-between items-center">
            <Skeleton className="w-3/12 h-7" />
            <div className="w-8/12 flex justify-end items-center gap-2">
            <Skeleton className="w-5/12 h-7" />
            <Skeleton className="w-5/12 h-7" />
            </div>
        </div>
      <div className="w-full flex flex-col justify-start items-start gap-1 rounded-xl border shadow">
      <Skeleton className="w-full h-10 " />
        {Array(7)
          ?.fill(null)
          ?.map((_: any, i: number) => (
            <Skeleton key={i} className="w-full h-10 rounded-md" />
          ))}
      </div>
    </div>
  );
}

export default TableLoader;
