import React, { useState, useRef } from 'react';
import Comment from '../Comment/Comment';
import Likes from '../Like/Like';
import UpdatePublication from '../UpdatePublication/UpdatePublication';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faEdit, faThumbsUp } from '@fortawesome/free-solid-svg-icons';



const Feed = ({ publicationsData, isAdmin }) => {


    const [content, setContent] = useState('');
    const [updatePublication, setUpdatePublication] = useState(false);
    const formCommentRef = useRef(null);
    const likeRef = useRef(null);


    let getToken = JSON.parse(localStorage.getItem('userData'));

    const onChangeContent = (evt) => {
        setContent(evt.target.value)
    };




    const onClickLike = (evt) => {
        evt.preventDefault();

        let getToken = JSON.parse(localStorage.getItem('userData'));


        if (!publicationsData.id || !getToken) {
        } else {
            fetch("http://localhost:3001/news/likes/add", {
                method: "POST",
                body: `publications_idpublications=${publicationsData.id}`,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': getToken[0].token
                },
            })
            window.location.reload(false);
        }

    }

    const onSubmitComment = (evt) => {
        evt.preventDefault();

        let getToken = JSON.parse(localStorage.getItem('userData'));


        if (!content || !publicationsData.id || !getToken) {
            return
        }
        fetch(formCommentRef.current.action, {
            method: formCommentRef.current.method,
            body: `content=${content}&publications_idpublications=${publicationsData.id}&users_idusers=${JSON.stringify(getToken[0].userId)}`,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': getToken[0].token
            },
        })
        .then((response) => {
            if(response.ok){
                window.location.reload(false);
            }
        })
    }

    const deletePublication = (evt) => {
        evt.preventDefault();



        fetch("http://localhost:3001/news/publications/delete", {
            method: "DELETE",
            mode: 'cors',
            body: `id=${publicationsData.id}`,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': getToken[0].token
            }
        })
        window.location.reload(false);
    }

    const displayUpdatePublication = (evt) => {
        evt.preventDefault();

        setUpdatePublication(true);
    }




    return (
        <div className="cardContainer">
            
                <li className="liPublication" key={publicationsData.id}>


                    <div className="containerPublication">
                        <div className="containerButtonsPublications">
                            <div>{isAdmin ? <button className="iconUpdatePublication" onClick={displayUpdatePublication}><FontAwesomeIcon className="faEdit" icon={faEdit} />Modifier</button> : ""}</div>
                            <div>{isAdmin === false & getToken[0].userId === publicationsData.users_idusers ? <button className="iconUpdatePublication" onClick={displayUpdatePublication}><FontAwesomeIcon className="faEdit" icon={faEdit} />Modifier</button> : ""}</div>
                            <div>{isAdmin ? <button className="buttonDeletePublication" onClick={deletePublication}><FontAwesomeIcon className="faMinusCircle" icon={faMinusCircle} />Supprimer</button> : ""}</div>
                            <div>{isAdmin === false & getToken[0].userId === publicationsData.users_idusers ? <button className="buttonDeletePublication" onClick={deletePublication}><FontAwesomeIcon className="faMinusCircle" icon={faMinusCircle} />Supprimer</button> : ""}</div>
                        </div>
                        <div>{updatePublication ? <UpdatePublication publicationsData={publicationsData} /> : ""}</div>

                        <h3 className="nameAndSurnamePublication">{publicationsData.user.name} {publicationsData.user.surname}</h3>
                        <p className="contentPublication">{publicationsData.content}</p>
                        <img src={publicationsData.attachment} alt="" className="imgFeed" />
                    </div>
                    <div className="containerComment">

                        {publicationsData.comments ? <Comment isAdmin={isAdmin} publicationsData={publicationsData} key={publicationsData.id} /> : "Aucun commentaire"}

                    </div>
                    <div className="containerLikePublication">
                        <button className="likeButton" ref={likeRef} type="button" onClick={onClickLike}><FontAwesomeIcon className="faThumbsUp" icon={faThumbsUp} />J'aime</button>
                        <div>
                            {publicationsData.likes ? <Likes likesNumber={publicationsData.likes.length} /> : "0"}
                        </div>
                    </div>
                    <form className={publicationsData.id} method="POST" action="http://localhost:3001/news/comments/add" ref={formCommentRef} onSubmit={onSubmitComment}>
                        <label htmlFor={publicationsData.id}><h3>Commenter</h3></label>
                        <textarea className="textareaCreateComment" id={publicationsData.id} type="text" name="content" onChange={onChangeContent} value={content} placeholder="Commenter..." />
                        <button className="buttonComment" type="submit">Envoyer</button>
                    </form>

                    <br />



                </li>
            
        </div>
    );
}

export default Feed;