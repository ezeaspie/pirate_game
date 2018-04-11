const dialogBox = (name,phrase,option1,option2,createBackButton) => {
    let backbutton = "";
    if(createBackButton) {
        backbutton = "<button class='back'>Back</button>";
    }
    let html = `
    <div class="dialog">
        <div class="person-image">
        </div>
        <h2 class="person-name">${name}</h2>
        <p>${phrase}</p>
        <button class="o1">${option1}</button>
        <button class="o2">${option2}</button>
        ${backbutton}
    </div>
    `
    $(".dialogbox").html(html);
    console.log(html);
}
/*
[
    {
        phrase: "Hello there! I'm Antoinette, the overseer of this port.",
        option1: "Hello. I'm a merchant.",
        option2: "Hello. I'm a pirate.",
        option1route: ["A merchant? I'm sure you'll find alot of lovely traders down at the marketplace! Make yourself at home!"]
        option2res: "A pirate? That's... nice. Well now I have to order my guards to kick you out."
    },
    {
        option1: "Is there anything I can do for you?"
    }
]*/