document.addEventListener('DOMContentLoaded', function() {
    fetch('/projects')
        .then(response => response.json())
        .then(data => {
            const projectsList = document.getElementById('projects-list');
            data.projects.forEach(project => {
                const projectDiv = document.createElement('div');
                projectDiv.classList.add('project');
                projectDiv.innerHTML = `
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <img src="${project.imageUrl}" alt="${project.title}">
                `;
                projectsList.appendChild(projectDiv);
            });
        });
});
