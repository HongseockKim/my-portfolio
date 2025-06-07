import useModalStore from "../../store/useModalStore.jsx";
import { motion as Motion } from "motion/react";

const Modal = ({children}) => {
    const isOpen = useModalStore(state => state.isModalOpen);
    const closeModal = useModalStore(state => state.closeModal);


    return (
        <Motion.div
            className={`modal ${isOpen ? 'open' : ''}`}
            initial={{ y: "100vh",x:"50%", opacity: 0 }}
            animate={{
                y: isOpen ? "-50%" : "50%",
                x: isOpen ? "-50%" : "-50%",
                opacity: isOpen ? 1 : 0
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
            }}
        >
            <div className="modal-content">
                <div className='modal_head'>
                    <button type='button' onClick={closeModal}>
                        X
                    </button>
                </div>
                <div className='modal_body'>
                    {children}
                </div>
            </div>
        </Motion.div>
    );
}

export default Modal;