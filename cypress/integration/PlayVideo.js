/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
      });

describe("YoutubeTests",function(){

before(function(){
        cy.log('Running tests..................')
})

beforeEach(function(){
        cy.visit("https://www.youtube.com/")
        cy.task('log', 'On Youtube page')
        cy.get("#search-input > #search").type("movingimage")
        cy.get("#search-icon-legacy").click()  
        cy.task('log', 'Search Sucessfull')
        cy.get("[title~=November").click()  
        cy.task('log', 'Navigated to Video playback screen')
        
})


it('pause, play and mute the video', function(){
        
        cy.get(".video-stream")
        .should('have.prop', 'paused', false)
        .and('have.prop', 'ended', false)
        .then(($video) => {
                $video[0].pause()
              })
        cy.get("#primary").scrollIntoView()        
        cy.task('log', 'Paused the video')      
        cy.wait(5000)  
        cy.get(".video-stream")
        .should('have.prop', 'paused', true)
        .and('have.prop', 'ended', false)
        .then(($video) => {
                $video[0].play()
              })
        cy.get("#primary").scrollIntoView()
        cy.task('log', 'Paused the video')         
        cy.wait(5000)
        cy.task('log', 'video set on mute')  
        cy.get(".ytp-mute-button").click()
        cy.get("#primary").scrollIntoView() 
        cy.wait(5000)
        
                    
})  

it('assert duration of the video', function(){
        
        cy.get(".video-stream")
        .should('have.prop', 'paused', false)
        .and('have.prop', 'ended', false)
        .then(($video) => {
                $video[0].pause()
              })  
        cy.get("#primary").scrollIntoView()
        cy.wait(5000)
        cy.get(".video-stream").should('have.prop', 'duration', 37.021)
         
})


})