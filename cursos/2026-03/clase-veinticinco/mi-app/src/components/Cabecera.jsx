import { Component } from 'react'
import './Cabecera.css'

class Cabecera extends Component {
	render() {
		return (
			<header className="cabecera" role="banner">
				<p className="cabecera__eyebrow">Bienvenido al futuro</p>
				<h1 className="cabecera__title">Esta increible aplicacion web</h1>
				<p className="cabecera__subtitle">
					Diseñada para que cada clic se sienta rapido, claro y espectacular.
				</p>

				<div className="cabecera__chips" aria-label="Características destacadas">
					<span>UI moderna</span>
					<span>React + Vite</span>
					<span>Experiencia premium</span>
				</div>
			</header>
		)
	}
}

export default Cabecera
