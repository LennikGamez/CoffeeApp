import { Bohne } from "../DB-Models";

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
}


export default APIConnector