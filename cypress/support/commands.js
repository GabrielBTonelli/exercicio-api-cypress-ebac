Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha 
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
 })

 Cypress.Commands.add('cadastrarUsuario' , (token, nome, email, senha, trueFalse) =>{
    cy.request({
        method: 'POST', 
        url: 'usuarios',
        headers: {authorization: token}, 
        body: {
            "nome": nome,
            "email": email,
            "password": senha,
            "administrador": trueFalse
          }, 
          failOnStatusCode: false
    })
 })

 Cypress.Commands.add('editarUsuario', (id, token, nome, email, senha, trueFalse) =>{
    cy.request({    
        method: 'PUT',
        url: `usuarios/${id}`,
        headers: {authorization: token},
        body: {
            "nome": nome,
            "email": email,
            "password": senha,
            "administrador": trueFalse
          },
        failOnStatusCode: false
    })
})

Cypress.Commands.add('deletarUsuario', (id) =>{
    cy.request({
        method: 'DELETE',
        url: `usuarios/${id}`,
        // headers: {authorization: token},
        failOnStatusCode: false
    })
})

