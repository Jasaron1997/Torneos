import { Router } from 'express'
const router = Router();
import authenticateToken from '../utils/authenticateToken';


// Controllers
import {getUsuario,postUsuario,deleteUsuario,getOneUsuario,putUsuario} from '../controllers/usuario.controller';
// Routes
router.post('/',authenticateToken, postUsuario);
router.get('/',authenticateToken, getUsuario);
router.delete('/:ID_USUARIO',authenticateToken, deleteUsuario);
router.put('/:ID_USUARIO',authenticateToken, putUsuario);
router.get('/:ID_USUARIO',authenticateToken, getOneUsuario);


export default router;