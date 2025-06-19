import { useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardFooter, CardTitle } from "../ui/card";
import { cn } from "../../lib/utils";
import { Input } from "../ui/input";
import { CircleX, Navigation, X } from "lucide-react";
import { usePostMutation } from "../../hooks/use-mutation";
import { CHAT_WHIT_AI } from "../../lib/endpoint";
import ChatImg from '../../assets/chat.svg'
import { Skeleton } from "../ui/skeleton";

type Chat = {type: 'sender' | 'reciever', message: string, id:number, isSuccess: boolean}

type MutationResponse = {
    timeStamp: number | Date;
    data: {
        response: {
            input: string,
            result: string
        }
    };
    message: null;
    isSuccess: boolean;
    statusCode: number;
}

type Props = {};

function ChatComponent({}: Props) {
    const [openChat, handleChatState] = useReducer(
        (state): boolean => !state,
        false
      )
      const scrollAreaRef = useRef<HTMLDivElement>(null);
      
      const [animateUi,setAnimateUi] = useState('')
      const [chats,setChats] = useState<Chat[]>([])
      const [userChatInput,setUserChatInput] = useState<string>("")

      const {data,isPending,mutate} = usePostMutation<MutationResponse>({
        queryKey: 'chat-bot',
        url: CHAT_WHIT_AI,
      })
      

      const handleUserChatChange = (e:any) => {
        const value = e.target.value;
        setUserChatInput(value)
      }
      const handleChatSubmit = useCallback(() => {
        const chatShap: Chat = {
            message: userChatInput,
            type: 'sender',
            id: chats.length + 1,
            isSuccess: true
        }
        setChats((prev:Chat[]) => ([...prev,chatShap]))
        setUserChatInput("")
        mutate({input: userChatInput})
      },[chats,userChatInput])

      useMemo(()=>{
        if(data && data?.statusCode === 200){

            if(data.isSuccess){
                const chatShap: Chat = {
                    message: data?.data?.response?.result,
                    type: 'reciever',
                    isSuccess: true,
                    id: chats.length + 1
                    
                }
                setChats((prev:Chat[]) => ([...prev,chatShap]))
            }else{
                const chatShap: Chat = {
                    message: data?.message ?? '',
                    type: 'reciever',
                    isSuccess: false,
                    id: chats.length + 1
                }
                setChats((prev:Chat[]) => ([...prev,chatShap]))
            }
        }
      },[data])

      useEffect(() => {
        if(openChat){

            setTimeout(() => {
                setAnimateUi("-translate-y-36  opacity-100 duration-500 delay-100") 
            }, 100);
        }else{
            setTimeout(() => {
                setAnimateUi("translate-y-36  opacity-0 duration-500 delay-100")
            }, 100);
            setTimeout(() => {
                setAnimateUi(" translate-y-36 translate-x-96  opacity-0 duration-500 delay-100")
            }, 200);
        }
      },[openChat])

      // Scroll to bottom when chats change
      useEffect(() => {
        if (scrollAreaRef.current) {
            console.log(scrollAreaRef.current.scrollHeight);
            
          scrollAreaRef.current.scrollTo({
            top: scrollAreaRef.current.scrollHeight,
            behavior: 'smooth' // or 'auto'
          });   
        }
      }, [chats]); // Dependency on chats array
  return (
<div className="fixed bottom-0 right-0 z-50 flex justify-end items-end p-3 gap-2 ">

<Card className={cn("hidden absolute w-[32rem] h-[30rem] opacity-0 rotate-0 -bottom-32 right-[3.5rem] border border-black", `block ${animateUi}`)}>

        <CardTitle className="w-full flex justify-between items-center p-2">
           <div className="flex justify-start items-center gap-2 ">
        <Avatar onClick={handleChatState} className="bg-primary">
        <AvatarImage src="https://github.com/shadcn.png" className="bg-background"/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col justify-start items-start">
        <p className="text-sm font-semibold">Chat With As</p>
        <p className="text-xs text-muted-foreground">We are here to help you.</p>
      </div>
            </div> 
            <Button onClick={handleChatState} variant={'ghost'} className="rounded-full " size={'sm'}><X className="w-4 h-4"/></Button>
        </CardTitle>
        <CardContent className="w-full h-[calc(100%-26%)] p-2 bottom-0">
                <div ref={scrollAreaRef} className="w-full h-full scroll-smooth overflow-y-scroll">
                    <div  className="w-full min-h-[16.7rem] flex flex-col justify-end gap-3 items-end px-1">
                    
                    {chats?.map((item:Chat) => (
                        <div className={cn("w-full h-auto flex justify-center items-center gap-2",item?.type === 'sender' ? 'pl-6' : 'pr-6')}> 
                        <div key={item.id} className={cn("w-full min-h-5 rounded-lg shadow self-end  p-1.5 text-[14px] font-semibold text-start ", item?.type === 'sender' ? ' bg-primary text-background' : 'self-start bg-muted text-black ',item?.message.length>0 && item?.type === 'reciever' && !item?.isSuccess && "bg-red-100")}>
                           {item.message} 
                        </div>{item?.message.length>0 && item?.type === 'reciever' && !item?.isSuccess && (<CircleX className="text-primary" />)}
                        </div>
                    ))}
                    {isPending && <div className={cn("w-full h-7 pr-6")}>
                        <Skeleton className="w-11/12 h-full rounded-lg shadow"/>
                        </div>}
                    </div>
                </div>

            
        </CardContent>
        <CardFooter className="w-full gap-2">
            <Input name="user-chat" value={userChatInput} onChange={handleUserChatChange} onKeyDown={(e:React.KeyboardEvent<HTMLInputElement>) => {
                if(e.key === 'Enter' && !e.shiftKey){
                    e.preventDefault()
                    handleChatSubmit()
                }
            }} className="w-full h-8" />
            <Button disabled={!userChatInput} onClick={handleChatSubmit} size={'sm'}><Navigation /></Button>
        </CardFooter>
      </Card>
      <Avatar onClick={handleChatState} className="">
        <AvatarImage src={ChatImg} className="border-2 border-primary rounded-full"/>
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
}

export default ChatComponent;
