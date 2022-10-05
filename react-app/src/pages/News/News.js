import { useState, useEffect } from 'react';
import Feed from '../../components/Feed/Feed';
import PublicationInput from '../../components/PublicationInput/PublicationInput';
import Footer from '../../components/Footer/Footer';

function News() {

    const [publicationsData, setPublicationsData] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    let getToken = JSON.parse(localStorage.getItem('userData'));

    useEffect(() => {

        if (publicationsData[0] === undefined) {
        let publicationsArrayDataV1 = [];


    let myHeaders = new Headers({ 'Authorization': getToken[0].token });

    let myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors',
        cache: 'default'
    };



        fetch("http://localhost:3001/users/isadmin", {
            method: "GET",
            headers: { 'Authorization': getToken[0].token },
            mode: "cors",
            cache: "default"
        })
            .then(response => response.json())
            .then((isAdmin) => { setIsAdmin(isAdmin.isAdmin) })

        try {
            fetch("http://localhost:3001/news/comments", myInit)
                .then(response => response.json())

                .then((allComments) => {

                    let y = false;
                    for (let i = 0; i < allComments.length; i++) {
                        if (publicationsArrayDataV1.length === 0) {
                            publicationsArrayDataV1.push(allComments[i]);
                            i++;
                        }
                        for (let o = 0; o < publicationsArrayDataV1.length; o++) {
                            if (publicationsArrayDataV1.length === 1){y = true; break;}
                            if (allComments[i].publications_idpublications === publicationsArrayDataV1[o].publications_idpublications) {
                                y = true;
                                break;
                            } else {
                                y = false;
                            }
                        }
                        if (y !== true) {
                            publicationsArrayDataV1.push(allComments[i]);
                            y = false;
                        }
                    }

                    fetch("http://localhost:3001/news/publications", myInit)
                        .then(response => response.json())
                        .then((allPublications) => {
                            fetch("http://localhost:3001/news/likes/getall", myInit)
                                .then(response => response.json())
                                .then((allLikes) => {


                                    fetch("http://localhost:3001/users/all", myInit)
                                        .then(response => response.json())
                                        .then((allUsers) => {

                                            let publicationsArrayDataV2 = [];
                                            let t = false;

                                            for (let i = 0; i < allPublications.length; i++) {
                                                for (let o = 0; o < publicationsArrayDataV1.length; o++) {
                                                    if (allPublications[i].id === publicationsArrayDataV1[o].publications_idpublications) {
                                                        publicationsArrayDataV2.push(publicationsArrayDataV1[o]);
                                                        t = true;
                                                        break;
                                                    } else {
                                                        t = false;
                                                    }

                                                }
                                                if (t !== true) {
                                                    publicationsArrayDataV2.push(allPublications[i]);
                                                    t = false;
                                                }

                                            }



                                            for (let i = 0; i < publicationsArrayDataV2.length; i++) {
                                                publicationsArrayDataV2[i].createdAtNumber = publicationsArrayDataV2[i].createdAt.replace(/\D/g, '');
                                            }

                                            const modifyPublicationsArrayDataV2 = publicationsArrayDataV2.sort(function compare(a, b) {
                                                if (a.createdAtNumber < b.createdAtNumber)
                                                    return 1;
                                                if (a.createdAtNumber > b.createdAtNumber)
                                                    return -1;
                                                return 0;
                                            });

                                            // J'ai rajouté une partie "createdAtNumber"

                                            let publicationsArrayDataV3 = [];

                                            for (let i = 0; i < modifyPublicationsArrayDataV2.length; i++) {


                                                // Remplacer les commentaires par les publications liées dans le tableau
                                                if (modifyPublicationsArrayDataV2[i].publications_idpublications) {
                                                    function findPublication(publicationFind) {
                                                        return publicationFind.id === modifyPublicationsArrayDataV2[i].publications_idpublications
                                                    }
                                                    publicationsArrayDataV3.push(allPublications.find(findPublication))
                                                    // Je push les publications liées au commentaire à la place du commentaire pour n'avoir que des publications dans un nouveau tableau
                                                } else {
                                                    publicationsArrayDataV3.push(modifyPublicationsArrayDataV2[i]) // Je push les publications aussi pour avoir toutes les publications
                                                }
                                            }

                                            const allCommentsReversed = allComments.reverse();

                                            for (let i = 0; i < publicationsArrayDataV3.length; i++) {
                                                for (let o = 0; o < allCommentsReversed.length; o++) {
                                                    if (publicationsArrayDataV3[i].id === allCommentsReversed[o].publications_idpublications && publicationsArrayDataV3[i].comments === undefined) {
                                                        Object.defineProperty(publicationsArrayDataV3[i], 'comments', {
                                                            value: [allCommentsReversed[o]],
                                                            configurable: true,
                                                            enumerable: true
                                                        });

                                                    } else if (publicationsArrayDataV3[i].id === allCommentsReversed[o].publications_idpublications) {
                                                        publicationsArrayDataV3[i].comments.push(allCommentsReversed[o])
                                                    }
                                                }
                                            }

                                            for (let i = 0; i < publicationsArrayDataV3.length; i++) {
                                                for (let o = 0; o < allLikes.length; o++) {
                                                    if (publicationsArrayDataV3[i].id === allLikes[o].publications_idpublications && publicationsArrayDataV3[i].likes === undefined) {
                                                        Object.defineProperty(publicationsArrayDataV3[i], 'likes', {
                                                            value: [allLikes[o]],
                                                            configurable: true,
                                                            enumerable: true
                                                        });
                                                    } else if (publicationsArrayDataV3[i].id === allLikes[o].publications_idpublications) {
                                                        publicationsArrayDataV3[i].likes.push(allLikes[o])
                                                    }
                                                }
                                            }


                                            // Je passe sur toutes les publications pour leur ajouter le prénom et le nom du user
                                            for (let i = 0; i < publicationsArrayDataV3.length; i++) {


                                                // Remplacer les commentaires par les publications liées dans le tableau
                                                function findUser(userPublicationFind) {
                                                    return userPublicationFind.id === publicationsArrayDataV3[i].users_idusers
                                                }
                                                let userFinded = allUsers.find(findUser);
                                                // for (let o = 0; o < publicationsArrayDataV3.length; o++) { Je crois que cette boucle ne sert à rien
                                                Object.defineProperty(publicationsArrayDataV3[i], 'user', {
                                                    value: userFinded,
                                                    configurable: true,
                                                    enumerable: true
                                                });



                                                if (publicationsArrayDataV3[i].comments) {
                                                    for (let o = 0; o < publicationsArrayDataV3[i].comments.length; o++) {
                                                        function findUserForComment(userCommentFind) {
                                                            return userCommentFind.id === publicationsArrayDataV3[i].comments[o].users_idusers
                                                        }
                                                        let userForCommentFinded = allUsers.find(findUserForComment)
                                                        Object.defineProperty(publicationsArrayDataV3[i].comments[o], 'user', {
                                                            value: userForCommentFinded,
                                                            configurable: true,
                                                            enumerable: true
                                                        });
                                                    }
                                                }
                                                // }
                                            }
                                            
                                            if (publicationsData[0] === undefined && publicationsArrayDataV3[0]) {
                                                setPublicationsData(publicationsArrayDataV3)
                                            }
                                            










                                        })

                                })
                        })
                })
        }
        catch (err) { console.log(err) }
    }
    }, [publicationsData, getToken])


    return (
        <>
            <h1>Fil d'actualités</h1>
            <PublicationInput />
            <h2>Publications récentes</h2>
            <ol>{(publicationsData[0] !== undefined) &&
                publicationsData.map((publicationsData) => {
                    return <Feed isAdmin={isAdmin} publicationsData={publicationsData} key={publicationsData.id} />
                })
            }
            </ol>
            <Footer />
        </>
    );
}

export default News;