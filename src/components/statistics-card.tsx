import type { ReactElement, ReactNode } from "react"
import { Card, CardHeader, CardContent } from "./ui/card"
const StatisticsCard = ({ title, value, children, icon }: { title: string, value: number | string, icon: ReactElement, children?: ReactNode }) => {
    return (
        <Card className={`flex flex-col gap-3 bg-card`}>
            <CardHeader>
                <h1 className="text-2xl font-medium ">{title}</h1>
                <div className="text-3xl">
                    {icon && icon}
                </div>
            </CardHeader>
            <CardContent>
                {value && <span className="text-xl">{value}</span>}
            </CardContent>

        </Card>
    )
}

export default StatisticsCard