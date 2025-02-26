import express from 'express'
import cors from 'cors'
import { validarEmail, validarNome, validarTelefone } from './validacao/valida.js'
import { CadastroUsuarios } from './servico/cadastro_servico.js'

const app = express()
app.use(cors())
app.use(express.json())

app.post('/usuarios', async(req, res) => {
    const{nome, email, telefone} = req.body

    if (!validarNome(nome)) {
        return res.status(400).send("Nome inválido! Deve ter pelo menos dois caracteres.");
    }
    if (!validarEmail(email)) {
        return res.status(400).send("E-mail inválido! Use um formato válido.");
    }
    if (!validarTelefone(telefone)) {
        return res.status(400).send("Telefone inválido! Use o formato (XX) XXXXX-XXXX.");
    }
    const resp = await CadastroUsuarios(nome, email, telefone)
    if(resp.affectedRows > 0){
        res.status(202).send("Enviado com sucesso!!")
    }
    else{
        res.status(404).send("Erro interno.")
    }


})

app.listen(3000, () => {
    const data = new Date()
    console.log(`Servidor iniciado em ${data}`)
})