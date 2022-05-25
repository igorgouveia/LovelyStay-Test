import { Router } from "express";
import { fetch, get } from "./app/controllers/mainController";
import { locationQueryParamMiddleware } from "./middlewares/location.query.middleware";
import { nicknameParamMiddleware } from "./middlewares/nickname.middleware";

const router: Router = Router()

router.get("/users", locationQueryParamMiddleware.handle, get);
router.get("/:nickname", nicknameParamMiddleware.handle, fetch);


export { router };