const {spawn} = require('child_process');

const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'this is the api route'
  });
});

router.post('/', async(req,res,next)=>{
	// instantiate a new process using the commands sent in req.body
	const {body} = req
	let output = ''
	try{
		let commandProc = spawn(body.command,body.args)
		commandProc.stdout.on('data',(data)=>{
			output+=data; 
		})
		commandProc.stderr.on('data',(data)=>{
			output+=data
		})
		commandProc.on('close',code=>res.json({"console Ouput":output,"exit Code":code}))
	}catch(err){
		next(err)
	}
})

module.exports = router;
