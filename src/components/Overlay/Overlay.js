import React, { useContext } from 'react';
import { MiscContext } from '../../context/misc.context';
import { ModalsContext } from '../../context/modals.context';
import './Overlay.sass';

export default function Overlay() {

    const { misc, closeSidebar } = useContext(MiscContext);
    const { modal, closeModal } = useContext(ModalsContext);

    const onOverlayClick = () => {
        closeSidebar();
        // closeModal();
    }

    return (
        <div 
            className="overlay"
            style={{
                opacity: misc.overlayed || misc.sidebarOpen || modal.isOpen ? 0.8 : 0,
                display: misc.overlayed || misc.sidebarOpen || modal.isOpen ? 'block' : 'none'
            }}
            onClick={onOverlayClick}
        >
            
        </div>
    )
}
