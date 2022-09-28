let vm = Vue.createApp({
    data() {
        return {
            settings: {
                perspective: 100,
                rotateX: 0,
                rotateY: 0,
                rotateZ: 0
            },
            buttons: {
                copy: {
                    text: "Copy",
                    backgroundColor: "#8d81f3"
                },
                reset: {
                    text: "Reset",
                    backgroundColor: "#8d81f3"
                }
            }
        }
    },
    computed: {
        outBox() {
            return {
                transform: `
                    perspective(${this.settings.perspective}px)
                    rotateX(${this.settings.rotateX}deg)
                    rotateY(${this.settings.rotateY}deg)
                    rotateZ(${this.settings.rotateZ}deg)
                `           
            };
        }
    },
    methods: {
        reset() {
            this.settings.perspective = 100;
            this.settings.rotateX = 0;
            this.settings.rotateY = 0;
            this.settings.rotateZ = 0;
        },
        async copy() {
            let text = `transform:${this.outBox.transform}:`
            await navigator.clipboard.writeText(text);

            alert("Css copy to clipboard")
        }
    }
}).mount('#app');