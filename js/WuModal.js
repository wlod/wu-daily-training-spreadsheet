"use strict";

class WuModal {

    constructor(modalId) {
        this.modal = document.getElementById(modalId);
    }

    /**
     * Show message with auto hide after msTimeInterval
     */
    showMessage(message, msTimeInterval) {
        this._setMessage(message);
        this._showModal();
        this._hideModal(msTimeInterval);
    }

    _setMessage(message) {
        this.modal.innerHTML = message;
    }

    _showModal() {
        this.modal.classList.remove("wu-modal-hidden");
        this.modal.classList.add("wu-modal-show");
    }

    _hideModal(msTimeInterval) {
        setTimeout(() => {
            this.modal.classList.remove("wu-modal-show");
            this.modal.classList.add("wu-modal-hidden");
        }, msTimeInterval);
    }

}