export const environment = {
    serverURL: ' https://7a12-117-217-127-105.ngrok-free.app/api/v1',
    //customer releated apis
    login:'/customer/login',
    register: '/customer/register',
    getUserData: '/customer/customer-details',
    updateUser: '/customer/update-customer',
    changePassword: '/customer/changePassword',
    addAddress: '/customer/add-customer-address',
    updateAddress: '/customer/update-customer-address',
    deleteAddress:'/customer/delete-customer-address',
    //products related apis
    getCategoriesURL: '/category/get-all-categories',
    getAllProducts: '/product/get-all-products',
    getAllProdByCategories: '/product/get-product-by-category-id',
    getProdByID: '/product/get-product-by-id',
    addOrder: '/order/add-order',
    getOrder: '/order/get-order',


// encription routes 
    encryption : '/encryption',


    // json-server apis routes
    baseURL: 'http://localhost:3000/',
    userURL: 'users',
    cartURL: 'cart',
    products: 'products',
};
