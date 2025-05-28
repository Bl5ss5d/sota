import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function App() {
    const [accesorios, setAccesorios] = useState([]);
    const [comidas, setComidas] = useState(['🐟', '🍗', '🥛']);
    const [juguetes, setJuguetes] = useState(['⚽', '🐭']);
    const [decoraciones, setDecoraciones] = useState({
        pared: true,
        suelo: true,
        cama: true,
    });
    const [colores, setColores] = useState({
        pared: '#f0e4d7',
        suelo: '#deb887',
        cama: '#dcbcbc',
    });
    const [mensaje, setMensaje] = useState('');
    const [showMenus, setShowMenus] = useState({
        accesorios: false,
        habitacion: false,
        comida: false,
        juguetes: false,
        minijuegos: false,
        colores: false,
    });
    const [draggedToy, setDraggedToy] = useState(null);
    const [toyPositions, setToyPositions] = useState({});
    const [postersActivos, setPostersActivos] = useState({
        hellokittyemo: false,
        hellokittyprincesa: false,
        hellokittyladron: false,
    });

    const acariciar = () => {
        const audio = new Audio(process.env.PUBLIC_URL + '/miau.mp3');
        audio.play();
        setMensaje('¡Miau! 😻 Me encanta que me acaricies!');
    };

    const toggleAccesorio = (item) => {
        setAccesorios((prev) =>
            prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
        );
    };

    const cambiarColor = (elemento, color) => {
        setColores((prev) => ({
            ...prev,
            [elemento]: color,
        }));
    };

    const toggleDecoracion = (key) => {
        setDecoraciones((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
        if (key === 'pared' && decoraciones.pared) {
            setPostersActivos({
                hellokittyemo: false,
                hellokittyprincesa: false,
                hellokittyladron: false,
            });
        }
    };

    const togglePoster = (posterKey) => {
        setPostersActivos((prev) => ({
            ...prev,
            [posterKey]: !prev[posterKey],
        }));
    };

    const comer = (index) => {
        setComidas((prev) => prev.filter((_, i) => i !== index));
        setMensaje('¡Yum yum! 🍽️');
    };

    const startDrag = (index) => setDraggedToy(index);

    const onDrop = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setToyPositions((prev) => ({
            ...prev,
            [draggedToy]: { x, y },
        }));
        setDraggedToy(null);
    };

    const playPiedraPapelTijera = () => {
        const opciones = ['✊', '✋', '✌️'];
        const eleccionSota = opciones[Math.floor(Math.random() * opciones.length)];
        setMensaje(`Sota eligió: ${eleccionSota}`);
    };

    const adivinarNumero = () => {
        const numero = Math.floor(Math.random() * 10) + 1;
        setMensaje(`Sota pensó en el número: ${numero}`);
    };

    const quitarJuguetes = () => {
        setJuguetes([]);
        setToyPositions({});
    };

    const renderAccesorios = () => {
        const positions = {
            sombrero: { top: '12%', left: '50%', fontSize: '120px' },
            corona: { top: '14%', left: '50%', fontSize: '110px' },
            moño: { top: '30%', left: '35%', fontSize: '60px' },
            collar: { top: '72%', left: '50%', fontSize: '60px' },
            bufanda: { top: '65%', left: '50%', fontSize: '60px' },
            orejas: { top: '20%', left: '50%', fontSize: '70px' },
        };
        const emojis = {
            sombrero: '🎩',
            corona: '👑',
            moño: '🎀',
            collar: '💎',
            bufanda: '🧣',
            orejas: '🐰',
        };
        return accesorios.map((item, idx) => (
            <div key={idx} style={{
                position: 'absolute',
                top: positions[item].top,
                left: positions[item].left,
                transform: 'translate(-50%, -50%)',
                fontSize: positions[item].fontSize,
                zIndex: 6,
            }}>{emojis[item]}</div>
        ));
    };

    return (
        <div style={{ display: 'flex', background: '#fff6e0', minHeight: '100vh', padding: '20px' }}>
            <div style={{ width: '200px', marginRight: '20px' }}>
                <ToggleMenu title="🎀 Accesorios" open={showMenus.accesorios} toggle={() => setShowMenus({ ...showMenus, accesorios: !showMenus.accesorios })}>
                    <MenuButton onClick={() => toggleAccesorio('sombrero')} label="🎩 Sombrero" />
                    <MenuButton onClick={() => toggleAccesorio('corona')} label="👑 Corona" />
                    <MenuButton onClick={() => toggleAccesorio('moño')} label="🎀 Moño" />
                    <MenuButton onClick={() => toggleAccesorio('collar')} label="💎 Collar" />
                    <MenuButton onClick={() => toggleAccesorio('bufanda')} label="🧣 Bufanda" />
                    <MenuButton onClick={() => toggleAccesorio('orejas')} label="🐰 Orejitas" />
                </ToggleMenu>

                <ToggleMenu title="🏠 Habitación" open={showMenus.habitacion} toggle={() => setShowMenus({ ...showMenus, habitacion: !showMenus.habitacion })}>
                    <MenuButton onClick={() => toggleDecoracion('pared')} label="🧱 Pared" />
                    <MenuButton onClick={() => toggleDecoracion('suelo')} label="🪵 Suelo" />
                    <MenuButton onClick={() => toggleDecoracion('cama')} label="🛏️ Cama" />
                    {decoraciones.pared && (
                        <>
                            <MenuButton onClick={() => togglePoster('hellokittyemo')} label={`${postersActivos.hellokittyemo ? '✅' : '⬜'} Hello Kitty Emo`} />
                            <MenuButton onClick={() => togglePoster('hellokittyprincesa')} label={`${postersActivos.hellokittyprincesa ? '✅' : '⬜'} Hello Kitty Princesa`} />
                            <MenuButton onClick={() => togglePoster('hellokittyladron')} label={`${postersActivos.hellokittyladron ? '✅' : '⬜'} Hello Kitty Ladrón`} />
                        </>
                    )}
                </ToggleMenu>

                <ToggleMenu title="🎨 Colores" open={showMenus.colores} toggle={() => setShowMenus({ ...showMenus, colores: !showMenus.colores })}>
                    <MenuButton onClick={() => cambiarColor('pared', '#f0e4d7')} label="Pared Beige" />
                    <MenuButton onClick={() => cambiarColor('pared', '#add8e6')} label="Pared Azul" />
                    <MenuButton onClick={() => cambiarColor('pared', '#d3d3d3')} label="Pared Gris Claro" />
                    <MenuButton onClick={() => cambiarColor('pared', '#dda0dd')} label="Pared Lila" />
                    <MenuButton onClick={() => cambiarColor('pared', '#98fb98')} label="Pared Verde Claro" />
                    <MenuButton onClick={() => cambiarColor('suelo', '#deb887')} label="Suelo Madera" />
                    <MenuButton onClick={() => cambiarColor('suelo', '#a0522d')} label="Suelo Oscuro" />
                    <MenuButton onClick={() => cambiarColor('suelo', '#f5f5dc')} label="Suelo Claro" />
                    <MenuButton onClick={() => cambiarColor('suelo', '#c0c0c0')} label="Suelo Mármol" />
                    <MenuButton onClick={() => cambiarColor('suelo', '#696969')} label="Suelo Gris Oscuro" />
                    <MenuButton onClick={() => cambiarColor('cama', '#dcbcbc')} label="Cama Rosa" />
                    <MenuButton onClick={() => cambiarColor('cama', '#90ee90')} label="Cama Verde" />
                </ToggleMenu>

                <ToggleMenu title="🍽️ Comida" open={showMenus.comida} toggle={() => setShowMenus({ ...showMenus, comida: !showMenus.comida })}>
                    <MenuButton onClick={() => setComidas((prev) => [...prev, '🐟'])} label="🐟 Pescado" />
                    <MenuButton onClick={() => setComidas((prev) => [...prev, '🍗'])} label="🍗 Pollo" />
                    <MenuButton onClick={() => setComidas((prev) => [...prev, '🥛'])} label="🥛 Leche" />
                </ToggleMenu>

                <ToggleMenu title="🧸 Juguetes" open={showMenus.juguetes} toggle={() => setShowMenus({ ...showMenus, juguetes: !showMenus.juguetes })}>
                    <MenuButton onClick={() => setJuguetes((prev) => [...prev, '⚽'])} label="⚽ Pelota" />
                    <MenuButton onClick={() => setJuguetes((prev) => [...prev, '🐭'])} label="🐭 Ratón" />
                    <MenuButton onClick={quitarJuguetes} label="❌ Quitar todos" />
                </ToggleMenu>

                <ToggleMenu title="🎮 Minijuegos" open={showMenus.minijuegos} toggle={() => setShowMenus({ ...showMenus, minijuegos: !showMenus.minijuegos })}>
                    <MenuButton onClick={playPiedraPapelTijera} label="✊✋✌️ Piedra Papel Tijera" />
                    <MenuButton onClick={adivinarNumero} label="🔢 Adivinar Número" />
                </ToggleMenu>
            </div>

            <div style={{ flex: 1, textAlign: 'center', position: 'relative', background: '#fff', borderRadius: '20px', padding: '20px', overflow: 'hidden' }} onClick={onDrop}>
                {decoraciones.pared && (
                    <>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '60%', backgroundColor: colores.pared, zIndex: 1 }} />
                        {postersActivos.hellokittyemo && (
                            <img src={process.env.PUBLIC_URL + '/hellokittyemo.png'} alt="Hello Kitty Emo" style={posterStyle('20%')} />
                        )}
                        {postersActivos.hellokittyprincesa && (
                            <img src={process.env.PUBLIC_URL + '/hellokittyprincesa.png'} alt="Hello Kitty Princesa" style={posterStyle('50%')} />
                        )}
                        {postersActivos.hellokittyladron && (
                            <img src={process.env.PUBLIC_URL + '/hellokittyladron.png'} alt="Hello Kitty Ladrón" style={posterStyle('80%')} />
                        )}
                    </>
                )}
                {decoraciones.suelo && <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40%', backgroundColor: colores.suelo, zIndex: 2 }} />}
                {decoraciones.cama && <div style={{ position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '300px', backgroundColor: colores.cama, borderRadius: '20px', border: '3px solid #b88989', zIndex: 3 }} />}
                <img src={process.env.PUBLIC_URL + '/nevera.png'} alt="Nevera" style={{ position: 'absolute', bottom: '10%', left: '5%', width: '220px', height: '320px', zIndex: 4 }} />

                <h1 style={{ fontSize: '28px', position: 'relative', zIndex: 5 }}>🐾 Sota, tu gatito virtual 🐾</h1>
                <div style={{ position: 'relative', display: 'inline-block', zIndex: 5 }}>
                    <img src={process.env.PUBLIC_URL + '/sota.png'} alt="Sota el gatito" style={{ width: '800px', maxWidth: '100%', borderRadius: '50%', cursor: 'pointer' }} onClick={acariciar} />
                    {renderAccesorios()}
                </div>
                <div>
                    {comidas.map((item, idx) => (
                        <span key={idx} onClick={() => comer(idx)} style={{ fontSize: '40px', margin: '5px', cursor: 'pointer', position: 'relative', zIndex: 7 }}>{item}</span>
                    ))}
                </div>
                <div>
                    {juguetes.map((item, idx) => {
                        const pos = toyPositions[idx] || { x: 50 + idx * 60, y: 500 };
                        return (
                            <span key={idx} draggable onDragStart={() => startDrag(idx)} style={{ position: 'absolute', left: pos.x, top: pos.y, fontSize: '40px', cursor: 'grab', zIndex: 7 }}>{item}</span>
                        );
                    })}
                </div>
                <p style={{ marginTop: '10px', fontSize: '16px', position: 'relative', zIndex: 7 }}>{mensaje}</p>
            </div>
        </div>
    );
}

function MenuButton({ onClick, label }) {
    return (
        <button onClick={onClick} style={{ display: 'block', width: '100%', margin: '5px 0', padding: '10px', borderRadius: '10px', backgroundColor: '#ffd6da', border: 'none', fontSize: '14px', cursor: 'pointer' }}>{label}</button>
    );
}

function ToggleMenu({ title, open, toggle, children }) {
    return (
        <div style={{ marginBottom: '10px' }}>
            <button onClick={toggle} style={{ width: '100%', padding: '10px', marginBottom: '5px', backgroundColor: '#ffb6c1', border: 'none', borderRadius: '10px', fontSize: '16px', cursor: 'pointer' }}>
                {title} {open ? '▲' : '▼'}
            </button>
            {open && <div>{children}</div>}
        </div>
    );
}

function posterStyle(left) {
    return {
        position: 'absolute',
        top: '12%',
        left: left,
        transform: 'translate(-50%, 0)',
        height: '250px',
        zIndex: 5,
        pointerEvents: 'none',
        userSelect: 'none',
        borderRadius: '15px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
    };
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
