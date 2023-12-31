
export default class Query {
    id;
    _question;
    _answer;
    _sources;
    _timeline = [];


    constructor(id = Date.now()) {
        this.id = id;
        this.timeline.push(Date.now());
        this.element= document.createElement('div');
        this.element.dataset.id = this.id;
        this.element.classList.add('query');
        this.element.innerHTML = /*html*/`
            <div class="message question">
                <p id="question"></p>
                <div class="info">
                    <p class="time" id="q-time"></p>
                </div>
            </div>
            <div class="message answer">
                <p id="answer"></p>
                <div class="info">
                    <button id="toggleSources">Sources</button>
                    <p class="time" id="a-time"></p>
                </div>
                <div class="sources hidden">
                    <div id="sources"></div>
                </div>
            </div>
        `;
        this.element.querySelector('#toggleSources').addEventListener('click', () => {
            this.element.querySelector('.sources').classList.toggle('hidden');
        });
    }

    export() {
        return {
            id: this.id,
            question: this.question,
            answer: this.answer,
            sources: this.sources,
            timeline: this.timeline
        }
    }

    #render(key, value) {
        this.element.querySelector(`#${key}`).innerHTML = value;
    }

    get question() {return this._question;}
    set question(value) {
        this._question = value;
        this.#render('question', value);
    }

    get answer() {return this._answer;}
    set answer(value) {
        this._answer = value;
        this.#render('answer', value);
    }

    get sources() {return this._sources;}
    set sources(values) {
        this._sources = values;
        this.#render('sources', '');
        values.forEach(value => {
            const element = document.createElement('div');
            element.innerHTML = /*html*/`
                <h5>${value.title}</h5>
                <p>${value.content}</p>
            `;
            this.element.querySelector('#sources').appendChild(element);
        });
    }

    get timeline() {return this._timeline;}
    set timeline(value) {
        this._timeline = value;
        const [asked, started, answered] = value;
        this.#render('q-time', humanTime(asked));
        if (answered) {
            this.#render('a-time', humanTime(answered) + ' (' + humanRelativeTime(answered - started) + ')');
        } else {
            this.#render('a-time', humanTime(started));
        }
    }


}

function humanTime(timestamp) {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    switch (true) {
        case date.toDateString() === new Date().toDateString(): // is today?
            return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        case date.getFullYear() === new Date().getFullYear(): // is this year?
            return date.toLocaleDateString([], {month: 'short', day: 'numeric'});
        default:
            return date.toLocaleDateString();
    }
}

function humanRelativeTime(ms) {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${Math.floor(ms/1000)}s`;
    if (ms < 3600000) return `${Math.floor(ms/60000)}m${Math.floor((ms%60000)/1000)}s`;
    if (ms < 86400000) return `${Math.floor(ms/3600000)}h${Math.floor((ms%3600000)/60000)}m`;
}