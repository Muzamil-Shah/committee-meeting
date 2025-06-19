import { Skeleton } from "../ui/skeleton";

type Props = {};

function CommentLoading({}: Props) {
  return (
    <div className="w-full h-64 flex flex-col justify-start items-start gap-1  space-y-3">
      {Array(3)
        ?.fill(null)
        ?.map((_: any, i: number) => (
          <Skeleton key={i} className="w-full h-24 rounded-xl" />
        ))}
    </div>
  );
}

export default CommentLoading;
