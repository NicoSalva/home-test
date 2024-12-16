# Home Test

This repository contains automated tests for the **Home Test Project**, developed using Playwright. The tests validate various functionalities, including login, checkout, grid, and search.

## Prerequisites

Before you begin, ensure you have the following installed on your system:
- **Node.js** (v16 or later)
- **npm** (Node Package Manager)
- **Docker** (if you need to run the application locally)

## Installation

1. Clone the repository and navigate to the project directory:
   ```
   git clone https://github.com/NicoSalva/home-test.git
   cd home-test
   ```

2. Install the dependencies:
```
npm install
```
3. Pull and run the Docker image for the web application:
```
docker pull automaticbytes/demo-app
docker run -p 3100:3100 automaticbytes/demo-app
```

4. Verify the application is running: Open http://localhost:3100 in your browser.

## Running the Tests

To run all the tests together:
```
npm test
```

## Run a Specific Test File

```
npx playwright test tests/<test-file>.spec.js
```

Example:
```
npx playwright test tests/login.spec.js
```

## Run a Specific Test

```
npx playwright test tests/<test-file>.spec.js --grep "<test-name>"
```

Example:
```
npx playwright test tests/login.spec.js --grep "TEST02 - Login Failure A"
```

## Headless Mode
If you want to run the tests in headless mode (without opening the browser), modify the headless flag in the playwright.config.js:
```
headless: true,
```

Alternatively, override it directly when running the test:
```
npx playwright test --headed=false
```

## Reporting

## Generate and open the Allure report:

```
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

## Folder structure

.
├── pages/                # Page Object Models
│   ├── login.page.js
│   ├── checkout.page.js
│   ├── grid.page.js
│   └── search.page.js
├── tests/                # Test Files
│   ├── login.spec.js
│   ├── checkoutForm.spec.js
│   ├── grid.spec.js
│   └── search.spec.js
├── playwright.config.js  # Playwright Configuration
├── package.json          # Project Dependencies and Scripts
└── README.md             # Project Documentation

## My Solution
I decided to apply the POM (Page Object Model) pattern because it was mentioned as an added value in the challenge requirements. However, I didn’t find it necessary to create a separate section for encapsulating locators since the project size is relatively small. I prefer to focus on optimizing development practicality and ease of use over strictly adhering to theoretical concepts.

Even though it wasn’t mentioned as a requirement, I added Allure reporting because I believe it’s visually appealing and adds significant value to frameworks like this.

While I would normally prefer fewer comments, for this type of project I think it’s appropriate to include explanations of what each method does in the pages. This makes the framework easier to understand and maintain for anyone reviewing or expanding the solution.
## ######################## ##

**App Automation Test Original Readme**
### General test requisites
- All tests should provide a setup and tear down mechanism that opens and closes the browser.
- All tests should run successfully either from IDE or command line.
- Instructions to build and run the code and tests submitted must be provided.
- Submitted code implementing a Page Object Model will be taken in high consideration.

### Tests Scenarios
1.  Login Success
   - Navigate to http://localhost:3100/login
   - Successfully login with credentials: johndoe19/supersecret
   - Assert that welcome message containing username is shown.

2. Login Failure A
   - Navigate to http://localhost:3100/login
   - Enter wrong username/password
   - Assert error message is shown.

3. Login Failure B
   - Navigate to http://localhost:3100/login
   - Leave both username/password in blank
   - Assert error message is shown.

4. Checkout Form Order Success
   - Navigate to http://localhost:3100/checkout
   - Complete all the fields
   - Verify that if "Shipping address same as billing" checkbox is not checkmarked then checkmark it.
   - Submit the form and assert that the order confirmation number is not empty.

5. Checkout Form Alert
   - Navigate to http://localhost:3100/checkout
   - Complete all the fields
   - Verify that if "Shipping address same as billing" checkbox is checkmarked, then uncheckmark it.
   - Try to submit the form and validate that the alert message is shown and confirm the alert.
   - Assert alert is gone.

6. Cart Total Test
    - Navigate to http://localhost:3100/checkout
	- Assert that the cart total shown is correct for the item prices added.

7. Grid Item Test
    - Navigate to http://localhost:3100/grid
    - Assert that in position 7 the product shown is "Super Pepperoni"
	- Assert that the price shown is $10
	
8. Grid All Items Test	
	- Navigate to http://localhost:3100/grid
	- Assert that all the items have a non empty title, price, image and a button.

9. Search Success
  - Navigate to http://localhost:3100/search
  - Search for any word (for instance automation)
  - Assert that "Found one result for" plus the word you searched is shown.

10. Search Empty
	- Navigate to http://localhost:3100/search
	- Leave search box empty and submit the search
	- Assert that "Please provide a search word." message is shown.
# Home Test Project
