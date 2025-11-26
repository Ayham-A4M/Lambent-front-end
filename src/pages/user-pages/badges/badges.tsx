import useGET from '@/hooks/useGet'
import {badgesObj} from "./badgesMap";
import { Card, CardDescription, CardHeader } from '@/components/ui/card';
import { FaLock } from "react-icons/fa";
const Badges = () => {
    const {data,isLoading}=useGET(`/api/user/badges`,["badges"]);
  return (
    <div className='grid gap-4 grid-cols-[repeat(auto-fit,minmax(170px,1fr))]'>
        {
            data?.map((e:any)=>(
               <Card className='rounded-2xl w-full  max-w-[170px] md:max-w-[200px] relative'>
                {
                  !e.completed &&
                  <FaLock className='size-4 absolute top-2 right-2 text-zinc-600 dark:text-zinc-400'/>
                }
                    <CardHeader className='items-center justify-center'>
                         <img src={e&&badgesObj[e?.iconName]} alt="" className={`size-24 ${e.completed?"":"opacity-50"}`} />
                    </CardHeader>
                    <CardDescription className='text-center px-2'>
                        {e?.description}
                    </CardDescription>
               </Card>
            ))
        }
    </div>
  )
}

export default Badges