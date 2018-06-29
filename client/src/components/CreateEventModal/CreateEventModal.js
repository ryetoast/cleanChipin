import React from 'react';
import Modal from 'react-modal';
import API from "../../utils/API.js";
import Form from "../Form";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '800px',
        height: '500px'
    }
};

class CreateEventsModal extends React.Component {

    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }
    submitEvent = event => {
        event.preventDefault();
        API.postEvent(this.state.search)
            .then(res => {
                if (res.data.status === "error") {
                    throw new Error(res.data.message);
                }
                this.setState({ results: res.data.message, error: " " });
            })
            .catch(err => this.setState({ error: err.message }));
    }

    render() {
        return (
            <div>
                <button onClick={this.openModal}>CreateEventsModal</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >

                    <h2 ref={subtitle => this.subtitle = subtitle}>Post an Event!</h2>

                    <Form />

                    <button onClick={this.closeModal}>close</button>


                </Modal>
            </div>
        );
    }
}
export default CreateEventsModal;
