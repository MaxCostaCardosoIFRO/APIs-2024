import pool from "./conexao.js";
import { executaQuery } from "./executaQuery.js";

export async function DeletaCampeonatos(id){
    const conexao = await pool.getConnection()
    var query = `DELETE from campeonatos WHERE ID=${id}`
    const resposta = executaQuery(conexao, query)

    conexao.release()
    return resposta;
}