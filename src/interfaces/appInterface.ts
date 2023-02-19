export interface LoginDto {
  correo: string;
  password: string;
}

export interface RegisterDto {
  nombre: string;
  correo: string;
  password: string;
}

export interface LoginResponse {
  usuario: Usuario;
  token: string;
}

export interface Usuario {
  rol: string;
  estado: boolean;
  google: boolean;
  nombre: string;
  correo: string;
  uid: string;
  img?: string;
}

export interface ProductsResponse {
  total:     number;
  productos: Producto[];
}

export interface Producto {
  precio:    number;
  _id:       string;
  nombre:    string;
  categoria: Categoria;
  usuario:   CreadoPor;
  img:       string;
}

export interface CategoriesResponse {
  total:      number;
  categorias: Categoria[];
}

export interface Categoria {
  _id:     string;
  nombre:  string;
  usuario?: CreadoPor;
}

export interface CreadoPor {
  _id:    string;
  nombre: string;
}


