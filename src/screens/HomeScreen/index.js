import React from 'react';
import { SessionContext } from '../../navigation';

export default function HomeScreen() {
    const context = React.useContext(SessionContext);

    React.useEffect(() => {
        debugger
        fetch('http://localhost:7000/tasks', {
            headers: { Authorization: context.user.id },
        })
        .catch(err => {
            debugger
        });
    }, []);

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div style={{ height: 80, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <a style={{ marginLeft: 22 }} href="#">Tareas</a>
                <a style={{ marginRight: 22 }} onClick={() => context.signout()} href="#">Cerrar sesión</a>
            </div>
        </div>
    )
}
