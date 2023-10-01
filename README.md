# QA Assignment for Tech9

## Task 1:
### Write an automated test based on the test case below

The tool employed or this task was Cypress.

### Steps

```shell
1. git clone https://github.com/bgnestico/qa_assignment.git
2. cd QA_assignment
3. npm install
4. npm run cypress:open
```

## Task 2: 
### Make a recommendation on an API test that you might make for this web page.

I would suggest to create an API test to clear test data, to be able to run tests continuously without having to do it manually.

1. Create an api test to delete any user address saved in the address book and run it before each E2E execution
2. Create an api test to remove all items from the shopping cart and run it before each E2E execution
