import { useGetMyInfoQuery } from "@/entities/study/queries/study.queries";
import noti from '@/assets/icons/noti.svg';
import edit from '@/assets/icons/edit.svg';
import { useModalStore } from "@/shared/store/modal.store";
import { MODAL_KEY } from "@/shared/model/modal";

const HomeUserInfo = () => {
    const { data } = useGetMyInfoQuery();
    const openModal = useModalStore((state) => state.openModal);

    const handleEditCheerMessage = () => {
        openModal(MODAL_KEY.CHEER_UPDATE, {
            initialCheerMessage: data?.cheerMessage ?? '',
        });
    };

    return (
        <>
            <div className='flex items-center justify-between pl-[16px]'>
                <h3>{data?.name}님의 학습</h3>
                <button><img src={noti} alt='noti' /> </button>
            </div>
            <div className='flex items-center gap-[7px] pl-[16px]'>
                <p className='body-medium text-grayscale-black'>{data?.cheerMessage}</p>
                <button type="button" onClick={handleEditCheerMessage}>
                    <img src={edit} alt='edit' />
                </button>
            </div>
        </>
    );
};

export default HomeUserInfo;
