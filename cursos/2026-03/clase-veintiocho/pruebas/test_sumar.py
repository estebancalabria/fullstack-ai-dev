import unittest
from decimal import Decimal
from fractions import Fraction

from funciones_a_probar import sumar


class TestSumar(unittest.TestCase):
    def test_enteros_positivos(self):
        self.assertEqual(sumar(2, 3), 5)

    def test_enteros_negativos(self):
        self.assertEqual(sumar(-2, -3), -5)

    def test_entero_positivo_y_negativo(self):
        self.assertEqual(sumar(10, -4), 6)

    def test_con_cero(self):
        self.assertEqual(sumar(0, 5), 5)
        self.assertEqual(sumar(7, 0), 7)
        self.assertEqual(sumar(0, 0), 0)

    def test_flotantes(self):
        self.assertAlmostEqual(sumar(0.1, 0.2), 0.3, places=7)

    def test_entero_y_flotante(self):
        self.assertEqual(sumar(2, 2.5), 4.5)

    def test_booleanos(self):
        self.assertEqual(sumar(True, True), 2)
        self.assertEqual(sumar(True, False), 1)

    def test_enteros_grandes(self):
        a = 10**100
        b = 10**100
        self.assertEqual(sumar(a, b), 2 * 10**100)

    def test_decimales(self):
        self.assertEqual(sumar(Decimal("1.1"), Decimal("2.2")), Decimal("3.3"))

    def test_fracciones(self):
        self.assertEqual(sumar(Fraction(1, 3), Fraction(1, 6)), Fraction(1, 2))

    def test_cadenas(self):
        self.assertEqual(sumar("Hola", " Mundo"), "Hola Mundo")

    def test_listas(self):
        self.assertEqual(sumar([1, 2], [3, 4]), [1, 2, 3, 4])

    def test_tuplas(self):
        self.assertEqual(sumar((1, 2), (3, 4)), (1, 2, 3, 4))

    def test_entradas_incompatibles_lanzan_type_error(self):
        with self.assertRaises(TypeError):
            sumar(1, "2")

    def test_none_lanza_type_error(self):
        with self.assertRaises(TypeError):
            sumar(None, 1)


if __name__ == "__main__":
    unittest.main(verbosity=2)
