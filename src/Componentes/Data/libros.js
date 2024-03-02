let librosArray=[];
let key = 0;

export const agregarLibro= (libro)=>{

    const  libroJson = libro;
    key++;
    libroJson.key = key;
    librosArray.push(libroJson);

   // console.log ("Data libro", librosArray);
}

 export const listarLibros=()=>{
    return librosArray;
 }

 export const obtenerLibroKey= (key)=>{
    const objLibro = librosArray.find(
        libro=> {
            return libro.key === key
        })
    return objLibro;
 }

 export const editarLibros=(dataLibro)=>{
    librosArray.forEach(libro=>{
        if (dataLibro.key==libro.key){
            libro.categoria = dataLibro.categoriae;
            libro.titulo=dataLibro.tituloe;
            libro.autor=dataLibro.autore;
        }
        })
    return librosArray;
 }
export const eliminarLibro = (dataLibro)=>{
    librosArray = librosArray.filter(objLibro=>{return objLibro.key!==dataLibro.key})
    const nuevaDataLibro = listarLibros();
    return nuevaDataLibro;

}

