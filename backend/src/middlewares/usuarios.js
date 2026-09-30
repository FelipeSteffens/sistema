import jwt from 'jsonwebtoken'

export const authenticate = (req, res, next) => {
    const [scheme, token] = (req.headers.authorization || "").split(" ")

    if(scheme !== "Bearer" || !token){
        return res.status(401).json({message: "Login necessário"});
    }
    
    try {
        req.usuarios = jwt.verify(token, process.env.JWT_SECRET, {algorithms: ["HS256"]})
    } catch (error) {
        return res.status(401).json({message: "Sessão inválida ou expirada"})
    }
    next()
}