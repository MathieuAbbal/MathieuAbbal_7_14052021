const { Comment } = require('../models/index');
/**
 * Ajout d'un nouveau commentaire
 * @requête {POST} /api/comments
 */
exports.createComment = (req, res, next) => {
    const commentObjet = req.body;
    //création d'un nouvel objet
    const comment = new Comment({
        ...commentObjet
    });
    //entregistrement dans la BDD
    comment.save()
        .then((comments) => { res.status(201).json(comments); })
        .catch(error => res.status(400).json({ error }));
}
/**
* Récupère un commentaire d'une publication (par son id)
*@requête {get} /api/comments/:id
*/ 
exports.findOneComment = (req, res, next) => {
    Comment.findOne({
        include:{all:true, nested:true},
         where: { id: req.params.id } })
        .then(comment => {
            res.status(200).json(comment)
        })
        .catch(error => res.status(404).json({ error }));
};

/**
* Récupère tous les commentaires d'une publication
*@requête {get} /api/posts/:id/comments
*/
exports.findAllComments = (req, res, next) => {
    Comment.findAll({ 
        include:{all:true, nested:true},
        where: { post_id: req.params.id } })
        .then(comments => {
            res.status(200).json( comments );
        })
        .catch(error => res.status(400).json({ error }));
};
/**
* Suppression d'un commentaire
*/
exports.deleteComment = (req, res, next) => {
    Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: 'Commentaire supprimé !' }))
        .catch(error => res.status(400).json({ error }));
};

