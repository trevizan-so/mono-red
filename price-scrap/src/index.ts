import { InputData, OutputData, CardPrice } from "./dto";
import fetchCardPrice from "./service/FetchCardPrice";

// import MagicSiteScrapper from "./service/PuppeterService"; // legado dessa criança fo
(async () => {
    const input: InputData = {
        cardName: "Embercleave",
        isFoil: true,
    }

    // faz sentido jogar para um objeto se considera a questao de limitar foil e set;
    // por que sao varios processos diferentes. ou nao sei la
    const cardPrices: CardPrice[] = await fetchCardPrice(input.cardName);

    const output: OutputData = {
        cardName: input.cardName,
        searchTimestamp: new Date(Date.now()).toUTCString(),
        prices: input.set ? [cardPrices.find(price => price.setAbreviation === input.set)] : cardPrices,
    }

    console.log(output)


})();

