import Query from './query.js';	

export default class Chat {
    constructor(element) {
        this.element = element;
        this.queries = [];
    }

    newQuery(question, id) {
        const newQuery = new Query(id);

        if (question) newQuery.question = question;
        for (let i = 0; i <= this.queries.length; i++) {
            if ( i === this.queries.length || this.queries[i].id > newQuery.id) {
                this.queries.splice(i, 0, newQuery);
                console.log('inserted');
                break;
            }
        }

        this.#render();

        this.#scrollTo(newQuery);
        return newQuery;
    }

    update(query) {
        if (!query.id && typeof query.id !== 'number') return;
        const current = this.#getQuery(query.id);

        Object.assign(current, query);
        // this.#scrollTo(current);
    }

    #getQuery(id) {
        const query = this.queries.find(query => query.id === id);
        if (query) return query;
        // if it doesnt exist, create it
        const newQuery = this.newQuery(null, id);
        return newQuery;
    }

    #scrollTo(query) {
        query.element.scrollIntoView({behavior: "smooth"});
        // query.element.scrollIntoView();
    }

    #render() {
        for (let i = 0; i < this.queries.length; i++) {
            this.element.appendChild(this.queries[i].element);
        }
        console.log(this.queries);
    }
    

}
