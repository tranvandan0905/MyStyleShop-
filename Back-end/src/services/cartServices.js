const updateCartSession = (session, productId, name, image, quantity, price) => {
    if (!session.cart) {
        session.cart = [];
    }

    const itemIndex = session.cart.findIndex(item => item.productId === productId);
    if (itemIndex !== -1) {
        session.cart[itemIndex].quantity += Number(quantity);
        session.cart[itemIndex].price = session.cart[itemIndex].quantity * Number(price);
    } else {
        session.cart.push({ productId, name, image, quantity: Number(quantity), price: Number(price) });
    }

    return session.cart;
};

const getCartSession = (session) => {
    return session.cart || [];
};

const removeCartItem = (session, productId) => {
    if (!session.cart) {
        return { error: true, message: "Giỏ hàng trống" };
    }

    const itemIndex = session.cart.findIndex(item => item.productId === productId);
    if (itemIndex !== -1) {
        if (session.cart[itemIndex].quantity > 1) {
            session.cart[itemIndex].quantity -= 1;
            session.cart[itemIndex].price -= session.cart[itemIndex].price / (session.cart[itemIndex].quantity + 1);
        } else {
            session.cart.splice(itemIndex, 1);
        }
    }

    return session.cart;
};

module.exports = { updateCartSession, getCartSession, removeCartItem };
