const els = {
    list: document.getElementById("container"),
    template: document.getElementById("cardTemplate")
}

init().catch(err => {
    console.error(err);
    els.list.textContent = "Could not load cows"
})

async function init() {
    const res = await fetch("cows.json")

    if(!res.ok) throw new Error(`HTTP ${res.status}`)

    const data = await res.json()

    const cows = Array.isArray(data.cows) ? data.cows : [];

    renderCows(cows);
}

function renderCows(cows)
{
    els.list.innerHTML = '';

    for(const c of cows)
    {
        const node = els.template.content.firstElementChild.cloneNode(true);

        setText(node, "name", c.name)
        setText(node, "age", c.age)
        setText(node, "type", c.type)
        setText(node, "description", c.description)

        els.list.appendChild(node);
    }
}

function setText(root, field, value)
{
    const el = root.querySelector(`[data-field="${field}"]`);
    if(el) el.textContent = value ?? "-"
}