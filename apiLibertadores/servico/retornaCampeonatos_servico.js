import pool from "./conexao.js";
import { executaQuery } from "./executaQuery.js";

export async function retornaCampeonatos(){
    const conexao = await pool.getConnection()
    const query = "SELECT * FROM campeonatos"
    const campeonato = executaQuery(conexao, query)
    conexao.release()

    return campeonato
}

export async function retornaCampeonatosID(id){
    const conexao = await pool.getConnection()
    const query = `SELECT * FROM campeonatos WHERE id=${id}`
    const campeonato = executaQuery(conexao, query)
    conexao.release()

    return campeonato
}

export async function retornaCampeonatosAno(ano){
    const conexao = await pool.getConnection()
    const query = `SELECT * FROM campeonatos WHERE ano=${ano}`
    const campeonato = executaQuery(conexao, query)
    conexao.release()

    return campeonato
}

export async function retornaCampeonatosTime(time){
    const conexao = await pool.getConnection()
    const query = `SELECT * FROM campeonatos WHERE time=${time}`
    const campeonato = executaQuery(conexao, query)
    conexao.release(0)

    return campeonato
}
//nome do arquivo retornaCampeonatos