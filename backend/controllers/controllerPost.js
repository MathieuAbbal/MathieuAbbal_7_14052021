//importation des modèles
const { Post,Comment,Like } = require('../models/index');


const fs = require('fs');

/**
 * Ajout d'une nouvelle publication
 * @requête { post }  /api/posts
 */
exports.createPost = (req, res, next) => {
    // vérification que tous les champs sont remplis
    if (req.body.title === null || req.body.title === '' || req.body.content === null || req.body.content === '') {
        return res.status(400).json({ 'error': "Veuillez remplir les champs 'titre' et 'contenu' pour créer un article" });
    }
    const postObject = req.body;

    // Création d'un nouvel objet post
    const post = new Post({
      ...postObject,//opérateur spread pour faire une copie de la variable
     
    });
    // Enregistrement de l'objet post dans la base de données
    post.save()
        .then(() => res.status(201).json({ message: 'Publication créée !' }))
        .catch(error => res.status(400).json({ error }));
};

/**
 * Récupère toutes les publications de tous les utilisateurs
 * @requête { get }  /api/posts
 */
exports.findAllPosts = (req, res, next) => {
    Post.findAll({
        include:{all:true, nested:true},
        order: [
            ['createdAt', 'DESC'],
        ]
    })
        .then(posts => {
            res.status(200).json({ posts });
        })
        .catch(error => res.status(400).json({ error }));
};

/**
 * Récupère une publication
 * @requête { get }  /api/posts/:id
 */
exports.findOnePost = (req, res, next) => {
    Post.findOne({
        include:{all:true, nested:true},
        where: { id: req.params.id }}) //objet de comparaison avec opérateur de sélection        
  
     .then(post => {res.status(200).json(post)})
     .catch(error => res.status(404).json({ error }));
};
/**
 * Récupère toutes les publications d'un utilisateur en particulier(user_id)
 * @requête { get } /api/posts
 */
exports.findPostsByUserId = (req, res, next) => {
    Post.findAll({
        include:{all:true, nested:true},
        where: { user_id: req.params.id },//objet de comparaison avec opérateur de sélection
        order: [
            ['createdAt', 'DESC'],
        ]
    })
        .then(posts => { res.status(200).json({posts })})
        .catch(error => res.status(400).json({ error }));
};
/**
 * Modifie une publication
 * @requête { PUT } /api/posts/:id
 */
exports.modifyPost = (req, res, next)=>{
    //Opérateur ternaire équivalent à if() {} else {} => condition ? Instruction si vrai : Instruction si faux
    const postObject = req.file?//on regarde si il y a un fichier dans la requête
    {
        ...req.body.post,
        imageurl:req.file.filename
    } : {...req.body};
    Post.update({...postObject, id:req.params.id},{where:{id:req.params.id}})
    .then(()=>res.status(200).json({message:'Publication modifiée !'}))
    .catch(error=>res.status(400).json({error}));
};
/**
 * Suppression d'une publication
 * @requête {DELETE}/api/posts/:id
 */
exports.deletePost = (req, res, next) => {    
        Like.destroy({where: {post_id: req.params.id}})
        .then(() => 
          Comment.destroy({where: {post_id: req.params.id}})
          .then(() => 
            Post.destroy({ where: {id: req.params.id} })
            .then(() => res.status(200).json({ message: 'Publication supprimée !'}))
          )
          )
        .catch(error => res.status(400).json({ error }));
      };
