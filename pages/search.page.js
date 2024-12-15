class SearchPage {
    constructor(page) {
      this.page = page;
  
      // Selectores
      this.searchInput = '[name="searchWord"]'; // Selector para el input de búsqueda
      this.submitButton = 'button[type="submit"]'; // Selector para el botón de búsqueda
      this.resultContainer = '.result-container'; // Selector para el contenedor de resultados
      this.resultText = '#result'; // Selector para el texto del resultado
    }
  
    async navigate() {
      await this.page.goto('/search'); // Navegar a la página de búsqueda
    }
  
    async performSearch(searchWord) {
      await this.page.fill(this.searchInput, searchWord); // Rellenar el input de búsqueda
      await this.page.click(this.submitButton); // Hacer clic en el botón de búsqueda
    }
    async getResultText() {
        // Esperar a que el contenedor tenga texto diferente a "searching..."
        await this.page.locator(this.resultText).waitFor({
          state: 'visible',
          timeout: 5000, // Tiempo máximo de espera en milisegundos
        });
      
        return await this.page.locator(this.resultText).textContent();
      }
  
    async isResultContainerVisible() {
      return await this.page.locator(this.resultContainer).isVisible(); // Verificar si el contenedor de resultados es visible
    }

    async waitForFinalResult() {
        const locator = this.page.locator(this.resultText);
      
        // Esperar hasta que el texto no sea "searching..."
        await this.page.waitForFunction(
          (locator) => {
            const element = document.querySelector(locator);
            return element && element.textContent !== 'searching...';
          },
          this.resultText,
          { timeout: 5000 } // Tiempo máximo de espera
        );
      
        // Obtener el texto final después de estabilizarse
        return await locator.textContent();
      }
      
  }
  
  export default SearchPage;
  