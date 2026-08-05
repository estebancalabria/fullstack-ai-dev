from kivy.app import App
from kivy.uix.gridlayout import GridLayout
from kivy.uix.button import Button
from kivy.uix.textinput import TextInput
from kivy.uix.boxlayout import BoxLayout


class Calculadora(BoxLayout):
    def __init__(self, **kwargs):
        super().__init__(orientation="vertical", padding=10, spacing=8, **kwargs)

        # Pantalla
        self.pantalla = TextInput(
            font_size=36,
            readonly=True,
            halign="right",
            size_hint_y=0.25,
            background_color=(0.15, 0.15, 0.15, 1),
            foreground_color=(1, 1, 1, 1),
        )
        self.add_widget(self.pantalla)

        # Botones
        botones = [
            ["7", "8", "9", "/"],
            ["4", "5", "6", "*"],
            ["1", "2", "3", "-"],
            ["C", "0", "=", "+"],
        ]

        grid = GridLayout(cols=4, spacing=6)
        for fila in botones:
            for label in fila:
                btn = Button(
                    text=label,
                    font_size=24,
                    background_color=self._color(label),
                    background_normal="",
                )
                btn.bind(on_press=self.al_presionar)
                grid.add_widget(btn)

        self.add_widget(grid)

    def _color(self, label):
        if label == "=":
            return (0.2, 0.7, 0.4, 1)
        if label == "C":
            return (0.8, 0.3, 0.3, 1)
        if label in "/*-+":
            return (0.3, 0.5, 0.8, 1)
        return (0.25, 0.25, 0.25, 1)

    def al_presionar(self, boton):
        texto = boton.text
        if texto == "C":
            self.pantalla.text = ""
        elif texto == "=":
            try:
                self.pantalla.text = str(eval(self.pantalla.text))
            except Exception:
                self.pantalla.text = "Error"
        else:
            self.pantalla.text += texto


class CalculadoraApp(App):
    def build(self):
        self.title = "Calculadora Kivy"
        return Calculadora()


if __name__ == "__main__":
    CalculadoraApp().run()