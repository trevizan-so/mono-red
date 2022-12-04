class InputData{
    cardName: string;
    isFoil: boolean;
    set?: string;
    // necessario um set aqui, vai forçar um numero ou enum que será mapeado, por enquanto vai sem mesmo
    constructor(){
        this.cardName = "";
        this.isFoil = false;
        this.set = "";
    }
}

class OutputData{
    cardName:string;
    searchTimestamp:string;
    prices: CardPrice[];
    constructor(){
        this.cardName = "";
        this.searchTimestamp = "";
        this.prices = [];
    }
}

interface CardPrice{
    id: string;
    set: string;
    setAbreviation: string;
    lowestPrice: number;
    meanPrice: number;
    highestPrice: number;
}

export {
    InputData,
    OutputData,
    CardPrice
}