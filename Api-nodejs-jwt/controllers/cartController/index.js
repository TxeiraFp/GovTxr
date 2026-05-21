const Cart = require('../../models/Cart');

const CartController ={

    async createCart(req, res){
        const cartData=req.body;

        try {
           const cartCreated=await Cart.create(cartData);
           res.status(200).json(cartCreated); 
        } catch (error) {
            res.status(400).json({message: "Erro ao criar seu carrinho", error: error.message});
        }
    },

    async getCartByUser(req, res){
        const {user_id}=req.params;

        try {
            const userCart=await Cart.findOne(user_id);
            res.status(200).json(userCart);
        } catch (error) {
            res.status(400).json({message: "Erro ao buscar carrinho do usuario", error:error.message});
        }
    },
    async getCartById(req, res){
        const {user_id, cart_id}=req.params;
        try {
            const cart=await Cart.findOne({_id:cart_id, userId:user_id});
            res.status(200).json(cart);
        } catch (error) {
         res.status(400).json({message: "Erro ao buscar carrinho pelo id", error:error.message});   
        }
    }
};

module.exports=CartController;