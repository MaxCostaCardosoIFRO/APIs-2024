import express from 'express'
import cors from 'cors'
import { retornaCampeonatos, retornaCampeonatosAno, retornaCampeonatosID, retornaCampeonatosTime } from './servico/retornaCampeonatos_servico.js'
import { AtualizaCampeonato, AtualizaCampeonatoParcial } from './servico/atualizaCampeonato_servico.js'
import e from 'express'
import { DeletaCampeonatos } from './servico/deletaCampeonatos_servico.js'

const app = express()
app.use(cors())
app.use(express.json())

// app.listen(9000, async() => {
//     const data = new Date()
//     console.log(`Servidor node iniciado em ${data}`)

//     const conexao = await pool.getConnection()
//     console.log(conexao.threadId)

//     conexao.release()
// })

app.delete('/campeonatos/:id', async(req, res) => {
    const{id} = req.params
    const resp = await DeletaCampeonatos(id)
    if(resp.affectedRows > 0){
        res.status(202).send("Registro deletado com sucesso.")
    }
    else{
        res.status(404).send("Não existe um registro para o id informado.")
    }
})

app.put('/campeonatos/:id', async(req, res) => {
    const{id} = req.params;
    const {campeao, vice, ano} = req.body;
    // const vice = req.body
    // const ano = req.body

    if (campeao == undefined || vice == undefined || ano == undefined) {
        res.status(400).send("Nem todos os campos foram informados")
    } else {
        const resp = await AtualizaCampeonato(id, campeao, vice, ano)
        if(resp.affectedRows > 0){
            res.status(202).send("Registro alterado com sucesso.")
        }
        else{
            res.status(400).send("Não existe um registro para o id informado.")
        }
    }
})

app.patch('/campeonatos/:id', async (req, res) => {
    const {id} = req.params
    const {campeao, vice, ano} = req.body

    const camposAtualizar = {};
    if (campeao) camposAtualizar.campeao = campeao;
    if (vice) camposAtualizar.vice = vice;
    if (ano) camposAtualizar.ano = ano;

    if (Object.keys(camposAtualizar).length == 0) {
        res.status(400).send("Nenhum campo válido foi enviado")

    }else{
        const resultado = await AtualizaCampeonatoParcial(id, camposAtualizar)
        if (resultado.affectedRows > 0){
            res.status(202).send("Registro atualizado com suceso.")
        }
        else{
            res.status(404).send("Registro não encontrado.")
        }
    }
})

app.get('/campeonatos', async(req, res) => {
 
    const ano = req.query.ano
    const time = req.query.time
    let campeonatos;

    if(typeof ano === 'undefined' && typeof time === 'undefined'){
        campeonatos = await retornaCampeonatos()
    }
    else if(typeof ano !== 'undefined'){
        campeonatos = await retornaCampeonatosAno(ano)
    }
    else if (typeof time !== 'undefined'){
        campeonatos = await retornaCampeonatosTime(time)
    }

    if (campeonatos.length > 0){
        res.json(campeonatos)
    }
    else{
        res.status(404).json({mensagem: "Nenhum campeonato encontrado"})
    }
})

app.get('/campeonatos/:id', async(req, res) => {
    const id = parseInt(req.params.id)
    if (id <= 0 ){
        console.log('caiu')
        res.status(404).json({mensagem: "Erro"})
        return
    }

    const campeonato = await retornaCampeonatosID(id)
    
    if(campeonato.length > 0){
        res.json(campeonato)
    }
    else{
        res.status(404).json({mensagem: "Nenhum campeonato foi encontrado"})
    }
})


app.listen(9000, () => {
    const data = new Date()
    console.log(`Servidor iniciado em ${data}`)
})