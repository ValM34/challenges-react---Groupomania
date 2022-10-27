const models = require('../models');

exports.getAllComments = async (req, res, next) => {

  const allComments = await models.Comment.findAll({
    order: [['createdAt', 'DESC']]
  })
    .then(comments => { res.status(200).json(comments) })
    .catch(error => res.status(400).json({ error: "ERROR" }))
};

exports.addComment = async (req, res, next) => {
  const addContent = req.body.content;
  if (!addContent) {
    return res.send(" EMPTY_COMMENT ");
  };
  const addComment = await models.Comment.create({
    users_idusers: req.auth.users_idusers,
    publications_idpublications: req.body.publications_idpublications,
    content: addContent,
  })
    .then(async (addComment) => {
      const allComments = await models.sequelize.query("SELECT C.*, U.name, U.surname, U.id AS idUser, P.id AS idPublication FROM `comments` C JOIN users U JOIN publications P ON C.users_idusers = U.id AND P.id = C.publications_idpublications WHERE P.id = " + req.body.publications_idpublications + ";")
    .then(comments => {
      res.status(200).json({ message: 'COMMENT_ADDED', comments: comments[0]})
    })
    .catch(error => res.status(400).json({ error: "ERROR" }))
    })
};

exports.updateComment = async (req, res, next) => {
  const newComment = req.body.content;
  if (!newComment) {
    return res.send(" EMPTY_COMMENT ");
  }
  const isAdmin = await models.User.findOne({
    where: { id: req.auth.users_idusers, isAdmin: 1 }
  })
  if (isAdmin) {
    const adminUpdateComment = await models.Comment.update(
      { content: newComment },
      {
        where: { id: req.body.id }
      })
        .then(async() => {
          console.log(req.body.content)
          return;
        })
        .catch((err) => res.status(400).json({ error: 'ERROR' }))
  }
  const getOneComment = await models.Comment.findOne({
    where: { id: req.body.id, users_idusers: req.auth.users_idusers }
  })
  if (!getOneComment) {
    return res.send(" ERROR ");
  }
  const updateComment = await models.Comment.update(
    { content: newComment },
    {
      where: { id: req.body.id, users_idusers: req.auth.users_idusers }
    });
  return res.send("COMMENT_UPDATED");
};

exports.deleteComment = async (req, res, next) => {
  const isAdmin = await models.User.findOne({
    where: { id: req.auth.users_idusers, isAdmin: 1 }
  })
  if (isAdmin) {
    const adminDeleteComment = await models.Comment.destroy({
      where: { id: req.body.id }
    });
    return res.send("COMMENT_DELETED");
  }
  const getOneComment = await models.Comment.findOne({
    where: { id: req.body.id, users_idusers: req.auth.users_idusers }
  })
  if (!getOneComment) {
    return res.send(" ERROR ");
  }
  const deleteComment = await models.Comment.destroy({
    where: { id: req.body.id, users_idusers: req.auth.users_idusers }
  });
  return res.send("COMMENT_DELETED");
};

exports.getComments = async (req, res, next) => {
  const allComments = await models.sequelize.query("SELECT C.*, U.name, U.surname, U.id AS idUser, P.id AS idPublication FROM `comments` C JOIN users U JOIN publications P ON C.users_idusers = U.id AND P.id = C.publications_idpublications WHERE P.id = " + req.body.publications_idpublications + ";")
    .then(comments => {
      res.status(200).json(comments[0])
    })
    .catch(error => res.status(400).json({ error: "ERROR" }))
}