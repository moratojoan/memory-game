import Modal from 'react-modal';

Modal.setAppElement('#root');


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

export default function CustomModal({children, ...props}) {
    return (
        <Modal
            style={customStyles}
            {...props}
        >
            {children}
        </Modal>
    );
}
