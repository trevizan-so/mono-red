const formatStringToUrlParam = (inputString: string) =>{
    return inputString.replace(" ","+");
}

export default formatStringToUrlParam;