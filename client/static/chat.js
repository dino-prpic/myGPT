import Query from './query.js';	

export default class Chat {
    constructor(element) {
        this.element = element;
        this.queries = [];
    }

    newQuery(question) {
        const newQuery = new Query();
        this.element.appendChild(newQuery.element);

        if (question) newQuery.question = question;
        this.queries.push(newQuery);
        this.queries.sort((a, b) => a.id - b.id);

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
        const newQuery = this.newQuery();
        newQuery.id = id;
        return newQuery;
    }

    #scrollTo(query) {
        query.element.scrollIntoView({behavior: "smooth"});
        // query.element.scrollIntoView();
    }
    

}
