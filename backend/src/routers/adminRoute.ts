import { Router, Request,Response} from "express";
import adminController from "../controllers/adminController";
const router = Router();

router.get('/users',

// (req: Request , res : Response)=>{
//     res.send('came')
// }

adminController.getAllUsers
)

router.get('/search', adminController.getSearch)

export default router;