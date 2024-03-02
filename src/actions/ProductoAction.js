import HttpCliente from '../servicios/HttpCliente';
import axios from 'axios';

const instancia = axios.create();
instancia.calcelToken = axios.CancelToken;
instancia.isCancel = axios.isCancel;



export const getProductos = (request)=>{
console.log(request);
    return new Promise ((resolve, rejet)=>{
        instancia.get(`/api/Producto?pageIndex=${request.pageIndex}&pageSize=${request.pageSize}&search=${request.search}`).then(response =>{
            resolve(response);
        });
    });

};

