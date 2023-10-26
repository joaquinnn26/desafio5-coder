import { cartsModel } from "../../db/models/carts.model.js";
/* import { prodmanager } from "./productManagerMongo.js"; */

class CartsManager {
    async createCart() {
        const result = await cartsModel.create({products: []});
        return result;
    }


    async getCartProducts(cid) {
        const result = await cartsModel.findById(cid);
        return result;                    
    }


    async addProductToCart(cid, pid){
        const selectedCart = await cartsModel.findById(cid);        
        if (selectedCart) {
            const productIndex = selectedCart.products.findIndex(p => p.pid === pid);
    
            if (productIndex !== -1) {
                selectedCart.products[productIndex].quantity += 1;
            } else {
                selectedCart.products.push({
                    pid,
                    quantity: 1
                });
            }
            await cartsModel.updateOne({ _id: cid }, {products: selectedCart.products});            
        return selectedCart;
        }
        
        /* try{
            if (existsSync(this.path)){
                const cartProductsFile= await promises.readFile(this.path, 'utf-8')
                
                const cartProductsParseado= JSON.parse(cartProductsFile)
                const selectedCart = cartProductsParseado.find(c=> c.id === cid)
    
                if (selectedCart){
                    const product = await prodmanager.getProductById(pid);
                    if (!product) {
                      throw new Error("There is no product with this id");
                    }
    
                    const prodExists = selectedCart.products.find(p=>p.pid === pid)
                    if (prodExists) {
                        const index = selectedCart.products.findIndex(p=> p.pid == pid)
                        selectedCart.products[index].quantity += 1                    
                    }else{
                        const newProd ={
                            pid, 
                            quantity: 1
                        }
                        selectedCart.products.push(newProd)                    
                    }
                    
                    await promises.writeFile(this.path, JSON.stringify(cartProductsParseado))
                }            
                return selectedCart            
            }else{
                throw new Error("The file does not exist");
            }
        }
        catch(error){
            throw new Error(error.message);
        }  */ 
        }    
}

export const cManager = new CartsManager();