import confg from "../conf/config";
import { Client, Account, ID } from "appwrite";

export class Authservice {
    client = new Client();
    account;


    constructor() {
        this.client
            .setEndpoint(confg.appwriteUrl)
            .setProject(confg.appwriteProjectId);
        this.account = new Account(this.client)
    }



    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                // return userAccount;//call another usermethod//if user is login successfuly we directly login into the page
                return this.login({email,password})

            }
            else {
                return userAccount

            }

        } catch (error) {
            throw error;

        }

    }

    async login({email,password}){
        try {
        return  await this.account.createEmailSession(email,password)
            
        } catch (error) {
            throw error
            
        }
    }

    async getCurrentUser(){
    try {
       return await this.account.get()
        
    } catch (error) {
        console.log("Appwrite service:: getCurrentUser :: error ",error)
        
    }
    return null
    }

    
    async logout (){
        try {
               await this.account.deleteSessions()
            
        } catch (error) {
            console.log("Appwrite service:: logout :: error ",error)

            
        }
    }


}


const authservice = new Authservice()
console.log(authservice)

export default authservice