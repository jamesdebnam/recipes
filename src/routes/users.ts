import express from 'express';
import User from '../models/user';
import logger from "loglevel";

const router = express.Router();
router.route('/')
  .get(async (req, res) => {
    try {
      const users = await User.find({});
      if (!users) {
        return res.status(404).send({status: 'error', message: 'No users found'});
      }
      return res.status(200).send({status: 'ok', data: users});
    } catch ({message}) {
      return res.status(500).send({status: 'error', message})
    }
  })
  .post(async (req, res) => {
    try {
      logger.info(req.body)
      const newUser = new User(req.body)
      User.register(newUser, req.body.password, (err, user)=> {
        if (err) {
          res.status(400).send({status: 'error', message: err.message? err.message : 'Could not register user'})
        } else {
          res.status(200).send({status: 'ok', data: newUser.getUserObj()})
        }
      })
    } catch ({message}) {
      return res.status(500).send({status: 'error', message})
    }
  })

router.post('/login', async (req, res) => {
  const user = await User.findOne({email: req.body.email});
  if (!user) {
    return res.status(400).send({status: 'error', message: "No user with that email found"})
  }
  user.authenticate(req.body.password, (err, user) => {
    if (err) {
      res.status(400).send({status:'error', message: err.message ? err.message : "Authentication unsuccessful"})
    } else {
      res.status(200).send({status: 'ok', data: user.getUserObj()})
    }

  })
})

export default router
