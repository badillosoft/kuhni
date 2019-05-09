// Schema:
// + tagName <string | function| HTMLElement> - Define el tipo de etiqueta que se
// - va a contruir.
// - <string> usa document.createElement
// - <function> ejecuta la función y crea recursividad
// - <HTMLElement> regresa inmediatamente el elemento dom
// * attributes <object> - Define el objeto con todos los atributos del elemento
// - [modeAttribute="default"|undefined] asigna clave/valor directo al elemento
// - [modeAttribute="setAttribute"] asigna clave/valor mediante element.setAttribute
// * styles <object> - Define el objeto con todos los estilos del elemento
// - [modeStyle="default"|undefined] - asigna clave/valor directo al element.style
// * datasets <object> - Define el objeto con todos los datasets
// - [modeDataset="default"|undefined] - asigna clave/valor directo al element.dataset
// - [modeDataset="setAttribute"] - asigna element.setAttribute(`data-${key}`, value)
// * children <Array<DOMSchema>> - Anida recursivamente mediante appendChild
// * events <Array<EventSchema>> - Registra los eventos, según EventSchema
// * proxies <Array<ProxySchema>> - Registra los eventos sobre los hijos en el elemento

async function DomCreator(schema) {

}

const survey = {
    title: "Encuesta de satisfacción",
    questions: [
        {
            type: "multiple",
            subtype: "select-icon",
            title: "¿Te gustó venir aquí?",
            options: [
                {
                    icon: "fas fa-smile",
                    value: 3
                },
                {
                    icon: "fas fa-sad",
                    value: 0
                },
            ]
        }
    ]
};

function SurveyDomCreator(survey) {
    const mainContainer = document.createElement("div");
    const titleContainer = AddTitleContainer(survey.title)(mainContainer);
    const mainQuestionContainer = AddMainQuestionContainer(survey.title)(mainContainer);
    for (let question of survey.question) {
        let questionContainer = AddQuestionContainer(question)(mainQuestionContainer);
        let mainOptionContainer = AddMainOptionContainer(question)(mainQuestionContainer);
        for (let option of question.options) {
            AddOptionContainer(option)(optionsContainer);
        }
    }

}

async function Input(domOptions={}) {
    return await DomCreator(Object.assign({
        tagName: "input",
        attributes: {
            placeholder: "Insert text..."
        }
    }, domOptions));
}

async function Search(domOptions={}) {
    return await DomCreator(Object.assign({
        tagName: "div",
        chidren: [
            { tagName: await Label() },
            { tagName: await Input() },
            { tagName: await Span() },
            { tagName: await FloatList() },
        ]
    }, domOptions));
}