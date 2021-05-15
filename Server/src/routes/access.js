import { Router } from 'express'
const router = Router();
import authenticateToken from '../utils/authenticateToken';


// Controllers
import {getAcceso,getOneAcceso,postAcceso,putAcceso,getAccesoInactivo,estadoAcceso} from '../controllers/access.controller';

// Routes
router.post('/',authenticateToken, postAcceso);
router.get('/',authenticateToken, getAcceso);
router.get('/inactivo',authenticateToken, getAccesoInactivo);
router.delete('/:ID_ACCESO/:ESTADO',authenticateToken, estadoAcceso);
router.put('/:ID_ACCESO',authenticateToken, putAcceso);
router.get('/:ID_ACCESO',authenticateToken, getOneAcceso)

export default router;