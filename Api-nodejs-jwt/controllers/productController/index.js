const Product = require('../../models/Product');


const ProductController = {

    async createProduct(req, res){
        const productData = req.body;

        try {
            const newProduct = await Product.create(productData);
            return res.status(201).json(newProduct);
        } catch (error) {
            return res.status(400).json({error: "Erro ao cadastrar o produto!" })
        }
    },

    async updateProduct(req, res){
        
        const bodyData=req.body;
        const { product_id}=req.params;
        
        try {
            const updateProduct= await Product.findByIdAndUpdate(product_id, bodyData, {new: true});
             if (!updateProduct) {
            return res.status(404).json({ message: "Produto não encontrado" });
            }

            return res.status(200).json({
            message: "Produto atualizado com sucesso",
            produto: updateProduct
            });

        } catch (error) {
            res.status(400).json({error: "Erro ao atualizar o produto"})
        }
    },

    async getProductsByUser(req, res){

        const { user_id}= req.params;

        try {
            const products = await Product.find({ user: user_id});
            return res.status(200).json(products);    
        } catch (error) {
            res.status(400).json({error: "Erro ao buscar produtos do usuario"})
        }
    },

    async deleteProduct(req, res){
        const {product_id}=req.params;

        try {
            const deletedProduct=await Product.findByIdAndDelete(product_id);
            return res.status(200).json(deletedProduct);
        } catch (error) {
            res.status(400).json({error: "Erro ao deletar o produto"});
        }

    },

    async getProducts(req, res){

        try {
            const products=await Product.find();
            return res.status(200).json(products);
        } catch (error) {
            res.status(400).json({error: "Erro ao buscar produtos"});
        }
    },

    async getProductById(req, res){
        try {
            const {product_id}=req.params;
            const product =await Product.findById(product_id);
            return res.status(200).json(product);
        } catch (error) {
            res.status(400).json({error: "Erro ao buscar o produto pelo id"});
        }
    }

}

module.exports = ProductController;