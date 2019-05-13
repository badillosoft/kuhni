# Metacomponentes - Una arquitectura abierta de mínimo mantenimiento

Alan Badillo Salas (badillo.soft@hotmail.com)

Github: https://github.com/badillosoft

## Introducción

Los componentes en un sistema, son fragmentos visuales y lógicos que logran aislarse para mantener autonomía, esto a partir de crear su propio contexto de datos y su prototipos lógicos/visuales independientes del resto del código.

Un componente puede ser definido como un objeto inmutable que retendrá el contexto de datos y la funcionalidad, por ejemplo, en web podemos crear un elemento DOM para dicho propósito. El elemento DOM puede retener el estado del componente mediante los *datasets*, retener lógica funcional mediante eventos y generar una parte visual mediante su propia definición. En DOM no hay necesidad de sincronizar diversos elementos, sólo basta uno sólo.

La arquitectura de componentes puede lograrse mediante una función que construya el elemento y lo devuelva, como en el siguiente ejemplo.

~~~js
function Button() {
    const button = document.createElement("button");

    return button;
}
~~~

Para extender funcionalidad, es necesario 

