import React, { useState, useEffect, useContext } from 'react';
import './ModalHolder.sass';
import { MiscContext } from '../../../context/misc.context';
import { ModalsContext } from '../../../context/modals.context';
import TagsSelector from '../TagsSelector/TagsSelector';
import TagsExcluder from '../TagsExcluder/TagsExcluder';
import SearchSort from '../SearchSort/SearchSort';

export default function ModalHolder() {

    const { misc, openOverlay, closeOverlay } = useContext(MiscContext);
    const { modal, modals, closeModal } = useContext(ModalsContext);

    const onModalClick = (e) => {
        console.log(e.target);
        if(e.target.id == 'modal-holder') closeModal();
    }

    return (
        <div id="modal-holder" className={`modal-holder ${modal.isOpen ? 'modal-holder-open' : ''}`} onClick={onModalClick}>
            { modal.selectedModal.code == modals.INCLUDE_TAGS.code && <TagsSelector />}
            { modal.selectedModal.code == modals.EXCLUDE_TAGS.code && <TagsExcluder />}
            { modal.selectedModal.code == modals.SEARCH_SORT.code && <SearchSort />}
        </div>
    )
}
