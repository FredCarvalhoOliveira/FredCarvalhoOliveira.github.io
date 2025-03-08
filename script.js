document.addEventListener('DOMContentLoaded', function() {
    // Get all project cards
    const projectCards = document.querySelectorAll('.project-card');
    const mainContent = document.querySelector('main');
    const projectsSection = document.getElementById('projects');
    
    // Store the original projects section content
    const originalContent = projectsSection.innerHTML;
    
    // Add click event listeners to each project card
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default link behavior
            
            // Get project ID from the data attribute
            const projectId = this.getAttribute('data-project-id');
            
            // Fetch the project content
            fetch(`projects/${projectId}.html`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Project content not found');
                    }
                    return response.text();
                })
                .then(html => {
                    // Replace the main content with the project content
                    mainContent.innerHTML = `
                        <section id="project-detail">
                            <button id="back-button" class="back-button">← Back to Projects</button>
                            ${html}
                        </section>
                    `;
                    
                    // Add event listener to the back button
                    document.getElementById('back-button').addEventListener('click', function() {
                        // Restore the original content
                        mainContent.innerHTML = `<section id="projects">${originalContent}</section>`;
                        // Reattach event listeners to project cards
                        attachProjectCardListeners();
                    });
                })
                .catch(error => {
                    console.error('Error loading project content:', error);
                    mainContent.innerHTML = `
                        <section id="project-detail">
                            <button id="back-button" class="back-button">← Back to Projects</button>
                            <div class="error-message">
                                <h2>Error Loading Project</h2>
                                <p>Sorry, we couldn't load the project content. Please try again later.</p>
                            </div>
                        </section>
                    `;
                    
                    document.getElementById('back-button').addEventListener('click', function() {
                        mainContent.innerHTML = `<section id="projects">${originalContent}</section>`;
                        attachProjectCardListeners();
                    });
                });
        });
    });
    
    function attachProjectCardListeners() {
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            card.addEventListener('click', function(e) {
                e.preventDefault();
                const projectId = this.getAttribute('data-project-id');
                // Reuse the fetch logic (could be refactored to avoid duplication)
                fetch(`projects/${projectId}.html`)
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Project content not found');
                        }
                        return response.text();
                    })
                    .then(html => {
                        mainContent.innerHTML = `
                            <section id="project-detail">
                                <button id="back-button" class="back-button">← Back to Projects</button>
                                ${html}
                            </section>
                        `;
                        
                        document.getElementById('back-button').addEventListener('click', function() {
                            mainContent.innerHTML = `<section id="projects">${originalContent}</section>`;
                            attachProjectCardListeners();
                        });
                    })
                    .catch(error => {
                        console.error('Error loading project content:', error);
                        mainContent.innerHTML = `
                            <section id="project-detail">
                                <button id="back-button" class="back-button">← Back to Projects</button>
                                <div class="error-message">
                                    <h2>Error Loading Project</h2>
                                    <p>Sorry, we couldn't load the project content. Please try again later.</p>
                                </div>
                            </section>
                        `;
                        
                        document.getElementById('back-button').addEventListener('click', function() {
                            mainContent.innerHTML = `<section id="projects">${originalContent}</section>`;
                            attachProjectCardListeners();
                        });
                    });
            });
        });
    }
}); 