import React, { useState } from 'react';
import { faMinusCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ButtonsDeleteAndUpdateComment = ({ idComment, contentComment, isAdmin }) => {

    const [contentUpdateComment, setContentUpdateComment] = useState('');
    const [updateComment, setUpdateComment] = useState(false);

    let getToken = JSON.parse(localStorage.getItem('userData'));

    const deleteComment = (evt) => {
        evt.preventDefault();


        fetch("http://localhost:3001/news/comments/delete", {
            method: "DELETE",
            mode: 'cors',
            body: `id=${idComment}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': getToken[0].token
            }
        })
        .then((response) => {
            if(response.ok){
                window.location.reload(false);
            }
        })
    }

    const displayUpdateComment = (evt) => {
        evt.preventDefault();

        setUpdateComment(true);
    }

    const buttonUpdateComment = (evt) => {
        evt.preventDefault();

        fetch("http://localhost:3001/news/comments/update", {
            method: "POST",
            mode: "cors",
            body: `id=${idComment}&content=${contentUpdateComment}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': getToken[0].token
            }
        })
            .then((response) => {
                if(response.ok){
                    window.location.reload(false);
                }
            })
    }
    const onChangeContentUpdateComment = (evt) => {
        setContentUpdateComment(evt.target.value)
    };


    return (
        <>
            <div className="containerButtonsComments">
                {isAdmin ? <button className="buttonUpdateComment" onClick={displayUpdateComment}><FontAwesomeIcon className="faEdit" icon={faEdit} />Modifier</button> : <button className="buttonUpdateComment" onClick={displayUpdateComment}><FontAwesomeIcon className="faEdit" icon={faEdit} />Modifier</button>}
                {isAdmin ? <button className="buttonDeleteComment" onClick={deleteComment}>Supprimer <FontAwesomeIcon className="faMinusCircle" icon={faMinusCircle} /></button> : <button className="buttonDeleteComment" onClick={deleteComment}>Supprimer <FontAwesomeIcon className="faMinusCircle" icon={faMinusCircle} /></button>}
            </div>
            <div>{updateComment ?
                <>
                <label htmlFor={"textareaModifyComment" + idComment}>Modifier le commentaire</label>
                <textarea id={"textareaModifyComment" + idComment} className="textareaUpdateComment" type="text" name="contentUpdatePublication" onChange={onChangeContentUpdateComment} value={contentUpdateComment} placeholder={contentComment}></textarea>
                    <button className="buttonUpdateCommentSubmit" type="button" onClick={buttonUpdateComment}>Modifier</button></>
                : ""}</div>
        </>
    );
}

export default ButtonsDeleteAndUpdateComment;