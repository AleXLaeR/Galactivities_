import { makeAutoObservable } from "mobx";

interface Modal {
    isOpen: boolean;
    body: JSX.Element | null;
}

export default class ModalStore {
    modal: Modal = {
        isOpen: false,
        body: null
    }

    public constructor() {
        makeAutoObservable(this);
    }

    public openModal = (content: JSX.Element) => {
        this.modal.isOpen = true;
        this.modal.body = content;
    }

    public closeModal = () => {
        this.modal.isOpen = false;
        this.modal.body = null;
    }
}