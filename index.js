// Clase Celula
// Atributos: Estado - Posicion en X - Posicion en Y - Limites - Cantidad de vecinos
// Metodos: Mostrar estado - Modificar estado - Mostrar posicion XY - Mostrar limites - Escuchar estado
const { Input, AutoComplete } = require("enquirer");

class Celula {
  constructor(estado, xPosition, yPosition, limites, cantVecinos) {
    this.estado = estado;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
    this.limites = limites;
    this.cantVecinos = cantVecinos;
  }

  // Metodo de la clase que muestra el valor del estado de la celula
  getState() {
    return this.estado; //Devueleve el estado: 1- Si esta vivo 0-Si esta muerto
  }

  get state() {
    return this.getState();
  }

  // Metodo de la clase que modifica el estado de la celula
  setState(newState) {
    this.estado = newState;
  }

  // Metodo de la clase que muestra la posicion en X e Y de la celula 
  getPositionXY() {
    console.log(`[ ${this.xPosition} , ${this.yPosition} ]`);
  }

  // Metodo de la clase que muestra los limites de la celula
  getLimits() {
    return this.limites;
  }
}

// Clase tablero 
// Atributos: Filas - Columnas
// Metodos: Mostrar tablero - Generar estado aleatorio

class Tablero {
  constructor(filas, columnas) {
    this.filas = filas;
    this.columnas = columnas;
    this.estructura = new Array(filas)
      .fill(new Array(columnas).fill(0))
      .map((filas, i) =>
        filas.map((columnas, k) => new Celula(this.randomState(), i, k, 0, 0))
      );
  }

  // Metodo de clase que genera un estado de la celula aleatoriamente (0 => muerto , 1 => vivo)
  randomState() {
    let numeroRandom = Math.random();
    if (numeroRandom > 0.98) {
      return 1;
    } else {
      return 0;
    }
  }

  // Metodo de la clase que muestra el tablero por consola
  getTablero() {
    console.clear()
    this.estructura.forEach((fila) =>
      console.log(
        fila.map((columna) => (columna.getState() ? "*" : ".")).join("")
      )
    );
    this.recorrerTablero();
  }

  recorrerTablero() {
    for (let i = 0; i < this.columnas; i++) {
      for (let j = 0; j < this.filas; j++) {
        let vivas = this.contador(i, j);
        this.cambiosEstado(vivas, i, j, this.estructura[j][i].state);
      }
    }
  }

  contador(x, y) {
    //Movimientos
    const moveX = new Array(0, 0, 1, -1, -1, -1, 1, 1);
    const moveY = new Array(1, -1, 0, 0, 1, -1, -1, 1);
    //Contador de celulas vivas
    let cnt = 0;
    //Ciclo para realizar los movimientos
    for (let i = 0; i < 8; i++) {
      const mox = x + moveX[i];
      const moy = y + moveY[i];
      if(!(mox<0 || moy<0 || mox>this.filas-1 || moy>this.columnas-1)){
        const celulaState = this.estructura[mox][moy];
        if (celulaState.state == 1) {
          cnt += 1;
       }    
      }
    }
    return cnt;
  }

    // Metodo de la clase que evalua el valor de su estado segun la cantidad de vecinos que posea
    cambiosEstado(cantVecinos, posX, posY, estado) {
      if(estado == 1){
        if(cantVecinos===3 || cantVecinos === 2){
          this.estructura[posX][posY].estado = 1;
        }else{
          this.estructura[posX][posY].estado = 0;
        }
      }else{
        if (cantVecinos === 3){
          this.estructura[posX][posY].estado = 1;
        }
      }
    }
}

const askFila = new Input({
  name: "fila",
  message: "Ingrese la fila: ",
});

const askColumnas = new Input({
  name: "columna",
  message: "Ingrese las columnas: ",
});

const inicializaTablero = async () => {
  var fila = await askFila.run();
  fila = parseInt(fila);
  var columna = await askColumnas.run();
  columna = parseInt(columna);
  const tabla = new Tablero(fila, columna);
  setInterval(() => {tabla.getTablero()},1000);
};

inicializaTablero();


/*
Salida por terminal
 
√ Ingrese la fila:  · 7
√ Ingrese las columnas:  · 3
*.*
.*.
...
...
*.*
...
.*.
*/