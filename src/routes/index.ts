import express from 'express'
import usersRouter from './users';

function getRoutes() {
    const router = express.Router()
    router.use('/users', usersRouter)
    return router
}
export {getRoutes}
