import pool from "./conexao.js";

export async function CadastroUsuarios(nome, email, telefone){
    const conexao = await pool.getConnection();
    const query = `INSERT INTO usuarios (nome, email, telefone) VALUES ('${nome}', '${email}', '${telefone}');`
    const [res] = await conexao.execute(query);
    conexao.release();
    
    return res;
}