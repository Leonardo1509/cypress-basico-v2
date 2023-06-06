Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
    cy.get('#firstName').type('Leonardo')
    cy.get('#lastName').type('Silva')
    cy.get('#email').type('leonardo.leo2021@gmail.com')
    cy.get('#open-text-area').type('TESTE')
    cy.contains('button','Enviar').click()
})