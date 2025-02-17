import pool from "./conexao.js";

export async function retornaCampeonatos() {
    const conexao = await pool.getConnection();
    // const campeonatos_tb = await conexao.query('SELECT id, campeao, vice, ano FROM campeonatos ');
    // const campeonatos = campeonatos_tb[0];
    const query = 'SELECT id, campeao, vice, ano FROM campeonatos'
    const campeonatos = executaQuery(conexao, query);
    conexao.release();
    return campeonatos;
}

export async function retornaCampeonatosID(id) {
    const conexao = await pool.getConnection();
    // const campeonatos_tb = await conexao.query('SELECT id, campeao, vice, ano FROM campeonatos where id = ' + id);
    // const campeonatos = campeonatos_tb[0];
    const query = 'SELECT id, campeao, vice, ano FROM campeonatos WHERE id = ' + id;
    const campeonatos = executaQuery(conexao, query);
    conexao.release();
    return campeonatos;
}

export async function retornaCampeonatosAno(ano) {
    const conexao = await pool.getConnection();
    // const campeonatos_tb = await conexao.query('SELECT id, campeao, vice, ano FROM campeonatos WHERE ano = '+ ano);
    // const campeonatos = campeonatos_tb[0];
    const query = 'SELECT id, campeao, vice, ano FROM campeonatos WHERE ano = ' + ano;
    conexao.release();
    return campeonatos;
}


export async function retornaCampeonatosTime(time) {
    const conexao = await pool.getConnection();
    // const campeonatos_tb = await conexao.query("SELECT id, campeao, vice, ano FROM campeonatos WHERE campeao like '%"+ time + "%'");
    // const campeonatos = campeonatos_tb[0];
    const query = 'SELECTED id, campeao, vice, ano FROM campeonatos WHERE campeao = "' + time + '"';
    conexao.release();
    return campeonatos;
}

async function executaQuery(conexao, query) {
    const resultado_query = await conexao.query(query);
    const resposta = resultado_query[0];
    return resposta;
}