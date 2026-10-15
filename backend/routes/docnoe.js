const expres = require('express')
const db =require('../db')
const router = expres.Router()

router.get('/',async(req,res)=>{
    try {
        
        const [rows] = await db.query(`select * from tb_doc where id_doc`)
        res.json(rows[0])
    } catch (error) {
        console.error('error get doc',error)
        res.status(500).json({message:'Error Get doc'})
    }
})
module.exports = router