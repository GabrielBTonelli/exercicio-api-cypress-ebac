/// <reference types="cypress" />
import contrato from '../contratos/produtos.contratos'

describe('Testes da Funcionalidade Usuários', () => {

  let token    
    beforeEach(() => {
        cy.token('fulano@qa.com', 'teste').then(tkn => {
            token = tkn
        })
    });

  it('Deve validar contrato de usuários', () => {
      cy.request('usuarios').then(response => {
        return contrato.validateAsync(response.contrato)
     })
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should((response) =>{
      expect(response.status).equal(200)
      expect(response.body).to.have.property('quantidade')

    })
  });

  it('Deve cadastrar um usuário com sucesso', () => {
     let nome = 'ALUNO EBAC ' + Math.floor(Math.random() * 1000000000)
     let email = 'aluno' + Math.floor(Math.random() * 1000000000) + '@qa.com.br'
     cy.cadastrarUsuario(token, nome, email, 'teste', 'true').should((response) =>{
      expect(response.status).equal(201)
      expect(response.body.message).equal('Cadastro realizado com sucesso')
     })
  });

  it('Deve validar um usuário com email inválido', () => {
    let nome = 'ALUNO EBAC ' + Math.floor(Math.random() * 1000000000)
    let email = nome + '@qa.com.br'
    cy.cadastrarUsuario(token, nome, email, 'teste', 'true').should((response) =>{
      expect(response.status).equal(400)
      expect(response.body.email).contains('email deve ser um email válido')
     }) 
  });

  it('Deve editar um usuário previamente cadastrado', () => {
      cy.editarUsuario('HsajixttWjoFo8Ve', token, 'Beltrano Silva', 'beltranoS@ebac.com.br', 'teste', 'false')
      .then((response) =>{
        expect(response.status).equal(200)
        expect(response.body.message).equal('Registro alterado com sucesso')
     })
  });

  it('Deve deletar um usuário previamente cadastrado', () => {
    cy.deletarUsuario('uTU2IPij2CKlff1G')
    .then((response) =>{
        expect(response.status).equal(200)
        expect(response.body.message).equal('Registro excluído com sucesso')
    })
  });
});
