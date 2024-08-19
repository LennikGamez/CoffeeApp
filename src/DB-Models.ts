
type Bohne = {
    Name: string,
    Röster: string,
    Website: string,
    Notiz: string,
    VorhandendeMenge: number
}


type Brühung = {
    BrühID: number,
    BohnenName: string,
    BrühmethodenName: string,
    GetränkeMenge: number,
    Mahlgrad: number,
    BohnenMenge: number,
    Brühtemperatur: number
    zubereitet: boolean,
    Notiz: string
}


export type { Bohne, Brühung }