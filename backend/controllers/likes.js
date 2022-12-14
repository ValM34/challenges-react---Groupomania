const models = require('../models');

exports.addLike = async (req, res, next) => {

  const like = req.body.publications_idpublications;
  if (!like) {
    return res.send(" EMPTY_LIKE ");
  }
  const verifyLike = await models.Like.findOne({
    where: { users_idusers: req.auth.users_idusers, publications_idpublications: req.body.publications_idpublications }
  })
  if (verifyLike) {
    const deleteLike = await models.Like.destroy({
      where: { publications_idpublications: req.body.publications_idpublications, users_idusers: req.auth.users_idusers }
    })
      .then(() => {
        return res.status(200).json({ message: 'LIKE_DELETED' })
      })
  } else {
    const addLike = await models.Like.create({
      users_idusers: req.auth.users_idusers,
      publications_idpublications: req.body.publications_idpublications
    })
      .then(() => {
        return res.status(200).json({ message: 'LIKE_ADDED' })
      })
  }

};

exports.getLikes = async (req, res, next) => {
  const allLikes = await models.Like.findAll({
    attributes: ['id', 'publications_idpublications']
  })
    .then(likes => { res.status(200).json(likes) })
    .catch(error => res.status(400).json({ error: "ERROR" }))
};