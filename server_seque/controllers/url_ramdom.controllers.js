
//importaçao do banco e modelos
const db = require('../models')
const Url = db.userUrl
const { Router } = require("express")
const { text } = require('body-parser')
const { url } = require('.')

async function generateRandomUrl() {
 
        let text = ''
        let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        for (let i = 0; i < 5; i++) {
            text += letters.charAt(Math.floor(Math.random() * letters.length))
        }
        let random_url = `http://localhost:3000/api/urlramdom/${text}`
        return random_url
}


const router = Router();

router.get('/:code', async (req, res) => {
    console.log("code", req)
    const code = req.params.code
    let link = await Url.findOne({where:{
        new_url: `http://localhost:3000/api/urlramdom/${code}`
    }})
    if(!link){
        return res.status(404).send({"message": "Link nao encontrado"})
    }
    link.hits++
    await link.save()
    
    res.redirect(link.url)
})

router.post('/create', async (req, res) => {
    let newurl = await generateRandomUrl()
    console.log(newurl)
    const url = await Url.create({
        url: req.body.url,
        new_url: `${newurl}`
    })
    res.status(200).send(url)
})

router.put('/update', async (req, res) => {
    let newurl = await generateRandomUrl()
    console.log(newurl)
    const url = await Url.create({
        url: req.body.url,
        new_url: `${newurl}`
    })
    res.status(200).send(url)
})



module.exports = router;
