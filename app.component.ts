import {Component, OnInit} from '@angular/core'
import {HttpClient} from "@angular/common/http";
import {delay} from "rxjs/operators";
import {Todo, TodosService} from "./todos.service";


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    todos: Todo[] = [];
    loading = false;
    todoTitle: ''

    constructor(private TodosService: TodosService) {

    }

    ngOnInit() {
        this.fetchTodos()
    }

    addTodo() {
        if (!this.todoTitle.trim()) {
            return
        }
        const newTodo: Todo = {
            title: this.todoTitle,
            completed: false
        }
        this.TodosService.addTodo(newTodo).subscribe(todo => {
            this.todos.push(todo)
            this.todoTitle = ''
        })

    }

    fetchTodos() {
        this.loading = true
        this.TodosService.fetchTodos()
            .subscribe(todos => {
                this.todos = todos
                this.loading = false
            })
    }

    removeTodo(id: number) {
        this.TodosService.removeTodo(id).subscribe(() => {
            this.todos = this.todos.filter(todo => todo.id !== id)
        })
    }
}


