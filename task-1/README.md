### Задача 1
Коллега отправил вам файл, но вы нигде не можете найти константу VECTOR_NAME. Нужно восстановить ее, опираясь на этот блок кода.

```ecmascript 6
const getVector = ({x, y}) => {
    if (x > y) {
        if (Math.abs(x / y) < THRESHOLD) return;
        return x > 0 ? 3 : 1;
    } else {
        if (Math.abs(y / x) < THRESHOLD) return;
        return y > 0 ? 2 : 0;
    }
};

let v = getVector({x: _x, y: _y});
if (v && VECTOR_NAME.indexOf(v) !== -1) {
    ev.emit('event.' + VECTOR_NAME[v]);
}

ev.on('event.up', () => {
    console.log('Восхитительно, что-то движется вверх!');
});
```

Ответ:
1. Лучше спросить коллегу, который писал этот код. 
2. Построенные предположения могут быть ошибочными, на них потратится время.
3. Без присутствия константы можно лишь предполагать - верно работает код или нет.

Допустим что код работает верно, смотрим, где есть константа: на ней применяется метод indexOf. Это метод массива, так что если код рабочий, то константа - массив

VECTOR_NAME = []

на 14 строке (ev.emit('event.' + VECTOR_NAME[v]);) такой код, сопоставив его с 20-й строкой, можно предположить, что константа может принимать значение 'up'. Поэтому, если VECTOR_NAME[v] строка 'up', то константа массив, содержащий как минимум одно строкове значение ('up')

VECTOR_NAME = ['up']

по логике можем предположить, что раз есть up, могут быть и оставшиеся 3 направления:

VECTOR_NAME = ['up', 'down', 'left', 'right'] // порядок, видимо, вычисляется в функции getVector