import { Router } from 'express'
const router = Router();
import authenticateToken from '../utils/authenticateToken';


// Controllers
import {getRoles,getOneRoles,postRoles,putRoles,getRolesInactivo,estadoRoles} from '../controllers/roles.controller';

// Routes
router.post('/',authenticateToken, postRoles);
router.get('/',authenticateToken, getRoles);
router.get('/inactivo',authenticateToken, getRolesInactivo);
router.delete('/:ID_ROL/:ESTADO',authenticateToken, estadoRoles);
router.put('/:ID_ROL',authenticateToken, putRoles);
router.get('/:ID_ROL',authenticateToken, getOneRoles)

export default router;