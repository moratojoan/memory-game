

export default function fisherYates(array){
    let count = array.length;
    let randomNumber;
    let temp;

    while(count) {
        randomNumber = Math.floor(Math.random() * count);
        count--;
        temp = array[count];
        array[count] = array[randomNumber];
        array[randomNumber] = temp
    }

    return array;
}
