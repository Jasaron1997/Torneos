import { Router } from 'express'
const router = Router();
import authenticateToken from '../utils/authenticateToken';


// Controllers
import {Create,Update,Delete,All,Find} from '../controllers/equipos.controller';
// Routes
router.post('/Create',authenticateToken, Create);
router.get('/All',authenticateToken, All);
router.post('/Delete',authenticateToken, Delete);
router.put('/Update',authenticateToken, Update);
router.get('/FIND/:ID',authenticateToken, Find);


export default router;