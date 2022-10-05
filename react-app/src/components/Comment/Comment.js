import React from 'react';
import ButtonsDeleteAndUpdateComment from '../ButtonsDeleteAndUpdateComment/ButtonsDeleteAndUpdateComment';

const Comment = ({ publicationsData, isAdmin }) => {


    let getToken = JSON.parse(localStorage.getItem('userData'));

    return (
        <>
            <ol>
                {publicationsData.comments.map(publicationsData => (
                    <li className="liComment" key={publicationsData.id}>
                        {isAdmin & getToken[0].userId !== publicationsData.users_idusers? <ButtonsDeleteAndUpdateComment isAdmin={isAdmin} publicationsData={publicationsData} idComment={publicationsData.id} /> : ""}
                        {getToken[0].userId === publicationsData.users_idusers ? <ButtonsDeleteAndUpdateComment contentComment={publicationsData.content} isAdmin={isAdmin} idComment={publicationsData.id} /> : ""}
                        <h4 className="nameAndSurnameComment">{publicationsData.user.name} {publicationsData.user.surname}</h4>
                        <p className="contentComment">{publicationsData.content}</p>
                    </li>
                ))}
            </ol>
        </>
    );
}

export default Comment;