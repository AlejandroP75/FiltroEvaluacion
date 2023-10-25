 export class camper {
    constructor(documento, nombre, telefono, correo, grupo, puntos){
        this.documento = documento;
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.grupo = grupo;
        this.puntos = puntos;
    }
    modificar(documento, nombre, telefono, correo, grupo, puntos){
        this.documento = documento;
        this.nombre = nombre;
        this.telefono = telefono;
        this.correo = correo;
        this.grupo = grupo;
        this.puntos = puntos;
    }
    static fromJSON(json) {
        const {documento, nombre, telefono, correo, grupo, puntos} = JSON.parse(json);
        return new cliente(documento, nombre, telefono, correo, grupo, puntos);
    }
}

export class concepto {
    constructor(id, descripcion, valor){
        this.id = id;
        this.descripcion = descripcion;
        this.valor = valor;
    }
}