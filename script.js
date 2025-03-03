document.addEventListener('DOMContentLoaded', () => {
    const entryForm = document.getElementById('entryForm');
    const entryInput = document.getElementById('entryInput');
    const entryList = document.getElementById('entryList');

    loadEntries();

    entryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const entry = entryInput.value;
        addEntry(entry);
        entryInput.value = '';
    });

    function addEntry(entry) {
        fetch('API.REST.PHP/api-rest/create_client.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                email: entry,
                name: entry,
                city: entry,
                telephone: entry
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${entry}</td>
                    <td>${entry}</td>
                    <td>${entry}</td>
                    <td>${entry}</td>
                    <td>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </td>
                `;
                const editButton = tr.querySelector('.edit');
                const deleteButton = tr.querySelector('.delete');
                editButton.addEventListener('click', () => {
                    entryInput.value = entry;
                    entryList.removeChild(tr);
                    saveEntries();
                });
                deleteButton.addEventListener('click', () => {
                    deleteEntry(data.id, tr);
                });
                entryList.appendChild(tr);
                saveEntries();
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function deleteEntry(id, tr) {
        fetch('API.REST.PHP/api-rest/delete_client.php?id=' + id, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                entryList.removeChild(tr);
                saveEntries();
            }
        })
        .catch(error => console.error('Error:', error));
    }

    function saveEntries() {
        const entries = [];
        entryList.querySelectorAll('tr').forEach(tr => {
            entries.push({
                email: tr.children[0].textContent,
                name: tr.children[1].textContent,
                city: tr.children[2].textContent,
                telephone: tr.children[3].textContent
            });
        });
        localStorage.setItem('entries', JSON.stringify(entries));
    }

    function loadEntries() {
        fetch('API.REST.PHP/api-rest/get_all_client.php')
        .then(response => response.json())
        .then(data => {
            data.clients.forEach(entry => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${entry.email}</td>
                    <td>${entry.name}</td>
                    <td>${entry.city}</td>
                    <td>${entry.telephone}</td>
                    <td>
                        <button class="edit">Edit</button>
                        <button class="delete">Delete</button>
                    </td>
                `;
                const editButton = tr.querySelector('.edit');
                const deleteButton = tr.querySelector('.delete');
                editButton.addEventListener('click', () => {
                    entryInput.value = entry.email;
                    entryList.removeChild(tr);
                    saveEntries();
                });
                deleteButton.addEventListener('click', () => {
                    deleteEntry(entry.id, tr);
                });
                entryList.appendChild(tr);
            });
        })
        .catch(error => console.error('Error:', error));
    }
});
