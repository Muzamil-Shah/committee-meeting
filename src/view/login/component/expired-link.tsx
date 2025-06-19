import { TriangleAlert } from "lucide-react"
import { Button } from "../../../components/ui/button"


type Props = {}

function ExpiredLinkView({}: Props) {
  return (
    <div className='w-full h-[calc(100%-20%)] flex flex-col justify-center items-center gap-2'>
        <div className="w-10 h-10 rounded-full flex justify-center items-center bg-primary text-white p-2">
            <TriangleAlert />
        </div>
        <div className="flex flex-col justify-center items-center gap-1">
            <h3 className="font-semibold text-base">Expired Link</h3>
            <p className="text-sm text-slate-500 text-center">This link has expired. Please contact administrator for extension & submission</p>
        </div>
        <div className="flex justify-center items-center gap-1">
            <Button variant={'outline'}>Contact Support</Button>
            <Button variant={'default'}>Refresh Page</Button>
        </div>
    </div>
  )
}

export default ExpiredLinkView