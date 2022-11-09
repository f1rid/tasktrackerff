function appendTask() {
    let tracker_list = document.getElementById('tracker-list'); 
    addTask(tracker_list);
}

function addTask(tracker_list, value = '') {
    tracker_list.insertAdjacentHTML(
        'beforeend', 
        `<div class="tracker-item">
            <input class="tracker-input" type="text" value="${ value }">
            <button type="button" class="tracker-delete">
                &#10005;
            </button>
        </div>`
    );
}

function deleteTask(event) {
    let item = event.target.parentNode;
    item.remove();
}

function getInputValues() {
    let inputs = document.querySelectorAll('.tracker-input');
    return Array.from(inputs).map((elem, i) => elem.value);
}

function sortAscending(values) {
    return values.sort();
}

function sortDescending(values) {
    return values.sort(function(a, b) {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
    });
}

function initTasks(values) {
    let tracker_list = document.getElementById('tracker-list'); 
    tracker_list.innerHTML = '';

    for (const value of values) {
        addTask(tracker_list, value);
    }
}

window.onload = function() {
    let tracker_add = document.querySelector('.tracker-add');
    tracker_add.addEventListener('click', appendTask);

    document.body.addEventListener('click', function(e) {
        if (!e.target) return;

        if (e.target.classList.contains('tracker-delete')) {
            deleteTask(e);
        }
    });

    let tracker_sort = document.querySelector('.tracker-sort');
    tracker_sort.addEventListener('click', function(e) {
        let icon = this.querySelector('.bi');
        let values = getInputValues();
        let new_values = null;

        if (icon.classList.contains('bi-sort-down-alt')) {
            icon.classList.remove('bi-sort-down-alt');
            icon.classList.add('bi-sort-up-alt');

            new_values = sortAscending(values);
        } else if (icon.classList.contains('bi-sort-up-alt')) {
            icon.classList.remove('bi-sort-up-alt');
            icon.classList.add('bi-sort-down-alt');

            new_values = sortDescending(values);
        }

        initTasks(new_values);
    });
};
