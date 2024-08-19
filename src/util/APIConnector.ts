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

    public static async getMethods(): Promise<string[]>{
        const resp = await fetch(APIConnector.endpoint("/methods"));
        return await resp.json() as string[];
    }

    public static async getBohnenNames(): Promise<string[]>{
        const resp = await fetch(APIConnector.endpoint("/beannames"));
        return await resp.json() as string[];
    }

    public static async addBrühung(brühung: Brühung): Promise<boolean>{
        const resp = await fetch(APIConnector.endpoint("/brew"), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(brühung)
        })
        return await resp.ok;
    }

    public static async doesBrühungExist(brühung: Brühung): Promise<boolean>{
        const resp = await fetch(APIConnector.endpoint("/brew-exists"), {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(brühung)
        })
        const data: Brühung[] = await resp.json();
        if (data.length > 0) {
            APIConnector.addToBrühung(data[0]);
            return true;
        }else{
            APIConnector.addBrühung(brühung);
            return false;
        }
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
}


export default APIConnector