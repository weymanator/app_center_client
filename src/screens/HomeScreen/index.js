import React from 'react';
import SessionContext from '../../globals/SessionContext';
import { useParams, Link } from 'react-router-dom';
import TasksScreen from '../TasksScreen';
import AgendaShidaScreen from '../AgendaShidaScreen';

const linkStyle = {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textDecoration: 'none',
    marginLeft: 22,
};

const signoutStyle = {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textDecoration: 'none',
    marginRight: 22,
};

export default function HomeScreen() {
    const context = React.useContext(SessionContext);
    const { page } = useParams();

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div
                style={{
                    height: 80,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    backgroundColor: '#1976D2',
                }}
            >
                <div>
                    <Link style={linkStyle} to='/tasks'>Tareas</Link>
                    <Link style={linkStyle} to='/ejemplo'>Ejemplo</Link>
                    <Link style={linkStyle} to='/agendashida'>Contactos</Link>
                </div>
                <a style={signoutStyle} onClick={() => context.signout()} href="#">Cerrar sesión</a>
            </div>
            {
                page === 'tasks'
                    ? <TasksScreen />
                    : page === 'agendashida'
                    ? <AgendaShidaScreen />
                    : page === 'ejemplo'
                    ? <h1>Ejemplo</h1>
                    : <h1>Page not found</h1>
            }
        </div>
    )
}
