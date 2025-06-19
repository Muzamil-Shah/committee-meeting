import { Loader, Upload } from 'lucide-react'

type Props = {}

function UploadLoader({}: Props) {
  return (
    <div className='flex justify-center items-center gap-2 text-xs'><Upload /> <span className='flex justify-center items-center gap-2 animate-pulse'>Uploading...<Loader className='animate-spin' /></span></div>
  )
}

export default UploadLoader