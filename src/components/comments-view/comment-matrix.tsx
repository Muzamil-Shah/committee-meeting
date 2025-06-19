import { cn } from "../../lib/utils";

type CommentProps = {
    comment: string;
    createdBy: string;
    createdOn?: string;
    action?: "Approved" | "Query Raised" | "Rejected" | string; // You can adjust this based on possible actions
};

const CommentMatrix = ({ comment, createdBy, createdOn, action }: CommentProps) => {
    return (
        <div className="border border-red-100 rounded-md p-2 my-2">
            {/* Comment Text */}
            <p className="text-gray-500 bg-gray-100 dark:bg-gray-900 p-3 rounded-lg mb-2">
                {comment}
            </p>

            {/* Comment Details */}
            <div className="flex justify-between mx-2">
                <div>
                    <span>{createdBy}</span>
                    <span>{createdOn ? ` | ${createdOn}` : ""}</span>
                </div>

                {/* Action Badge */}
                <div>
                    {action && (
                        <span
                            className={cn(
                                "font-semibold px-3 pb-[3px] ml-2 text-[13px] text-white rounded-full",
                                action === "Approved"
                                    ? "bg-[#34A853]"
                                    : action === "Query Raised"
                                    ? "bg-[#FF9800]"
                                    : action === "Rejected"
                                    ? "bg-red-500"
                                    : "bg-gray-500"
                            )}
                        >
                            {action}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommentMatrix;
