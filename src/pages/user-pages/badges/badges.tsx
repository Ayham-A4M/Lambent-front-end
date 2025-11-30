import useGET from "@/hooks/useGet";
import { badgesObj } from "./badgesMap";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { FaLock } from "react-icons/fa";
const Badges = () => {
  const { data, isLoading } = useGET(`/api/user/badges`, ["badges"]);
  return (
    <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(170px,1fr))]">
      {data?.badges?.map((e: any) => (
        <Card className="rounded-2xl w-full justify-between  max-w-[170px] md:max-w-[200px] relative">
          {!e.completed && <FaLock className="size-4 absolute top-2 right-2 text-zinc-600 dark:text-zinc-400" />}
          <div className="space-y-4">
            <CardHeader className="items-center justify-center">
              <img src={e && badgesObj[e?.iconName]} alt="" className={`size-24 ${e.completed ? "" : "opacity-50"}`} />
            </CardHeader>
            <CardDescription className="text-center px-2">{e?.description}</CardDescription>
          </div>
          <CardFooter className="items-center gap-2">
            <div className="w-full rounded-[4px] bg-gray-300 h-1">
              <div className="w-[66%] bg-primary h-full rounded-[4px]"></div>
            </div>
            <span className="text-[.6rem]">66%</span>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default Badges;
