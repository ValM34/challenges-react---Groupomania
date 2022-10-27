const models = require('../models');
const multer = require('../middleware/multer-config');
const fs = require('fs');


/*
exports.getAllPublications = async (req, res, next) => {

    const allPublications = await models.Publication.findAll({
        order: [['createdAt', 'DESC']]
    })
        .then(publications => { res.status(200).json(publications) })
        .catch(error => res.status(400).json({ error: "ERROR" }))


};
*/
exports.getAllPublications = async (req, res, next) => {

  const publication = await models.sequelize.query("SELECT P.*, U.name, U.surname FROM `publications` P JOIN users U ON P.users_idusers = U.id ORDER BY P.createdAt DESC;")
    .then(async publications => {
      // res.status(200).json(publications)

      publications = publications[0]

      const likes = models.Like.findAll({ attributes: ['id', 'publications_idpublications', 'users_idusers'] })
        .then(async (likes) => {

          publications.forEach(publication => publication.likes = [])
          // publications[0].likes.push(likes[0].publications_idpublications)




          for (let i = 0; i < publications.length; i++) {
            for (let o = 0; o < likes.length; o++) {
              if (publications[i].id === likes[o].publications_idpublications) {
                publications[i].likes.push({ likeId: likes[o].id, userId: likes[o].users_idusers })
              }
            }
          }
          return res.status(200).json(publications)
        })
    })
    .catch(error => res.status(400).json({ error: "ERROR" }))
};



exports.getOnePublication = async (req, res, next) => {
  const getOnePublication = await models.Publication.findOne({
    where: { id: req.params.id }
  })
    .then(publication => { res.status(200).json(publication) })
    .catch(error => res.status(400).json({ error: "ERROR" }));

};

exports.addPublication = async (req, res, next) => {

  const addContent = req.body.content;
  if (!addContent) {
    return res.send(" EMPTY_PUBLICATION ");
  }
  let reqFile = req.file;
  const addPublication = await models.Publication.create({
    users_idusers: req.auth.users_idusers,
    content: req.body.content,
    attachment: reqFile ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : ""
  })
  const publication = await models.sequelize.query("SELECT P.*, U.name, U.surname FROM `publications` P JOIN users U ON P.users_idusers = U.id ORDER BY P.createdAt DESC;")
    .then(async publications => {
      // res.status(200).json(publications)

      publications = publications[0]

      const likes = models.Like.findAll({ attributes: ['id', 'publications_idpublications', 'users_idusers'] })
        .then(async (likes) => {

          publications.forEach(publication => publication.likes = [])
          // publications[0].likes.push(likes[0].publications_idpublications)




          for (let i = 0; i < publications.length; i++) {
            for (let o = 0; o < likes.length; o++) {
              if (publications[i].id === likes[o].publications_idpublications) {
                publications[i].likes.push({ likeId: likes[o].id, userId: likes[o].users_idusers })
              }
            }
          }
          return res.status(200).json({message: 'PUBLICATION_ADDED', publications: publications})
        })
    })
    .catch(error => res.status(400).json({ error: "ERROR" }))
};

exports.updatePublication = async (req, res, next) => {
  const newPublication = req.body.content;
  const reqFile = req.file;
  if (!newPublication & !reqFile) {
    return res.send(" EMPTY_PUBLICATION ");
  }
  const isAdmin = await models.User.findOne({
    where: { id: req.auth.users_idusers, isAdmin: 1 }
  })

  if (isAdmin) {
    if (reqFile && !newPublication) {
      const findFilename = await models.Publication.findOne({
        where: { id: req.body.id }
      })
        .then(publication => {
          const attachmentName = publication.attachment.split('/images/')[1];
          fs.unlink(`images/${attachmentName}`, async () => {
            const adminUpdatePublication = await models.Publication.update(
              {
                attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
              },
              {
                where: { id: req.body.id }
              });
          })
        })
      return res.send("PUBLICATION_UPDATED");
    } else if (req.file && newPublication) {
      const findFilename = await models.Publication.findOne({
        where: { id: req.body.id }
      })
        .then(publication => {
          const attachmentName = publication.attachment.split('/images/')[1];
          fs.unlink(`images/${attachmentName}`, async () => {
            const adminUpdatePublication = await models.Publication.update(
              {
                content: newPublication,
                attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
              },
              {
                where: { id: req.body.id }
              });
          })
        })
      return res.send("PUBLICATION_UPDATED");

    } else if (newPublication && !reqFile) {
      const adminUpdatePublication = await models.Publication.update(
        { content: newPublication },
        {
          where: { id: req.body.id }
        });
      return res.send("PUBLICATION_UPDATED");
    }

  }
  const getOnePublication = await models.Publication.findOne({
    where: { id: req.body.id, users_idusers: req.auth.users_idusers }
  })
  if (reqFile && !newPublication) {
    const findFilename = await models.Publication.findOne({
      where: { id: req.body.id }
    })
      .then(publication => {
        const attachmentName = publication.attachment.split('/images/')[1];
        fs.unlink(`images/${attachmentName}`, async () => {
          const adminUpdatePublication = await models.Publication.update(
            {
              attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            },
            {
              where: { id: req.body.id, users_idusers: req.auth.users_idusers }
            });
        })
      })
    return res.send("PUBLICATION_UPDATED");

  } else if (req.file && newPublication) {
    const findFilename = await models.Publication.findOne({
      where: { id: req.body.id }
    })
      .then(publication => {
        const attachmentName = publication.attachment.split('/images/')[1];
        fs.unlink(`images/${attachmentName}`, async () => {
          const adminUpdatePublication = await models.Publication.update(
            {
              content: newPublication,
              attachment: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
            },
            {
              where: { id: req.body.id, users_idusers: req.auth.users_idusers }
            });
        })
      })
    return res.send("PUBLICATION_UPDATED");

  } else if (newPublication && !reqFile) {
    const adminUpdatePublication = await models.Publication.update(
      { content: newPublication },
      {
        where: { id: req.body.id, users_idusers: req.auth.users_idusers }
      });
    return res.send("PUBLICATION_UPDATED");
  }
};

exports.deletePublication = async (req, res, next) => {
  const isAdmin = await models.User.findOne({
    where: { id: req.auth.users_idusers, isAdmin: 1 }
  })
  if (isAdmin) {
    const findFilename = await models.Publication.findOne({
      where: { id: req.body.id }
    })
      .then(async (publication) => {
        const adminDeletePublication = await models.Publication.destroy({
          where: { id: req.body.id }
        })
        // A réparer plus tard ! 
        /*const attachmentName = publication.attachment.split('/images/')[1];
        fs.unlink(`images/${attachmentName}`, async () => {
          const adminDeletePublication = await models.Publication.destroy({
            where: { id: req.body.id }
          })
            .then(() => {
              return res.status(200).json({ succes: 'PUBLICATION_DELETED' })
            })
        })*/
      })
    // return res.send("PUBLICATION_DELETED");
  }
  const getOnePublication = await models.Publication.findOne({
    where: { id: req.body.id, users_idusers: req.auth.users_idusers }
  })
  if (!getOnePublication) {
    return res.send(" ERROR ");
  }
  const findFilename = await models.Publication.findOne({
    where: { id: req.body.id }
  })
    .then(publication => {
      const attachmentName = publication.attachment.split('/images/')[1];
      fs.unlink(`images/${attachmentName}`, async () => {
        const adminDeletePublication = await models.Publication.destroy({
          where: { id: req.body.id }
        });
        return res.send("PUBLICATION_DELETED");
      })
    })
};