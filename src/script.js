function toggleCheckbox(target) {
    var nameHook = {
        "notSelect": "select",
        "select": "notSelect"
    };
    target.setAttribute('name', nameHook[target.getAttribute('name')]);
}
