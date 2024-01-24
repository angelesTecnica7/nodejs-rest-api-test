import {pool} from '../db.js'

//'obteniendo empleados'
export const getEmployees = async(req, res)=>{
   try {
    const [rows] = await pool.query('SELECT * FROM employees')
    if(rows.length <= 0) return res.send('No hay empleados')
    res.json(rows)
   }catch (error){
    return res.status(500).json({
        message: 'Ocurrio un error'
    })
   }
}

//'obteniendo un empleados'
export const getEmployee = async(req, res)=>{
    const id = req.params.id
    try {
    const [rows] = await pool.query('SELECT * FROM employees WHERE id= ?', [req.params.id])
    if(rows.length<= 0) return res.status(404).json({
        message: 'Empleado no encontrado'
    })
    res.json(rows[0])
    }catch (error){
        return res.status(500).json({
            message: 'Ocurrio un error'
        })
    }
}

//'creando empleados'
export const createEmployees = async (req, res)=>{
    const {name, salary} = req.body
    try {//res.send('creando empleados')
    const [rows] = await pool.query('INSERT INTO employees (Name, Salary) VALUES (?, ?)', [name, salary])
    console.log(req.body)
    res.send({
        id: rows.insertId,
        name,
        salary
    })
    }catch (error){
    return res.status(500).json({
        message: 'Ocurrio un error'
    })
    }
    
}

//'Actualizdo datos de  empleados'
export const updateEmployees = async(req, res) => {
    const {name, salary} = req.body
    try {const {id} = req.params
    // console.log(id, name, salary)
    const [result] = await pool.query('UPDATE employees SET Name = IFNULL(?, name), Salary = IFNULL(?, salary) WHERE id = ?', [name, salary, id])
    if(result.affectedRows === 0) return res.status(404).json({
        message: 'Empleado no encontrado'
    })
    // console.log(result)
    res.send('datos Actualizados')
    }catch (error){
    return res.status(500).json({
        message: 'Ocurrio un error'
    })
    }
}

//'eliminando empleados'
export const deleteEmployees = async(req, res)=>{
    try {const id = req.params.id
    const [result] = await pool.query('DELETE FROM employees WHERE id= ?', [req.params.id])
    if(result.affectedRows <= 0) return res.status(404).json({
        message: 'Empleado no encontrado'
    })
    // console.log(result)
    res.send('Empleado eliminado')
    }catch (error){
    return res.status(500).json({
        message: 'Ocurrio un error'
    })
    }

}