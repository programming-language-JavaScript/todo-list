class Task {

    add(task) {
        let tasks = this.get(), dataTask = {task, isMarked: false}
        if (tasks) {
            tasks.push(dataTask)
            this.set(tasks)
        } else {
            this.set([dataTask,])
        }
    }

    delete(index) {
        let tasks = this.get()
        tasks.splice(index, 1)
        this.set(tasks)
    }

    deleteAll() {
        localStorage.removeItem('tasks')
        this.display()
    }

    get() {
        return JSON.parse(localStorage.getItem('tasks'))
    }

    set(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks))
        this.display()
    }

    display() {
        let get = this.get()
        $cards.innerHTML = ''
        if (get) {
            get.forEach((task, index) => {
                let $card = this.createCard(task, index)
                $cards.insertAdjacentElement('afterbegin', $card)
            })
        }
    }

    createCard(task, index) {
        let card = `<div class="uk-animation-toggle ${task.isMarked ? 'check' : 'not-check'}" data-index="${index}">
                <div class="uk-card uk-card-primary uk-card-small uk-card-body uk-margin-small-bottom">
                    <h3 class="uk-card-title">${task.task}</h3>
                </div>
                <span uk-icon="icon: check; ratio: 2" class="btn-check
                 ${task.isMarked ? 'btn-check_activate' : ''} uk-animation-slide-bottom-medium"></span>
                <span uk-icon="icon: minus-circle; ratio: 2" class="btn-delete uk-animation-slide-bottom-medium"></span>
            </div>`
        return new DOMParser().parseFromString(card, "text/html").querySelector('div')
    }

    mark(index) {
        let tasks = this.get(),
            isMarked = tasks[index].isMarked
        tasks[index].isMarked = !isMarked
        this.set(tasks)
    }
}

const task = new Task()

document.addEventListener('DOMContentLoaded',
    function () {
        try {
            task.display()
        } catch (error) {
            console.log(error)
        }
    })

btnAdd.addEventListener('click', () => task.add($task.value))
btnDeleteAll.addEventListener('click', () => task.deleteAll())

$cards.addEventListener('click', (event) => {
    let $span = event.target.closest('span')
    if ($span) {
        let isMarked = $span.className.indexOf('btn-check'),
            index = event.target.closest('div[data-index]').dataset.index
        isMarked !== -1 ? task.mark(index) : task.delete(index)
    }
})