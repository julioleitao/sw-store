const centsToDollar = (price) => {
    const dollars = price / 100;
    return dollars.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
};

export default centsToDollar;