import confg from "../conf/config";
import { Client, ID, Databases, Storage, Query } from "appwrite";



export class Service {

    client = new Client()
    databases;
    bucket;


    constructor() {
        this.client
            .setEndpoint(confg.appwriteUrl)
            .setProject(confg.appwriteProjectId);
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)

    }

    //using services for :: database -like Createpost,deletepost,updatepost,getpost,getposts
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                confg.appwriteDataBaseId, 
                confg.appwriteCollectionId, 
                slug, 
                {
                     title,
                     content,
                      featuredImage,
                       status,
                        userId })

        } catch (error) {
            console.log("CreatePost ::", error)

        }
    }


    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(confg.appwriteDataBaseId, confg.appwriteCollectionId, slug, { title, content, featuredImage, status })

        } catch (error) {
            console.log("updatePost ::", error)



        }
    }

    async deletePost(slug) {
        try {

            await this.databases.deleteDocument(confg.appwriteDataBaseId, confg.appwriteCollectionId, slug)

            return true

        } catch (error) {
            console.log("deletePost ::", error)
            return false



        }
    }




    async getPost(slug) {
        try {
            return await this.databases.getDocument(confg.appwriteDataBaseId, confg.appwriteCollectionId, slug)

        } catch (error) {
            console.log("getPost ::", error)
            return false



        }
    }


    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(confg.appwriteDataBaseId, confg.appwriteCollectionId, queries,
                )

        } catch (error) {
            console.log("getPosts ::", error)
            return false



        }
    }

    ////using services for :: storage :: inthis case::bucket ::like method file 

    async uploadFile(file ) {
        try {
            return await this.bucket.createFile(confg.appwriteBucketId, ID.unique(), file)

        } catch (error) {
            console.log("uploadFile ::", error)
            return false


        }

    }


    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(confg.appwriteBucketId, ID.unique(), fileId)
            return true

        }

        catch (error) {
            console.log("deleteFile ::", error)
            return false


        }

    }

    getFilePreview(fileId) {

        return this.bucket.getFilePreview(confg.appwriteBucketId, fileId)





    }

}

const service = new Service()
export default service

