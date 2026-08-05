import unittest

from funciones_a_probar import sumar


class PruebaOperaciones(unittest.TestCase):
    
    def test_suma(self):
        resultado = sumar(2,3)
        self.assertEqual(resultado, 6)


unittest.main()