/// <reference types="Cypress" />



describe('Central de Atendimento ao Cliente TAT', function() {  
    beforeEach(function(){
        cy.visit('./src/index.html')
    })

    it('verifica o título da aplicação', function() {
        cy.visit('./src/index.html')

        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    }) 
    
        it('preenche os campos obrigatórios e envia o formulário', function() {
            const longText ='teste,teste,teste,teste,teste,teste'
            cy.get('#firstName').type('Leonardo')
            cy.get('#lastName').type('Silva')
            cy.get('#email').type('leonardo.leo2021@gmail.com')
            cy.get('#open-text-area').type(longText,{delay:0})
            cy.contains('button','Enviar').click()

            cy.get('.success').should('be.visible')
        })

        it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function(){
            cy.get('#firstName').type('Leonardo')
            cy.get('#lastName').type('Silva')
            cy.get('#email').type('leonardo.leo2021@gmail,com')
            cy.get('#open-text-area').type('TESTE')
            cy.contains('button','Enviar').click()

            cy.get('.error').should('be.visible')
        })
        it('Campo Telefone continua vazio qaundo preenchido com valor não-numérico ',function(){
            cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
        })
        it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
            cy.get('#firstName').type('Leonardo')
            cy.get('#lastName').type('Silva')
            cy.get('#email').type('leonardo.leo2021@gmail.com')
            cy.get('#phone-checkbox').check()
            cy.get('#open-text-area').type('TESTE')
            cy.contains('button','Enviar').click()

            cy.get('.error').should('be.visible')
        })
        it('preenche e limpa os campos nome, sobrenome, email e telefone', function(){
          cy.get('#firstName')
            .type('Leonardo') 
            .should('have.value', 'Leonardo')
            .clear()
            .should('have.value','')
          cy.get('#lastName')
            .type('Silva') 
            .should('have.value', 'Silva')
            .clear()
            .should('have.value','')
            cy.get('#email')
            .type('leonardo.leo2021@gmail.com')
            .should('have.value', 'leonardo.leo2021@gmail.com')
            .clear()
            .should('have.value','')
           cy.get('#phone')
           .type('123456789')
           .should('have.value','123456789')
           .clear()
           .should('have.value','')
        })
        it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
            cy.contains('button','Enviar').click()

            cy.get('.error').should('be.visible')
        })
        it('envia o formuário com sucesso usando um comando customizado',function(){
            cy.fillMandatoryFieldsAndSubmit()

            cy.get('.success').should('be.visible')
        })
        it('seleciona um produto (YouTube) por seu texto',function(){
            cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
        })
        it('seleciona um produto (Mentoria) por seu valor (value)',function(){
            cy.get('#product')
            .select('mentoria')
            .should('have.value','mentoria')
        })
        it('seleciona um produto (Blog) por seu índice',function(){
            cy.get('#product')
            .select(1)
            .should('have.value','blog')
        })

        it('marca o tipo de atendimento "Feedback"',function(){
            cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value','feedback')
        })

        it('marca cada tipo de atendimento', function() {
            cy.get('input[type="radio"]')
              .should('have.length', 3)
              .each(function($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
        })

        it('marca ambos checkboxes, depois desmarca o último', function(){
            cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
        })
        it('seleciona um arquivo da pasta fixtures', function () {
            cy.get('input[type=file]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json')
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')  
        })
    
        })

        it('seleciona um arquivo simulando um drag-and-drop',function () {
            cy.get('input[type=file]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
            .should(function($input) {
                expect($input[0].files[0].name).to.equal('example.json')    
        })
    })
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type=file]')
          .selectFile('@sampleFile')
          .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')    
    })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',function(){
        cy.get('#privacy a').should ('have.attr','target','_blank')
    })
    it('acessa a página da política de privacidade removendo o target e então clicando no link',function(){
        cy.get('#privacy a')  
        .invoke('removeAttr','target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')
    })
    


  })

   