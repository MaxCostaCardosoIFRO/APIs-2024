import pool from "./conexao.js";
import { executaQuery } from "./executaQuery.js";

export async function AtualizaCampeonato(id, campeao, vice, ano){
    const conexao = await pool.getConnection();
    const query = `UPDATE campeonatos SET campeao='${campeao}', vice='${vice}', ano=${ano} WHERE id =${id}`
    const res = executaQuery(conexao, query)
    console.log(campeonato)
    conexao.release();
    
    return res;
}

export async function AtualizaCampeonatoParcial(id, campos){
    const conexao = await pool.getConnection();

    const colunas = Object.keys(campos).map(campos => `${campos} = ?`).join(", ");
    const valores = Object.values(campos)

    const query = `UPDATE campeonatos SET ${colunas} WHERE id=${id}`
    const [resposta] = await conexao.execute(query, valores)
    console.log(query)

    conexao.release()
    return resposta;
}

//nome do arquivo AtualizaCampeonato