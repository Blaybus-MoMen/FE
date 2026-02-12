interface ImagePreviewModalProps {
    url: string;
    onClose: () => void;
}

const ImagePreviewModal = ({ url, onClose }: ImagePreviewModalProps) => {
    return (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center" onClick={onClose}>
            <img
                src={url}
                alt="preview"
                className="max-w-[90%] max-h-[90%] rounded-lg shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            />
        </div>
    );
};

export default ImagePreviewModal;
