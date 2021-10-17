/// <reference types="cypress" />

Cypress.on('uncaught:exception', (err, runnable) => {
        return false;
      });


      
describe("YoutubeTests",function(){

before(function(){
        cy.log('Starting the tests....................')
})

beforeEach(function(){
        cy.viewport('iphone-8')
        cy.visit("https://www.youtube.com/")
        cy.title().should('eq', 'YouTube')
        cy.task('log', 'Sucessfully Landed On Youtube page with resolution 800 * 600')
        cy.get(".topbar-icons").type("movingimage{enter}")
        cy.get('#channel-title > #container > #text-container > #text').first().contains('movingimage')  
        cy.task('log', 'movingimage Search Sucessfull')
        cy.get(":nth-child(2) > :nth-child(1) > #contents > .ytd-shelf-renderer > #items > :nth-child(1) > #dismissible > ytd-thumbnail.style-scope > #thumbnail > .no-transition > #img").click()  
        cy.task('log', 'Navigated to Video playback screen')
        cy.wait(10000)

           
        
        cy.get(".ytp-ad-module").then($ad => {
                if ($ad.find(" .ytp-ad-player-overlay").length > 0) {
                        cy.task('log', 'ad found')   
                        cy.get('.ytp-ad-skip-button-icon').click()
                        cy.task('log', 'Skipped Ad')
                }
                else {
                        cy.task('log', 'no Ad')    
                }
            });    
            
        
}) 

it('pause, play, mute and umute the video', function(){
        
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
        cy.task('log', 'start the video again')         
        cy.wait(5000)
        cy.get(".ytp-mute-button").click()
        cy.task('log', 'video set on mute')  
        cy.get("#primary").scrollIntoView()
        cy.wait(5000)
        cy.get(".ytp-mute-button").click() 
        cy.task('log', 'video set on unmute')  
        cy.get("#primary").scrollIntoView()
        cy.task('log', 'waiting for the video to end') 
        cy.get('.video-stream', { timeout: 80000 }).should('have.prop', 'ended', true);     
                    
})  

it('Play next video', function(){
        
        cy.get(".video-stream")
        .should('have.prop', 'paused', false)
        .and('have.prop', 'ended', false)
        .then(($video) => {
                $video[0].pause()
              })  
        cy.get("#primary").scrollIntoView()
        cy.wait(5000)
        cy.get(".ytp-next-button").click()
        cy.task('log', 'clicking on next video to play it')  
        cy.wait(5000)
        cy.get(".ytp-ad-module").then($ad => {
                if ($ad.find(" .ytp-ad-player-overlay").length > 0) {
                        cy.task('log', 'ad found')   
                        cy.get('.ytp-ad-skip-button-icon').click()
                        cy.task('log', 'Skipped Ad')
                }
                else {
                        cy.task('log', 'no Ad')    
                }
            });           
})  



})