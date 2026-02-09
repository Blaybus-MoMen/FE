import { useState } from "react";
import ReportTabMenu from "@/features/report/ui/ReportTabMenu";
import ReportDailyTodoList from "@/features/report/ui/ReportDailyTodoList";
import ReportWeeklyTodoList from "@/features/report/ui/ReportWeeklyTodoList";
import ReportMonthlyTodoList from "@/features/report/ui/ReportMonthlyTodoList";

export type Tab = "monthly" | "weekly" | "daily"

const ReportPage = () => {
    const [activeTab, setActiveTab] = useState<Tab>("daily")
    return (
        <div className="h-full w-full flex flex-col min-h-0 bg-[#e1ecff]">
            <ReportTabMenu activeTab={activeTab} setActiveTab={setActiveTab} />
            {activeTab === "monthly" && (
                <ReportMonthlyTodoList />
            )}
            {activeTab === "weekly" && (
                <ReportWeeklyTodoList />
            )}
            {activeTab === "daily" && (
                <ReportDailyTodoList />
            )}
        </div >
    )
}

export default ReportPage;