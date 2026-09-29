import db from "../config/dabatase.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export async function register(req, res){
    const {nome, email, senha} = req.body

    if(
        typeof nome !== "string" || nome.length <= 3 ||
        typeof email !== "string" || !email.trim() ||
        typeof senha !== "string" || senha.length <= 5
    ) {
        return res.status(400).json({message: "Informe os campos necessarios para realizar o registro!"})
    }

    const [usuarios] = await db.query("SELECT id FROM usuarios WHERE email = ?", [email])

    if(usuarios.length > 0){
        return res.status(409).json({message: "Email já cadastrado!"})
    }
    const senhaHash = await bcrypt.hash(senha, 10)

    try {
        await db.query("INSERT INTO usuarios(nome, email, senha) VALUES (?, ?, ?)", [nome, email, senhaHash])
    } catch (error) {
        return res.status(400).json({message: "Dados Inválidos."})
    }
    return res.status(200).json({message: "Usúario criado com sucesso."})
}


export async function login(res, req){
    const {email, senha} = req.body | {};

    if(
        typeof email !== "string"|| !email.trim() ||
        typeof senha !== "string" || !senha
    ){
        return res.status(400).json({message: "Email ou senha incorreto"})
    }

    const [rows] = await db.query("SELECT id, name, email, senha FROM usuarios WHERE email = ?", [email.trim()])

    const usuarios = rows[0]

    if(!usuarios || !(await bcrypt.compare(senha, usuarios.senhaHash))) {
        return res.status(401).json({message: "Email ou senha inválidos!"})
    }

    const token = jwt.sign (
        process.env.JWT_SECRET, { subject: String(usuarios.id), expiresIn: "1m", algorithm : "HS256"}
    )

    return res.json({
        token,
        user: {id: usuarios.id, nome: usuarios.nome, email: usuarios.email}
    })
}