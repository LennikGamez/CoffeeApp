import { Bohne, Brühung } from "../DB-Models";

class APIConnector{
    static SERVER = "http://localhost:3000"; 

    public static endpoint(endpoint: string): string{
        return APIConnector.SERVER + endpoint
    }
    public static async getBohnen(): Promise<Bohne[]>{
        const resp = await fetch(APIConnector.endpoint("/beans"));
        return await resp.json() as Bohne[];
    }

    public static async addBohnen(bohne: Bohne): Promise<boolean>{
        const resp = await fetch(APIConnector.endpoint("/beans"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bohne)
        })
        return await resp.ok;
    }

    public static async updateBohnen(oldName:string, bohne: Bohne): Promise<boolean>{
        const resp = await fetch(APIConnector.endpoint("/beans/" + oldName), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bohne)
        })
        return await resp.ok;
    }

    public static async deleteBohnen(name: string): Promise<boolean>{
        const resp = await fetch(APIConnector.endpoint("/beans/" + name), {
            method: "DELETE"
        })
        return await resp.ok;
    }

    public static async getBohne(name: string): Promise<Bohne>{
        const resp = await fetch(APIConnector.endpoint("/beans/" + name));
        return await resp.json() as Bohne;
    }

    public static async getBohnenCount(name: string): Promise<number>{
        const resp = await fetch(APIConnector.endpoint("/beans-count/" + name));
        return await resp.json() as number;
    }

    public static async getMethods(): Promise<string[]>{
        const resp = await fetch(APIConnector.endpoint("/methods"));
        return await resp.json() as string[];
    }

    public static async getBohnenNames(): Promise<string[]>{
        const resp = await fetch(APIConnector.endpoint("/beannames"));
        return await resp.json() as string[];
    }

    public static async addBrühung(brühung: Brühung){
        const resp = await fetch(APIConnector.endpoint("/brew"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(brühung)
        })        
        return await resp.json() as {id: number};
    }

    public static async doesBrühungExist(brühung: Brühung): Promise<Brühung>{
        const resp = await fetch(APIConnector.endpoint("/brew-exists"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(brühung)
        })
        const data: Brühung[] = await resp.json();
        return data[0];
    }
    public static async addToBrühung(brühung: Brühung): Promise<boolean>{
        const resp = await fetch(APIConnector.endpoint("/brew-count"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(brühung)
        });
        return await resp.ok;
    }


    public static async reduceBeanCount(name: string, count: number): Promise<boolean>{
        const resp = await fetch(APIConnector.endpoint("/reduce-bean"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({BohnenName: name, Bohnenmenge: count})
        });
        return await resp.ok;
    }


    // Rezepte

    public static async getRezept(methode: string, bohne: string): Promise<Brühung>{
        const resp = await fetch(APIConnector.endpoint("/rezept/" + methode + "/" + bohne));
        return await resp.json() as Brühung;
    }

    public static async saveAsRecipe(methode: string, bohne: string, BrühID: number): Promise<boolean>{
        const resp = await fetch(APIConnector.endpoint("/save-rezept"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({BrühID: BrühID, Methode: methode, Bohne: bohne})
        });        
        return await resp.ok;
    }
}


export default APIConnector