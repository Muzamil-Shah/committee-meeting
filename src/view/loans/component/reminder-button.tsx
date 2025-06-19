import { memo, useCallback, useMemo } from 'react';
import { Button } from '../../../components/ui/button'
import { Bell } from 'lucide-react';
import { usePostMutation } from '../../../hooks/use-mutation';
import { SEND_REMINDER } from '../../../lib/endpoint';
import { toast } from '../../../components/ui/use-toast';
import { MutationResponse } from '../platform-design/qcs-crud-form-manager';
import { cn } from '../../../lib/utils';

type Props = {
  uniqueNumber: string
}

const ReminderButton = ({uniqueNumber}: Props) => {
  const sendReminder = usePostMutation<MutationResponse>({
    queryKey: 'send-reminder',
    url: SEND_REMINDER
  })

    const handleSendReminder = useCallback(()=>{
      sendReminder?.mutate({uniqueNumber})
    },[uniqueNumber])
    
    useMemo(() => {
      const isSuccess = sendReminder?.data?.data?.msg === "success";
      const isFail = sendReminder?.data?.data?.msg === "failed";
      if(isSuccess){
        toast({
          bgColor: 'bg-green-500',
          title: 'Successful !',
          description: 'A reminder email has been successfully sent to the user.'
        })
      }else if(isFail){
        toast({
          bgColor: 'bg-red-500',
          title: 'Failed !',
          description: 'We tried to send a reminder email to user but something went wrong'
        })
      }
    },[sendReminder?.data?.data])
    
  return (
    <Button onClick={handleSendReminder} disabled={sendReminder?.isPending} type='button' size={'sm'} className='flex justify-center items-center gap-1'><Bell  className={cn('w-5 h-5', sendReminder?.isPending && 'animate-pulse')}/><span className='hidden md:flex '>Send Reminder</span></Button>
  )
}

export default memo(ReminderButton)