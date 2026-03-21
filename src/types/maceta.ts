export interface Maceta {  
id: number
  nombre: string
  precio: number
  stock: number

  color: {
    id: number
    nombre: string
  }

  diseno: {
    id: number
    nombre: string
  }

  modelo: {
    id: number
    nombre: string
  }

  tamano: {
    id: number
    nombre: string
  }
}