const dialogueBox = (config) => {
    let dialogueCounter = 0;
    let option = 0;
    let failedDialougeCheck = false;
    const generateBox = (isFirstPhrase = false) => {
        console.log(dialogueCounter, config.dialogue.length);
        let backButton = "";
        let phrase = "";
        let optionButtons = "";
        if (isFirstPhrase){
            backButton = "<button class='back'>Back</button>";
            phrase= config.firstStatus;
        }
        else{
            phrase = config.dialogue[dialogueCounter][option][2];
            dialogueCounter++;
        }

        //Handle end of dialog state.
        if (dialogueCounter > config.dialogue.length-1){
            optionButtons = "";
            backButton = "<button class='back'>Back</button>";
        }
        else{
            let option1 = config.dialogue[dialogueCounter][0][1];
            let option2 = config.dialogue[dialogueCounter][1][1];
            optionButtons = `
            <button class="o1 ${config.dialogue[dialogueCounter][0][0]}">${option1}</button>
            <button class="o2 ${config.dialogue[dialogueCounter][1][0]}">${option2}</button>`
        }

        if (failedDialougeCheck) {
            backButton = "<button class='back'>Back</button>";
            optionButtons = "";
            console.log("failed");
        }
        
        let html = `
        <div class="dialogue">
        <h2 class="person-name">${config.name}</h2>
        <div class="character">
            <div class="person-image">
            </div>
            <p>${phrase}</p>
        </div>
        ${optionButtons}
        ${backButton}
        </div>
    `
        $(".dialoguebox").html(html);
        $(".dialoguebox").show();
        setTimeout(function(){
            $(".dialoguebox").addClass("fadein");
        },200);

        $(".o1").on("click", function () {
            option = 0;
            if ($(this).hasClass("true")) {
                failedDialougeCheck = true;
            }
            console.log(failedDialougeCheck);
            console.log(generateBox());
        });
        $(".o2").on("click", function () {
            option = 1;
            if($(this).hasClass("true")){
                failedDialougeCheck = true;
            }
            console.log(failedDialougeCheck);
            console.log(generateBox());
        });

        if(backButton != "") {
            $(".back").on("click", function () {
                $(".dialoguebox").html("");
                $(".dialougebox").removeClass("fadein"); //FIND A WAY TO FIX THIS.
                $(".dialoguebox").addClass("fadeout");
                setTimeout(function(){
                    $(".dialoguebox").hide();
                    console.log("hidden?");
                    $(".dialoguebox").removeClass("fadeout");
                },600);
            });
        }

        return html;
    }
    generateBox(true); 

}

let antoinettefirst = {
    type:"conversation",
    createBackButton: true,
    name: "Antoinette",
    firstStatus:"Hello there! I'm Antoinette, the overseer of this port.",
    dialogue:[[
        [false,"Hello,I'm a merchant.", "A merchant? I'm sure you'll find alot of lovely traders down at the marketplace! Make yourself at home!"],
        [false,"Hello. I'm a pirate.","A pirate? That's... nice. Well now I have to order my guards to follow you around."],
    ],
    [
        [false, "Thanks I guess.", "No problem! Say, I have a little problem, could you help me out?"],
        [true, "I don't need you!", "I don't like rude people. I'm going to have to ask you to leave."],
    ],
    [
        [false, "Sure, what do you need?", "I need someone to help me raise money. I know it's weird but I have some debts to pay."],
        [true, "No thanks. I'm not going to be your servant.", "You're more than welcome to leave in that case."],
    ],
    [
        [false, "Care to tell me what it is exactly you need?", "I need to get one million. I know it's alot but I can make it worth your while. I'll let you have the warehouse in the port. all yours, no payment required."],
        [false, "What's in it for me?", "I can give you access to my port's warehouse. Useful for mercahnts storing goods... or pirates storing their rum and weapons... eek"],
    ],
    [
        [false, "I'm in.", "Great! I like you already - come back when you have my money! Don't be long!"],
        [true, "I'm basically paying a million to buy the warehouse. No thanks miss.", "Fine then, come back if you change your mind."],
    ]]
}