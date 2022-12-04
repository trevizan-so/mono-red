# PRICE SCRAP

the main objective of this project is to fetch available card price at liga magic

study:
    variable containing average price : g_avgprice
    var example: 
    {
        "479945":{
            "precoMenor":1,
            "precoMedio":882355.47,
            "precoMaior":99999999.99,
            "extras":{
                "2":{
                    "precoMenor":2.5,
                    "precoMedio":636946.97,
                    "precoMaior":99999999.99
                }
            }
        }
    }
    
    Extras stands for Foil card
    the problem here is to crack the card id, this is gonna be different according to set and if the card is a variant

    varaible containing card set : vetPorEdicao : 2D array
    var example:
    vetPorEdicao[3] = [
        "1", 
        "207", 
        "Izzy", 
        "mm3", 
        "//repositorio.sbrauble.com/arquivos/in/magic/145754/6255f7d53877e-a5qvd-6m5zn-5709795596255f7d5387c5.jpg",
        "Modern Masters 2017",
        "1", 
        "145754", 
        "2017-02-23"]
    
    this variable maps the card id to card edition, we can use it to fecth the set name

I really think that getting this variables is easier than using standard webscrapping.
