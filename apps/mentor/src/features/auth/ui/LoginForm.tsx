import eyeSvg from '@/assets/icons/eye.svg';
import eyeOffSvg from '@/assets/icons/eye-off.svg';
import useLogin from '@/features/auth/hooks/useLogin';

/**
 * @description 로그인 폼 컴포넌트
 */
const LoginForm = () => {
    const { register, handleLoginSubmit, showPassword, handleTogglePassword } = useLogin();
    return (
        <form
            className="w-full h-full max-w-[360px] md:max-w-[480px] xl:max-w-[600px] max-h-[602px] md:rounded-3xl md:bg-grayscale-bg-gray md:shadow-[0px_0px_30.2px_0px_#00000029] pt-0 pb-0 px-0 md:pt-16 md:pb-[53px] md:px-8 xl:px-[71px]"
            onSubmit={handleLoginSubmit}
        >
            <h1 className="text-primary-blue-dark text-[28px] md:text-[2.5rem]">멘토 로그인</h1>
            <h5 className="text-grayscale-dark-gray mt-4">관리자모드 로그인하세요.</h5>
            <div className="flex flex-col gap-5 mt-12">
                <div className="w-full md:max-w-[458px] h-14 flex items-center border border-grayscale-border rounded-full pl-6 pr-4 py-4 bg-white shadow-[inset_0px_0px_4px_0px_#00000040]">
                    <span className="body-medium text-grayscale-medium-gray whitespace-nowrap pr-8 font-normal inline-flex items-center leading-none">
                        멘토 ID
                    </span>
                    <div
                        className="w-px h-6 border border-grayscale-border shrink-0 mr-6"
                        aria-hidden
                    />
                    <input
                        type="text"
                        className="flex-1 min-w-0 border-0 p-0 bg-transparent outline-none placeholder:text-grayscale-light-gray text-base"
                        {...register('email')}
                    />
                </div>
                <div className="w-full md:max-w-[458px] h-14 flex items-center border border-grayscale-border rounded-full pl-6 pr-4 py-4 bg-white shadow-[inset_0px_0px_4px_0px_#00000040]">
                    <span className="body-medium text-grayscale-medium-gray whitespace-nowrap pr-5 font-normal inline-flex items-center leading-none">
                        비밀번호
                    </span>
                    <div
                        className="w-px h-6 border border-grayscale-border shrink-0 mr-6"
                        aria-hidden
                    />
                    <div className="flex-1 min-w-0 flex items-center">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="w-full border-0 p-0 bg-transparent outline-none placeholder:text-grayscale-light-gray text-base"
                            {...register('password')}
                        />
                        <button type="button" onClick={handleTogglePassword}>
                            <img
                                src={showPassword ? eyeOffSvg : eyeSvg}
                                alt="비밀번호 보기"
                                className="w-6 h-6 shrink-0 ml-2 cursor-pointer"
                            />
                        </button>
                    </div>
                </div>
            </div>
            <button type='submit' className="w-full md:max-w-[458px] h-14 bg-primary-blue text-white rounded-full px-6 py-4 mt-12 ui-button">로그인</button>
            <div className="flex w-full justify-center gap-2 mt-6 body-medium text-grayscale-dark-gray">
                <button type="button">아이디찾기</button>
                <span className="text-grayscale-light-gray" aria-hidden>|</span>
                <button type="button">비밀번호찾기</button>
            </div>
            <div className="flex w-full justify-center mt-4">
                <h5 className="text-grayscale-dark-gray">개인정보처리방침</h5>
            </div>
        </form>
    )
}

export default LoginForm;