import Avatar from '@/shared/ui/Avatar';
import ManageSidebar from '@/features/manage/ui/ManageSideBar';
import StudentList from '@/features/manage/ui/StudentList';

/**
 * @description 학습관리 페이지
 */
const ManagePage = () => {
    return (
        <main className="relative h-full w-full lg:overflow-hidden overflow-y-auto bg-feedback-layout">
            <div className="flex h-full w-full flex-col lg:flex-row">
                <ManageSidebar />

                <section className="flex flex-1 flex-col bg-primary-blue-pale">
                    <header className="flex items-center justify-between px-4 lg:px-10 py-6 lg:py-8">
                        <div className="hidden lg:flex ml-auto items-center gap-[9px] rounded-[100px] bg-[#666666]/30 pl-[20px] shadow-[inset_0px_2px_4px_1px_#00000040]">
                            <p className="ui-label text-white">설쌤</p>
                            <Avatar className="h-[36px] w-[36px]">
                                <span>쌤</span>
                            </Avatar>
                        </div>
                    </header>

                    <StudentList />
                </section>
            </div>
        </main>
    );
};

export default ManagePage;
