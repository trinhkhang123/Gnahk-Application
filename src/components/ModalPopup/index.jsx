export default function ModalPopup({ children, closeClick }) {
    return (
        <div className="wrapper">
            <div className="inner">
                {children}
            </div>
        </div>
    )
}