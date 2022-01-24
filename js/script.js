onload = screen.orientation.onchange = function () {
    let height = innerHeight;
    document.documentElement.style.setProperty("--wh", height + "px");
    // alert("orientation change");

    // screen.orientation.addEventListener("change", function (e) {
    //     alert("hi");
    // });

    // background
    // document.body.style.backgroundImage = new Trianglify({
    //     x_gradient: Trianglify.colorbrewer,
    //     noiseIntensity: 0,
    //     cellsize: 100,
    // }).generate(innerWidth, innerHeight).dataUrl;
};

const numberSystems = ["Binary", "Octal", "Decimal", "HexaDecimal"];

// const inputFields = [];
const digitsAllowed = {
    binary: /[01]/,
    octal: /[0-7]/,
    decimal: /[\d]/g,
    hexadecimal: /[\da-f]/i,
};

function handleInvalids(character, numberSystem) {
    console.log(character, "not allowed in", numberSystem);
}

function createUI(element) {
    numberSystems.forEach((numberSystem) => {
        let numberSystemLower = numberSystem.toLowerCase();
        let inputSection = classedElement("article", "input-section");
        let inputTitle = classedElement("h2", "input-heading");
        let explBtn = classedElement("img", "expl-btn");
        let copyBtn = classedElement("img", "copy-btn");
        let inputField = classedElement("input", "input-field");

        inputTitle.innerText = numberSystem;
        explBtn.src = "image/explanation.png";
        // explBtn.hide();
        copyBtn.src = "image/copy.png";
        inputField.id = "input-" + numberSystemLower;

        inputField.value = "0";
        copyBtn.addEventListener("click", () => {
            let curpos = inputField.selectionStart;
            inputField.select();
            document.execCommand("copy");
            inputField.setSelectionRange(curpos, curpos);
            inputField.focus();
        });

        inputField.addEventListener("focus", () => {
            explBtn.hide();
        });
        inputField.addEventListener("blur", () => {
            explBtn.unhide();
        });
        inputField.addEventListener(
            "input",
            (inputEvent) => {
                console.log(inputEvent);
                let character = inputEvent.data;
                let number = inputField.value;
                if (
                    digitsAllowed[numberSystemLower].test(character) ||
                    inputEvent.inputType === "insertText" ||
                    inputEvent.inputType === "deleteContentBackward" ||
                    inputEvent.inputType === "deleteContentForward" ||
                    inputEvent.inputType === "insertFromPaste"
                ) {
                    Array.from(
                        document.querySelectorAll(".input-field")
                    ).forEach((e) => {
                        if (e.id == "input-" + numberSystemLower) {
                        } else {
                            console.log(numberSystemLower, e.id.slice(6));
                            e.value =
                                window[numberSystemLower][e.id.slice(6)](
                                    number
                                );
                        }
                    });
                } else if (
                    inputEvent.inputType === "insertText" ||
                    inputEvent.inputType === "insertFromPaste"
                ) {
                    if (character !== " ")
                        handleInvalids(character, numberSystem);
                    inputField.value = number.slice(0, number.length - 1);
                }
            },
            true
        );

        inputSection.appendChild(inputTitle);
        inputSection.appendChild(explBtn);
        inputSection.appendChild(copyBtn);
        inputSection.appendChild(inputField);
        element.appendChild(inputSection);
    });
}

createUI(document.forms[0]);
