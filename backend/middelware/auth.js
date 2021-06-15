//vérifie que l'utilisateur est authentifié avant d'autoriser l'envoi de ses requêtes
//importation du package pour créer et verifier les TOKENS
const jwt = require('jsonwebtoken');
// Création d'une authentification avec TOKEN 
module.exports = (req, res, next) => {
    try {
        //recupère le token dans le header en oubliant le mot clé Bearer
        const token = req.headers.authorization.split(' ')[1];//crée un tableau et récupère l'élément aprés l'espace
        //décode le token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        //récupere l'userId
        const user_id = decodedToken.user_id;
        //vérifie si l'userId de la requête correspond à celui du token 
        if (req.body.user_id && req.body.user_id !== user_id) {
            throw 'User ID non valable !';
        } else {
            //passe la requête au prochain middelware
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Requête non authentifiée !')
        });
    }
};