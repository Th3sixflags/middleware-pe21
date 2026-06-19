import {Request, Response, Router} from 'express';

// 
const router = Router();

// Post: estudianteId, materias (Arreglo), periodoId
router.post('/', (req: Request, res: Response, next) => {
    //const body = req.body
    const {estudianteId, materias, periodoId} = req.body;

    if (!estudianteId || !materias?.length || !periodoId) {
        console.error('No existe el ID del estudiante')
        res.status(400).json(
            {
                error: 'Campos requeridos del estudianteId, materias, periodoId'
            }
        )
    }

    res.status(201).json({
        version: 'v1',
        message:{
            estudianteId, materias, periodoId
        }
    })
})

export default router;