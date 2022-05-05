const Tablero = require('../js/tablero');

describe('Pruebas de la clase Cell', () => {
  test('probamos el estado random', () => {
    const tablero = new Tablero(5, 5);
    const numeroRandom = tablero.randomState();
    expect([0, 1]).toContain(numeroRandom);
  });
});
