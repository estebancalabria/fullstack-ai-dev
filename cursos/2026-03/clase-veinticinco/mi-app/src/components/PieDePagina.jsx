import './PieDePagina.css'

function PieDePagina() {
	const year = new Date().getFullYear()

	return (
		<footer className="pie-de-pagina" role="contentinfo">
			<div className="pie-de-pagina__grid">
				<div>
					<h3 className="pie-de-pagina__title">
						Gracias por llegar hasta aqui. Lo mejor de esta aplicacion apenas
						comienza.
					</h3>
					<p className="pie-de-pagina__subtitle">
						Construido con energia creativa, codigo limpio y una experiencia que
						se siente premium.
					</p>
				</div>

				<span className="pie-de-pagina__marca">{year} Fullstack AI</span>
			</div>
		</footer>
	)
}

export default PieDePagina
