if (window.global === undefined) {
    window.global = window
}
if (window.Buffer === undefined) {
    window.Buffer = window
}
if (window.process === undefined) {
    window.process = {
        env: { DEBUG: undefined },
        version: []
    }
}
