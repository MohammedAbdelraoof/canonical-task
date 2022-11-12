describe('The Home Page', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.intercept(
      'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json',
      { fixture: 'posts' }
    ).as('getPosts')
  })

  it('card is rendered', () => {
    cy.get('[data-cy="blog_card"]')
  })

  it('posts data successfully loads', () => {
    cy.get('[data-cy="title"]')
      .first()
      .should(
        'have.text',
        'Travel, CLIs, and sticky notes: Lilyana’s life as a Canonical UX designer'
      )
    cy.get('[data-cy="header"]')
      .first()
      .should('have.text', 'People and culture')
  })
})

describe('Posts API response & data validation', () => {
  beforeEach(() => {
    cy.visit('/')
    cy.intercept(
      'https://people.canonical.com/~anthonydillon/wp-json/wp/v2/posts.json',
      { fixture: 'posts' }
    ).as('getPosts')
  })
  it('posts api response & not empty data', () => {
    cy.wait('@getPosts').its('response.statusCode').should('eq', 200)
  })

  it('non empty data api Data', () => {
    cy.wait('@getPosts').its('response.body').should('not.have.length', 0)
    cy.wait('@getPosts').its('response.body').should('have.length', 2)
  })
})
