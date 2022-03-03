import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Todo } from 'src/models/todo.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public mode = 'list';
  public todos: Todo[] = [];
  public title: string = 'Lista de tarefas';
  public form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: [
        '',
        Validators.compose([
          Validators.minLength(0),
          Validators.maxLength(50),
          Validators.required,
        ]),
      ],
    });
    if (!localStorage.getItem('todos')) {
      this.save();
    }

    this.load();
  }

  add() {
    const title = this.form.controls['title'].value;
    const id = this.todos.length + 1;

    this.todos.push(new Todo(id, title, false));

    this.save();
    this.clear();
  }

  clear() {
    this.form.reset();
    this.save();
  }

  remove(todo: Todo) {
    const index = this.todos.indexOf(todo);
    if (index !== -1) {
      this.todos.splice(index, 1);
    }
    this.save();
  }

  markAsDone(todo: Todo) {
    todo.done = true;
    this.save();
  }

  markAsUndone(todo: Todo) {
    todo.done = false;
    this.save();
  }

  save() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
    this.mode = 'list';
  }

  load() {
    this.todos = JSON.parse(localStorage.getItem('todos') || '{}');
  }

  changeMode(mode: string) {
    this.mode = mode;
    this.form.controls['title'].markAsPristine();
  }
}
