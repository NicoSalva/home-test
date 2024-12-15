class GridPage {
    constructor(page) {
      this.page = page;
  
      // Selectores
      this.gridContainer = '#menu.grid-container';
      this.gridItems = `${this.gridContainer} .item`;
   
      this.itemTitle = '[data-test-id="item-name"] b';
      this.itemPrice = 'p#item-price';
      this.itemImage = 'img'; 
      this.itemButton = '[data-test-id="add-to-order"]';
      this.itemNumber = 'label[data-test-id="card-number"]';
    }
  
    async navigate() {
      await this.page.goto('/grid');
    }
  
    async getGridItemName(itemNumber) {
      const nameLocator = this.page.locator(`${this.gridItems}:has(${this.itemNumber}:text("${itemNumber}")) ${this.itemTitle}`);
      return await nameLocator.textContent();
    }
  
    async getGridItemPrice(itemNumber) {
      const priceLocator = this.page.locator(`${this.gridItems}:has(${this.itemNumber}:text("${itemNumber}")) ${this.itemPrice}`);
      const priceText = await priceLocator.textContent();
      return parseFloat(priceText.replace('$', '').trim());
    }
  
    async getAllGridItems() {
      const items = [];
      const gridItemCount = await this.page.locator(this.gridItems).count();
  
      for (let i = 0; i < gridItemCount; i++) {
        const item = this.page.locator(this.gridItems).nth(i);
  
        const title = await item.locator(this.itemTitle).textContent();
        const priceText = await item.locator(this.itemPrice).textContent();
        const price = parseFloat(priceText.replace('$', '').trim());
        const image = await item.locator(this.itemImage).getAttribute('src');
        const button = await item.locator(this.itemButton).isVisible();
  
        items.push({ title, price, image, button });
      }
  
      return items;
    }
  }
  
  export default GridPage;
  