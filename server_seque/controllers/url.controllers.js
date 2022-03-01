//importaçao do banco e modelos
const db = require('../models')
const Url = db.userUrl
const { Router } = require("express")
const router = Router();
const api_adress = "http://localhost:3000/api/urlramdom/"


router.get('/list/:id', async (req, res) => {
    const url = await Url.findAll({where:{user_id:req.params.id}})
    res.status(200).json(url)
})

router.get('/', async (req, res) => {
    const url = await Url.findAll()
    res.status(200).json(url)
})

router.post('/create', async (req, res) => {
    try {
        let validation = await Url.findOne({
            where: {
                new_url: `${api_adress}${req.body.new_url}`
            }
        })
        if (validation) {
            throw `Url ja criada com o mesmo nome`
        }else{
            const url = await Url.create({
                url: req.body.url,
                new_url: `${api_adress}${req.body.new_url}`,
                user_id:req.body.user_id
            })
            res.status(200).send({
                "url": url,
                "success": true
            })
        }
        
    } catch (error) {
        res.status(500).send({
            "message": error,
            "success": false
        })
    }

})
router.put('/create/:id', async (req, res) => {
    try {
        let validation = await Url.findOne({
            where: {
                new_url: req.body.new_url
            }
        })
        if (validation) {
            throw `Url ja criada com o mesmo nome`
        }else{
            let update = await Url.findOne({
                where: {
                    id: req.params.id
                }
            })
    
            update.new_url = `${api_adress}${req.body.new_url}`
            await update.save()
    
            res.status(200).send({
                "url": url,
                "success": true
            })
        }
    } catch (error) {
        res.status(200).send({
            "message": error,
            "success": false
        })
    }

})
router.delete("/delete/:id", async (req, res) => {
    let del = await Url.findOne({
        where: {
            id: req.params.id
        }
    })
    await del.destroy()
})

module.exports = router;