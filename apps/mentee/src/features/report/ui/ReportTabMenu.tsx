import type { Tab } from "@/pages/report/ReportPage"

const ReportTabMenu = ({ activeTab, setActiveTab }: { activeTab: Tab, setActiveTab: (tab: Tab) => void }) => {
    return (
        <div className="flex items-center justify-between border-b border-grayscale-border">
            <button
                className={`text-[16px] flex-1 py-2 border-b-2 -mb-px py-[16px] ${activeTab === "daily"
                    ? "border-primary-blue font-semibold text-grayscale-black"
                    : "border-transparent text-grayscale-dark-gray"
                    }`}
                onClick={() => setActiveTab("daily")}
            >
                일간
            </button>
            <button
                className={`text-[16px] flex-1 py-2 border-b-2 -mb-px py-[16px] ${activeTab === "weekly"
                    ? "border-primary-blue font-semibold text-grayscale-black"
                    : "border-transparent text-grayscale-dark-gray"
                    }`}
                onClick={() => setActiveTab("weekly")}
            >
                주간
            </button>
            <button
                className={`text-[16px] flex-1 py-2 border-b-2 -mb-px py-[16px] ${activeTab === "monthly"
                    ? "border-primary-blue font-semibold text-grayscale-black"
                    : "border-transparent text-grayscale-dark-gray"
                    }`}
                onClick={() => setActiveTab("monthly")}
            >
                월간
            </button>
        </div>
    )
}

export default ReportTabMenu