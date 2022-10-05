import { useState, useRef } from 'react';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function UpdatePublication({ publicationsData }) {


    const [contentUpdatePublication, setContentUpdatePublication] = useState('');
    
    const formUpdatePublicationRef = useRef(null);


    let getToken = JSON.parse(localStorage.getItem('userData'));

    const onChangeContentUpdatePublication = (evt) => {
        setContentUpdatePublication(evt.target.value)
    };
    const buttonUpdatePublication = (evt) => {
        evt.preventDefault();
        console.log(new FormData(formUpdatePublicationRef.current.file))
        let formData = new FormData(formUpdatePublicationRef.current);
        formData.append('id', publicationsData.id);
        fetch("http://localhost:3001/news/publications/update", {
            method: "POST",
            mode: "cors",
            body: formData,
            headers: new Headers({
                'Authorization': getToken[0].token
            })
        })
        .then((response) => {
            if(response.ok){
                window.location.reload(false);
            }
        })
    }
    return (
        <div className="containerFlexbox">

            <form className="containerUpdatePublication" ref={formUpdatePublicationRef} onSubmit={buttonUpdatePublication}>
                <label htmlFor={"contentUpdatePublication-" + publicationsData.id}>Modifier la publication</label>
                <textarea id={"contentUpdatePublication-" + publicationsData.id} className="textareaUpdatePublication" type="text" name="content" onChange={onChangeContentUpdatePublication} value={contentUpdatePublication} placeholder={publicationsData.content}></textarea>
                <label className="labelUpdateImage" htmlFor={"imageUpdate-" + publicationsData.id}><FontAwesomeIcon className="faImage" icon={faImage} />Ajouter ou modifier une image</label>
                <input className="inputFile" id={"imageUpdate-" + publicationsData.id} type="file" name="image" />
                <button className="buttonUpdatePublication" type="submit">Modifier</button>
            </form>

        </div>
    )

}

export default UpdatePublication;