class HelloWorldCard extends HTMLElement {

    config;
    content;

    setConfig(config) {
        if (!config.entity) {
            throw new Error('Please define an entity!');
        }
        this.config = config;
    }

    set hass(hass) {
        const entityId = this.config.entity;
        const state = hass.states[entityId];
        const stateStr = state ? state.state : 'unavailable';

        // done once
        if (!this.content) {
            // user makes sense here as every login gets it's own instance
            this.innerHTML = `
                <ha-card header="Hey ${hass.user.name}!">
                    <div class="card-content"></div>
                </ha-card>
            `;
            this.content = this.querySelector('div');
        }
        // done repeatedly
        this.content.innerHTML = `
            <p>The ${entityId} is ${stateStr}.</p>
        `;
    }

    static getStubConfig() {
        return { entity: "sun.sun" }
    }

}

customElements.define('hello-world-card', HelloWorldCard);

window.customCards = window.customCards || [];
window.customCards.push({
    type: "hello-world-card",
    name: "Hello World Card",
    description: "A custom card made by me!" // optional
});
