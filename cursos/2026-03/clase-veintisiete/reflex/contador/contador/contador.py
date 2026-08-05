"""Welcome to Reflex! This file outlines the steps to create a basic app."""

import reflex as rx

from rxconfig import config


class State(rx.State):
    contador: int = 0

    def incrementar(self):
        self.contador += 1

    def decrementar(self):
        self.contador -= 1

    def reiniciar(self):
        self.contador = 0


def contador_component():
    return rx.vstack(
        rx.heading("Contador Reflex"),

        rx.text(
            State.contador,
            size="8"
        ),

        rx.hstack(
            rx.button(
                "-",
                on_click=State.decrementar
            ),

            rx.button(
                "+",
                on_click=State.incrementar
            ),

            rx.button(
                "Reiniciar",
                on_click=State.reiniciar
            ),
        ),

        spacing="4",
    )

def index() -> rx.Component:
    # Welcome Page (Index)
    return rx.center(
        contador_component(),
        height="100vh",
    )


app = rx.App()
app.add_page(index)
