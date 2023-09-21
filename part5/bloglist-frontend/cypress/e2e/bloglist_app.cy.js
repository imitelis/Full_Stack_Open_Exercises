describe('Blog app', () => {

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)

    const userOne = {
      name: 'Test admin',
      username: 'testeradmin',
      password: 'easypassword'
    }

    const userTwo = {
      name: 'Test Two',
      username: 'testtwouser',
      password: 'secondpassword'
    }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, userOne)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, userTwo)
    cy.visit('')
    cy.contains('Blog')
  })

  it('login form is shown', () => {
    cy.contains('log in blog').click()
    cy.contains('username')
    cy.contains('password')
    cy.contains('log in')
    cy.contains('cancel')
  })

  describe('Login',function() {

    it('succeeds with correct credentials', function() {
      cy.contains('log in blog').click()
      cy.get('#username').type('testeradmin')
      cy.get('#password').type('easypassword')
      cy.get('#login-button').click()
      cy.contains('Test admin logged in')
      cy.contains('login').should('not.exist')
      cy.contains('logout')
    })

    it('fails with wrong credentials', function() {
      cy.contains('log in blog').click()
      cy.get('#username').type('testeradmin')
      cy.get('#password').type('wrongpassword')
      cy.get('#login-button').click()
      cy.get('.error').contains('wrong credentials or non-existing user (testeradmin)')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.error').should('have.css', 'border-style', 'solid')
      cy.contains('username')
      cy.contains('password')
      cy.contains('logout').should('not.exist')
      cy.contains('login')
      cy.contains('cancel')
    })

    describe('When logged in', function() {

      beforeEach(function() {
        cy.contains('log in').click()
        cy.get('#username').type('testeradmin')
        cy.get('#password').type('easypassword')
        cy.get('#login-button').click()
        cy.contains('Test admin logged in')
        cy.contains('Blog list')
      })

      it('cypress login command' , function() {
        cy.login({ username: 'testeradmin', password: 'easypassword' })
        cy.contains('Test admin logged in')
      })

      it('cypress createBlog command' , function() {
        cy.login({ username: 'testeradmin', password: 'easypassword' })
        cy.contains('Test admin logged in')
        cy.createBlog({ title: 'My test blog', author: 'T. Eisen', url: 'test-eisen.net' })
        cy.contains('My test blog by T. Eisen')
      })

      it('a blog can be created from the form', function() {
        cy.login({ username: 'testeradmin', password: 'easypassword' })
        cy.contains('new blog').click()
        cy.get('#blog-title').type('My test blog')
        cy.get('#blog-author').type('T. Eisen')
        cy.get('#blog-url').type('test-eisen.net')
        cy.get('#create-button').click()
        cy.get('.success').contains("new blog 'My test blog' by 'T. Eisen' was added")
        cy.get('.success').should('have.css', 'color', 'rgb(0, 128, 0)')
        cy.get('.success').should('have.css', 'border-style', 'solid')
        cy.contains('new blog')
        cy.contains("new blog 'My test blog' by 'T. Eisen' was added")
        cy.contains('My test blog by T. Eisen')
        cy.contains('show').click()
        cy.contains('url: test-eisen.net')
        cy.contains('likes: 0')
        cy.contains('new blog')
      })

      it('a blog can be liked', function() {
        cy.login({ username: 'testeradmin', password: 'easypassword' })
        cy.createBlog({ title: 'My test blog', author: 'T. Eisen', url: 'test-eisen.net', likes: 11 })
        cy.contains('My test blog by T. Eisen')
        cy.contains('show').click()
        cy.contains('url: test-eisen.net')
        cy.contains('likes: 11')
        cy.contains('new blog')
        cy.contains('like').click()
        cy.contains('likes: 12')
      })

      it('the user who creates a blog can delete it', function() {
        cy.login({ username: 'testeradmin', password: 'easypassword' })
        cy.createBlog({ title: 'My test blog', author: 'T. Eisen', url: 'test-eisen.net', likes: 8 })
        cy.contains('My test blog by T. Eisen')
        cy.contains('show').click()
        cy.contains('url: test-eisen.net')
        cy.contains('likes: 8')
        cy.contains('new blog')
        cy.contains('delete').click()
      })

      it('only the creator can see the delete button of a blog', function() {
        cy.login({ username: 'testeradmin', password: 'easypassword' })
        cy.createBlog({ title: 'My test blog', author: 'T. Eisen', url: 'test-eisen.net' })
        cy.contains('My test blog by T. Eisen')
        cy.contains('show').click()
        cy.contains('delete')
        cy.get('#logout-button').click()
        cy.contains('log in blog').click()
        cy.get('#username').type('testtwouser')
        cy.get('#password').type('secondpassword')
        cy.get('#login-button').click()
        cy.contains('Test Two logged in')
        cy.contains('My test blog by T. Eisen')
        cy.contains('show').click()
        cy.contains('delete').should('not.exist')
      })

      it('blogs are ordered according to likes with the blog with the most likes being first', function() {
        cy.login({ username: 'testeradmin', password: 'easypassword' })
        cy.createBlog({ title: 'favorite blog', author: 'H. Winnie', url: 'fav-blog.org', likes: 99 })
        cy.createBlog({ title: 'not liked blog', author: 'Köping E.', url: 'meh-blog.net', likes: 0 })
        cy.createBlog({ title: 'normie blog', author: 'Karl O. Lang', url: 'actually-blog.com', likes: 14 })
        cy.contains('favorite blog by H. Winnie')
        cy.contains('normie blog by Karl O. Lang')
        cy.contains('not liked blog by Köping E.')
        cy.get('.blog').eq(0).should('contain', 'favorite blog by H. Winnie')
        cy.get('.blog').eq(1).should('contain', 'normie blog by Karl O. Lang')
        cy.get('.blog').eq(2).should('contain', 'not liked blog by Köping E.')
      })

    })

  })

})
