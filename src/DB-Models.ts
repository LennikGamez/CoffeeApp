
type Bohne = {
    Name: string,
    Röster: string,
    Website: string,
    Notiz: string,
    VorhandendeMenge: number | null,
    Röstgrad: number | null;
}


type Brühung = {
    BrühID: number,
    BohnenName: string,
    BrühmethodenName: string,
    Getränkemenge: number,
    Mahlgrad: number,
    Bohnenmenge: number,
    Brühtemperatur: number
    zubereitet: number,
    Notiz: string
}


export type { Bohne, Brühung }