const getObjectParamValue = (obj: Object, param:string) =>{
    //velho deve ter inf maneiras de fazer isso em ts mas vou fazer assim pq achei divertido
    return Object.values(obj)[Object.keys(obj).indexOf(param)];
}

export default getObjectParamValue;