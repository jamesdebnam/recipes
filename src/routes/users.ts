import express from 'express';
import User, {IUser} from '../models/user';
import logger from "loglevel";
import passport from "passport";

const router = express.Router();
router.route('/')
  .get(async (req, res) => {
    try {
      const users = await User.find({});
      console.log('user', req.user)
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
      User.register(newUser, req.body.password, (err, user) => {
        if (err) {
          res.status(400).send({status: 'error', message: err.message ? err.message : 'Could not register user'})
        } else {
          res.status(200).send({status: 'ok', data: newUser.getUserObj()})
        }
      })
    } catch ({message}) {
      return res.status(500).send({status: 'error', message})
    }
  })

router.post('/login', async (req, res) => {
  try {

    const user = await User.findOne({email: req.body.email.toLowerCase()});
    if (!user) {
      return res.status(400).send({status: 'error', message: "No user with that email found"})
    }
    passport.authenticate('local')(req, res, () => {
      res.status(200).send({status: 'ok', data: (req.user as IUser).getUserObj()})
    });
  } catch ({message}) {
    res.status(400).send({status: 'error', message})
  }
})

export default router
