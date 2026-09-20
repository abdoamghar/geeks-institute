import { Router } from 'express';

const routes = new Router();

routes.get("/", (req, res) => {
    res.json("home page")
})
routes.get("/about", (req, res) => {
    res.json("about page")
})

export default routes;
