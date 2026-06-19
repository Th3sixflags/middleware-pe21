import {Request, Response, Router} from 'express';

// 
const router = Router();
const METODO_PAGO = ['Efectivo', 'Transferencia', 'Débito', 'Crédito']

// Post: estudianteId, materias (Arreglo), periodoId, metodo pago
router.post('/', (req: Request, res: Response, next) => {
    //const body = req.body
    const {estudianteId, materias, periodoId, metodo_pago} = req.body;

    if (!estudianteId || !materias?.length || !periodoId || !metodo_pago) {
        console.error('No existe el ID del estudiante')
        res.status(400).json(
            {
                error: 'Campos requeridos del estudianteId, materias, periodoId, metodo_pago'
            }
        )
    }

    if(!METODO_PAGO.includes(metodo_pago)){
        console.error('El metodo de pago insertado no es válido');
        res.status(400).json({
            error: 'El metodo de pago insertado debe ser: Efectivo, Débito, Crédito o Transferencia'
        })
    }

    res.status(201).json({
        version: 'v2',
        message:{
            estudianteId, materias, periodoId, metodo_pago
        }
    })
})

export default router;