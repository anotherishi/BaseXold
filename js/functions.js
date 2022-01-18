function idiedElement(elementName, id) {
    let element = document.createElement(elementName);
    element.id = id;
    return element;
}

function classedElement(elementName, className) {
    let element = document.createElement(elementName);
    element.classList.add(className);
    return element;
}

HTMLElement.prototype.hide = function () {
    this.hidden = true;
};
HTMLElement.prototype.unhide = function () {
    this.hidden = false;
};

function removeLeadingZeros(number) {
    return number.replace(/^0+/, "");
}

function slice(string, sliceSize) {
    const slices = [];
    let index = 0;
    let paddedString = pad(string, sliceSize);
    let length = paddedString.length
    while (index < length)
        slices.push(paddedString.slice(index, (index += sliceSize)));
    return slices;
}

function pad(string, size) {
    let length = string.length;
    let n = length % size;
    if (n) return string.padStart(size + length - n, "0");
    return string;
}
