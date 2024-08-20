
    //permitindo uso de rotas
    import express from 'express'
    import { sqlConfig } from "./config.js"
    import sql from 'mssql';
    
    //conexão com MySql (banco)
    const pool = new sql.ConnectionPool(sqlConfig)
    await pool.connect();
    const routes = express.Router();

    //conversor de string para txt
    import exportar from "../functions/fdp.js";
    
    //ROTAS DO PROFESSOR ----------------------------

    routes.get('/modelos', async (req,res)=>{//exibir os modelos já existentes

        try{
            const { recordset }  = await pool.query`select * from modelos`
            return res.status(200).json(recordset)
        }

        catch{
            return res.status(501).json('erro')
        }

    })

    routes.post('/novomodelo', async (req,res)=>{//criar um modelo de redação novo

        try{
            const { titulo, redacao} = req.body;
            await pool.query`insert into Modelos values(${titulo},${redacao}),`
            return res.status(201).json(`ok`)
        }
        catch(error){
            return res.status(501).json('erro ao inserir redação...')
        }

    })

    routes.put('/modelo/:id', async (req, res)=>{//editar modelos já existentes
        try {
            const { id } = req.params
            const { corpo, titulo } = req.body

            await pool.query`update Modelos set descricao = ${descricao}, preco = ${preco} where id = ${id}`
            return res.status(201).json('atualizado')
        } 
        
        catch (error) {
            console.log(error)
            return res.status(501).json('erro ao atualizar produto...')
        }
    })

    
    routes.post('/novomodelo', async (req,res)=>{

        try{
            const { filename, redacao } = req.body;
            const { recordset }  =  exportar(redacao, filename);
            return res.status(200).json(recordset)
        }

        catch{
            return res.status(501).json('erro')
        }

    })

    //ROTAS DO ALUNO ----------------------------

    routes.post('/exportar', async (req,res)=>{

        try{
            const { filename, redacao } = req.body;
            const { recordset }  =  exportar(redacao, filename);
            return res.status(200).json(recordset)
        }

        catch{
            return res.status(501).json('erro')
        }

    })
       
    //exportar para o app
    export default routes

