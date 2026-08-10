export class InventoryPage{

    constructor(page){
        this.page = page;

        this.pageTitle = page.locator('[data-test="title"]');
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
        this.products = page.locator('[data-test="inventory-item"]')

    }

    async addItemToCart(itemName){
        const product = this.products.filter({ hasText: itemName });
        const addToCartBtn = product.getByRole('button', {name: 'Add to cart'});

        await addToCartBtn.click();
    }

    async openCart(){
        await this.cartIcon.click();
    }

    async getPageTitle(){
        return await this.pageTitle.textContent();
    }
}