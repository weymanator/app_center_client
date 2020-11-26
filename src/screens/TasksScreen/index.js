import React from 'react';
import SessionContext from '../../globals/SessionContext';
import ListItem from './components/ListItem';
import './index.css';

export default class TasksScreen extends React.Component {
    static contextType = SessionContext;

    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
        }

        this.add = this.add.bind(this);
        this.completeTask = this.completeTask.bind(this);

        this.token = localStorage.getItem('token');
    }

    componentDidMount() {
        fetch('http://localhost:7000/tasks', {
            headers: {
                'Authorization': `Bearer ${this.token}`,
            }
        })
            .then(data => data.json())
            .then(data => {
                if (data.errmsg != null) {
                    if (data.code === 0) {
                        this.context.signout();
                        return;
                    }

                    throw Error(data.errmsg);
                }
                this.setState({ tasks: data });
            })
            .catch(err => alert('Algo salio mal :('));
    }

    add() {
        const message = prompt('Introduce el mensaje');
        const task = {
            task: message,
        };

        fetch('http://localhost:7000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.token}`,
            },
            body: JSON.stringify(task),
        })
            .then(data => data.json())
            .then(data => {
                if (data.errmsg != null) {
                    if (data.code === 0) {
                        this.context.signout();
                        return;
                    }

                    throw Error(data.errmsg);
                }
                this.setState({
                    tasks: [...this.state.tasks, data],
                });
            })
            .catch(err => {
                alert("Algo salio mal");
            })

    }

    completeTask(task) {
        const that = this;
        return function() {
            const index = that.state.tasks.findIndex(item => item.id === task.id);

            fetch('http://localhost:7000/tasks', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${that.token}`,
                },
                body: JSON.stringify(that.state.tasks[index]),
            })
                .then(data => data.json())
                .then(task => {
                    if (task.errmsg != null) {
                        if (task.code === 0) {
                            this.context.signout();
                            return;
                        }
    
                        throw Error(task.errmsg);
                    }
                    const clone = [...that.state.tasks];
                    clone.splice(index, 1, task);
                    that.setState({
                        tasks: clone,
                    });
                })
                .catch(err => {
                    alert("Algo salio mal");
                });
        }
    }

    render() {
        const pendingTasks = this.state.tasks.filter(i => !i.status);
        const completedTasks = this.state.tasks.filter(i => i.status);;

        return (
            <div>
                <section>
                    <div id="pending-title">
                        <h3>Tareas pendientes</h3>
                        <button onClick={this.add}>
                            añadir
                        </button>
                    </div>
                    <ul>
                        {pendingTasks.length === 0 && (
                            <li>No hay tareas</li>
                        )}
                        {pendingTasks.map(task => (
                            <ListItem onChange={this.completeTask(task)} key={task.id} taskName={task.task} />
                        ))}
                    </ul>
                </section>

                <section>
                    <h3>Tareas completadas</h3>
                    <ul>
                        {completedTasks.length === 0 && (
                            <li>No hay tareas</li>
                        )}
                        {completedTasks.map(task => (
                            <ListItem key={task.id} taskName={task.task} checked disabled />
                        ))}
                    </ul>
                </section>
            </div>
        )
    }
}
